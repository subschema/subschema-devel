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
    camelCased          = webpackUtils.camelCased,
    sliced              = webpackUtils.sliced;

function cwd() {
    return path.resolve.apply(path, [process.cwd()].concat(sliced(arguments)));
}

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
    isProduction     : process.env.NODE_ENV === 'production',
    isKarma          : configOrBool(process.env.SUBSCHEMA_KARMA),
    isDemo           : configOrBool(process.env.SUBSCHEMA_DEMO),
    isDevServer      : configOrBool(process.env.SUBSCHEMA_DEV_SERVER),
    isUseStyleLoader : !configOrBool(process.env.SUBSCHEMA_NO_STYLE_LOADER,
        true),
    publicPath       : configOrBool(process.env.SUBSCHEMA_PUBLIC, '/'),
    useSubschemaAlias: true,
    babel,
    useCssModule     : {
        loader : "css-loader",
        options: {
            modules       : true,
            importLoaders : 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
        }
    },
    useCss           : {
        loader : "css-loader",
        options: {
            importLoaders: 1,
        }
    },
    usePostCss       : {
        loader : 'postcss-loader',
        options: {
            plugins: autoprefixer
        }
    },
    useLess          : {
        loader : "less-loader",
        options: {
            strictMath: true,
            noIeCompat: true
        }
    },
    useNameHash      : configOrBool(process.env.SUBSCHEMA_USE_NAME_HASH,
        '[name]-[hash].js'),
    analytics        : configOrBool(process.env.SUBSCHEMA_USE_ANALYTICS),
    analyze          : configOrBool(process.env.SUBSCHEMA_ANALYZE, 'static'),
};

if (!opts.isUseStyleLoader) {
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    var extractCSS        = new ExtractTextPlugin(
        opts.useNameHash ? '[hash].style.css' : 'style.css');
    opts.useStyle         = function useStyleExtractText() {
        const conf = { use: sliced(arguments).filter(Boolean) };
        if (opts.publicPath) {
            conf.publicPath = opts.publicPath;
        }
        return extractCSS.extract(conf);
    };
    plugins.push(extractCSS);
} else {
    opts.useStyle = function useStyleWithStyleLoader() {
        return ['style-loader'].concat(sliced(arguments).filter(Boolean));
    };
}

opts.useStatsFile = configOrBool(process.env.SUBSCHEMA_USE_STATS_FILE)
if (opts.useStatsFile) {
    var useStatsFile = opts.useStatsFile === true ? 'stats.json'
        : opts.useStatsFile;
    plugins.push(new (require("webpack-stats-plugin").StatsWriterPlugin)({
        filename: useStatsFile,
        transform(data, opts) {
            var chunks = data.assetsByChunkName["null"];
            return JSON.stringify({ main: chunks[0], css: chunks[1] }, null, 2);
        }
    }))
}

var output = {
    filename: configOrBool(process.env.SUBSCHEMA_OUTPUT_FILENAME,
        opts.useNameHash) || opts.useNameHash || '[name].js',
    path    : configOrBool(process.env.SUBSCHEMA_OUTPUT_PATH, cwd('lib'))
              || cwd('lib')
};

//if its not anything else its a library.
if (!(opts.isKarma || opts.isDevServer || opts.isDemo)) {
    opts.isLibrary    = true;
    var library       = configOrBool(process.env.SUBSCHEMA_LIBRARY),
        libraryTarget = configOrBool(process.env.SUBSCHEMA_LIBRARY_TARGET);
    if (library === true || library === false) {
        output.library = camelCased(
            require(cwd('package.json')).name);
    } else {
        output.library = library;
    }
    output.libraryTarget =
        libraryTarget === true || libraryTarget === false ? 'umd'
            : libraryTarget;

}


var externals = useExternalizePeers(useExternals({}));

var webpack = {
    devServer    : {
        //      hot: true,
        filename          : 'index.js',
        historyApiFallback: true,
        inline            : true,
        contentBase       : cwd('public'),
        publicPath        : opts.publicPath,
        port              : 8082
    },
    resolve      : {
        extensions: ['.js', '.jsx'],
        alias     : useDepAlias(useAlias())
    },
    resolveLoader: {
        modules: [
            cwd("node_modules"),
            path.resolve(__dirname, 'node_modules'),
        ]
    },
    output,
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
                use : opts.useStyle(opts.useCss)

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
                    opts.useCssModule,
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
    var mainFields = configOrBool(process.env.SUBSCHEMA_MAIN_FIELDS,
        ['source', 'main']);
    if (mainFields) {
        webpack.resolve.mainFields =
            Array.isArray(mainFields) ? mainFields : mainFields.split(/,\s*/);
        console.warn(`using mainFields`, webpack.resolve.mainFields);
    }
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
    console.warn(`using html plugin`);

    opts.useHtml = {
        'title'   : (deps.description ? deps.description : deps.name),
        'hash'    : opts.useNameHash,
        'template': path.resolve(__dirname, 'public',
            opts.analytics ? 'index_analytics.ejs' : 'index.ejs'),
        'filename': 'index.html',
        publicPath: opts.publicPath,
        analytics : opts.analytics
    };
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
        webpack.entry = { index: cwd('public', 'index') };
    } else if (!webpack.entry && !opts.isKarma) {
        webpack.entry = { index: cwd('src', 'index.js') };
    }
}

//This is where the magic happens
var customConf = useCustomConf();
opts.webpack   = webpackObject;
if (customConf) {
    webpack = customConf(opts, webpack);
}


if (opts.useHot) {
    var preEntry = ['only-dev-server'];
    if (typeof webpack.entry == 'string') {
        webpack.entry = preEntry.concat(webpack.entry);
    } else if (Array.isArray(webpack.entry)) {
        webpack.entry = webpack.entry.map(entry => preEntry.concat(entry));
    } else if (webpack.entry) {
        webpack.entry = Object.keys(webpack.entry).reduce(function (ret, key) {
            ret[key] = preEntry.concat(webpack.entry[key]);
            return ret;
        }, {});
    } else {
        console.warn(
            `could not find an webpack.entry, hot loading may not work`);
    }
}

//Think hard if this should be the default.
if (opts.useSubschemaAlias) {
    var subschemaKey = opts.useSubschemaAlias === true ? 'subschema'
        : opts.useSubschemaAlias;
    try {
        webpack.resolve.alias[subschemaKey] =
            require.resolve('subschema/dist/subschema-noreact');
    } catch (e) {
    }
}

if (opts.useHtml) {
    plugins.push(new opts.HtmlWebpackPlugin(opts.useHtml));
}

if (opts.analyze) {
    //only include for analyzer.
    const BundleAnalyzerPlugin = require(
        'webpack-bundle-analyzer').BundleAnalyzerPlugin;

    (function (analyze = {}) {
        switch (opts.analyze) {
            case 'server':
                break;
            case 'static': {
                analyze.reportFilename = project('report.html');
                analyze.analyzerMode   = 'static';
                break;
            }
            default: {
                analyze = JSON.parse(opts.analyze);
            }
        }
        console.warn(`analyzing project`);
        plugins.push(new BundleAnalyzerPlugin(analyze));
    })();
}
if (process.env.SUBSCHEMA_DEBUG) {
    console.log('webpack opts %O, webpack %O', opts, webpack);
}
module.exports = webpack;
