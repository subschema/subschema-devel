var path                = require('path');
var fs                  = require('fs');
var babel               = require('./babel-helper');
var webpackUtils        = require('./webpack-utils');
var webpackObject       = require('webpack');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var deps                = webpackUtils.deps,
    configOrBool        = webpackUtils.configOrBool,
    useAlias            = webpackUtils.useAlias,
    useExternals        = webpackUtils.useExternals,
    useExternalizePeers = webpackUtils.useExternalizePeers,
    useCustomConf       = webpackUtils.useCustomConf,
    useDepAlias         = webpackUtils.useDepAlias,
    dependency          = webpackUtils.dependency;


function autoprefixer() {
    return [
        require('autoprefixer')({
            browsers: [
                '>1%',
                'last 3 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ]
        })
    ];
}


var plugins = [];
var opts    = {
    isKarma    : configOrBool(process.env.SUBSCHEMA_KARMA),
    isDemo     : configOrBool(process.env.SUBSCHEMA_DEMO),
    isDevServer: configOrBool(process.env.SUBSCHEMA_DEV_SERVER),
    publicPath : configOrBool(process.env.SUBSCHEMA_PUBLIC, '/'),
    useCss     : {
        loader : "css-loader",
        options: {
            modules       : true,
            importLoaders : 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
        }
    },
    usePostCss : {
        loader : 'postcss-loader',
        options: {
            plugins: autoprefixer
        }
    },
    useLess    : {
        loader : "less-loader",
        options: {
            strictMath: true,
            noIeCompat: true
        }
    },
    useNameHash: configOrBool(process.env.SUBSCHEMA_USE_NAME_HASH,
        '[name]-[hash].js'),
    analytics  : configOrBool(process.env.SUBSCHEMA_USE_ANALYTICS, 'static'),
};

if (configOrBool(process.env.SUBSCHEMA_NO_STYLE_LOADER)) {
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    var extractCSS        = new ExtractTextPlugin(
        opts.useNameHash ? '[hash].style.css' : 'style.css');
    opts.useStyle         = function useStyleExtractText() {
        return extractCSS.extract(Array.prototype.slice.call(arguments),
            { publicPath: opts.publicPath });
    };
    plugins.push(extractCSS);
} else {
    opts.useStyle = function useStyleWithStyleLoader() {
        return ['style-loader'].concat(Array.prototype.slice.call(arguments));
    };
}

if (process.env.SUBSCHEMA_USE_STATS_FILE) {
    opts.useStatsFile = process.env.SUBSCHEMA_USE_STATS_FILE;
    plugins.push(new (require("webpack-stats-plugin").StatsWriterPlugin)({
        filename: process.env.SUBSCHEMA_USE_STATS_FILE,
        transform(data, opts) {
            var chunks = data.assetsByChunkName["null"];
            return JSON.stringify({ main: chunks[0], css: chunks[1] }, null, 2);
        }
    }))
}

var externals = useExternalizePeers(useExternals(externals));

var webpack = {
    devServer    : {
        //      hot: true,
        filename          : 'index.js',
        historyApiFallback: true,
        inline            : true,
        contentBase       : path.resolve(process.cwd(), 'public'),
        publicPath        : opts.publicPath,
        port              : 8082
    },
    resolve      : {
        extensions: ['.js', '.jsx'],
        alias     : useDepAlias(useAlias())
    },
    resolveLoader: {
        modules: [
            path.resolve(process.cwd(), "node_modules"),
            path.resolve(__dirname, 'node_modules'),
        ]
    },
    plugins,
    externals,
    module       : {
        rules: [

            {
                test   : /\.jsx?$/,
                //       exclude: /(node_modules|bower_components)/,
                include: [/\/test\/*/, /\/src\/*/, /\/public\/*/, /subschema[^/]*\/src\/*/],
                use    : [{
                    loader : 'babel-loader',
                    options: babel
                }]
            },
            {
                test: /\.css$/,
                use : opts.useStyle('css-loader')
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use : 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use : 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use : 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.less$/,
                use : opts.useStyle(
                    opts.useCss,
                    opts.useLess,
                    opts.usePostCss)
            },
            {
                test: /\.json$/,
                use : 'json-loader'
            }
        ]
    }
};

if (process.env.SUBSCHEMA_MAIN_FIELDS) {

    const mainFields           = configOrBool(process.env.SUBSCHEMA_MAIN_FIELDS,
        ['source', 'main']);
    webpack.resolve.mainFields =
        Array.isArray(mainFields) ? mainFields : mainFields.split(/,\s*/);
    console.warn(`using mainFields`, webpack.resolve.mainFields);
}

function charset(ele) {
    if (!ele.attributes) {
        ele.attributes = {};
    }
    if (!ele.attributes.charset) {
        ele.attributes.charset = 'UTF-8';
    }
}

var ogenerateAssetTags = HtmlWebpackPlugin.prototype.generateAssetTags;

HtmlWebpackPlugin.prototype.generateAssetTags = function (assets) {
    var ret = ogenerateAssetTags.call(this, assets);
    ret.body.forEach(charset);
    ret.head.forEach(charset);
    return ret;
};

opts.HtmlWebpackPlugin = HtmlWebpackPlugin;

if (process.env.SUBSCHEMA_USE_HTML) {
    opts.useHtml = true;
    console.warn(`using html plugin`);


    plugins.push(new opts.HtmlWebpackPlugin({
        'title'   : (deps.description ? deps.description : deps.name),
        'hash'    : opts.useNameHash,
        'template': path.resolve(__dirname, 'public',
            opts.analytics ? 'index_analytics.ejs' : 'index.ejs'),
        'filename': 'index.html',
        publicPath: opts.publicPath,
        analytics : opts.analytics
    }));
}

if (process.env.SUBSCHEMA_USE_HOT) {
    opts.useHot = true;
    babel.plugins.unshift(require.resolve("react-hot-loader/babel"));
    webpack.resolve.alias['webpack/hot/dev-server'] =
        require.resolve('webpack/hot/dev-server.js');

    webpack.resolve.alias['only-dev-server'] =
        require.resolve('webpack/hot/only-dev-server.js');

    console.warn('using hot loading');
}
var idx;
if ((idx = process.argv.indexOf('--target')) != -1) {
    opts.target = process.argv[idx + 1];
}

var argv = process.argv;
var idx  = argv.indexOf('--entry');
if (idx > -1) {
    var entry = {};
    for (var i = idx + 1, l = argv.length; i < l; i++) {
        if (argv[i].startsWith('-')) {
            break;
        }
        var parts = argv[i].split('=', 2);
        if (!parts[1]) {
            entry[path.basename(parts[0])] = parts[0];
        } else {
            entry[parts[0]] = parts[1];
        }
    }
    webpack.entry = entry;
} else {
    if (opts.isDemo || configOrBool(process.env.SUBSCHEMA_DEV_SERVER)) {
        webpack.entry = path.resolve(process.cwd(), 'public', 'index.jsx');
    } else {
        webpack.entry = path.resolve(process.cwd(), 'src', 'index.js');
    }
}


var customConf = useCustomConf();
opts.webpack   = webpackObject;
if (customConf) {
    webpack = customConf(opts, webpack);
}
if (opts.useHot) {
    if (typeof webpack.entry == 'string') {
        webpack.entry = ['only-dev-server', webpack.entry];
    } else if (Array.isArray(webpack.entry)) {
        webpack.entry = webpack.entry.map(entry => ['only-dev-server', entry]);
    } else if (webpack.entry) {
        webpack.entry = Object.keys(webpack.entry).reduce(function (ret, key) {
            ret[key] = ['only-dev-server', webpack.entry[key]];
            return ret;
        }, {});
    } else {
        console.warn(`could not find an webpack.entry`);
    }
}

//Think hard if this should be the default.
if (!webpack.resolve.alias.subschema) {
    try {
        webpack.resolve.alias.subschema =
            require.resolve('subschema/dist/subschema-noreact');
    } catch (e) {
        //swallow?
    }
}

if (opts.analytics) {
    //only include for analyzer.
    const BundleAnalyzerPlugin = require(
        'webpack-bundle-analyzer').BundleAnalyzerPlugin;

    (function (analyze = {}) {
        switch (opts.analytics) {
            case 'server':
                break;
            case 'static': {
                analyze.reportFilename = project('report.html');
                analyze.analyzerMode   = 'static';
                break;
            }
            default: {
                analyze = JSON.parse(opts.analytics);
            }
        }
        console.warn(`analyzing project`);
        plugins.push(new BundleAnalyzerPlugin(analyze));
    })();
}
if (process.env.SUBSCHEMA_DEBUG) {
    console.log('webpack', JSON.stringify(webpack, null, 2));
}
module.exports = webpack;
