require('./init-env');
const path                = require('path');
const babel               = require('./babel-helper');
const webpackUtils        = require('./webpack-utils');
const webpackObject       = require('webpack');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const deps                = webpackUtils.deps,
      configOrBool        = webpackUtils.configOrBool,
      useAlias            = webpackUtils.useAlias,
      useExternals        = webpackUtils.useExternals,
      useExternalizePeers = webpackUtils.useExternalizePeers,
      useCustomConf       = webpackUtils.useCustomConf,
      useDepAlias         = webpackUtils.useDepAlias,
      camelCased          = webpackUtils.camelCased,
      resolveMap          = webpackUtils.resolveMap,
      cwd                 = webpackUtils.cwd;


const {
          NODE_ENV                   = process.argv.includes('-p')
              ? 'production'
              : 'development',
          SUBSCHEMA_DEBUG,
          SUBSCHEMA_LOCAL_IDENT      = '[name]__[local]___[hash:base64:5]',
          SUBSCHEMA_USE_AUTOPREFIXER = 1,
          SUBSCHEMA_OUTPUT_PATH,
          SUBSCHEMA_MAIN_FIELDS,
          SUBSCHEMA_USE_HTML,
          SUBSCHEMA_OUTPUT_FILENAME,
          SUBSCHEMA_ENTRY,
          SUBSCHEMA_LIBRARY,
          SUBSCHEMA_LIBRARY_TARGET,
          SUBSCHEMA_USE_HOT,
          SUBSCHEMA_DEV_SERVER,
          SUBSCHEMA_USE_STATS_FILE,
          SUBSCHEMA_KARMA,
          SUBSCHEMA_DEMO,
          SUBSCHEMA_NO_STYLE_LOADER,
          SUBSCHEMA_PUBLIC,
          SUBSCHEMA_USE_NAME_HASH,
          SUBSCHEMA_ANALYZE,
          SUBSCHEMA_USE_ANALYTICS

      } = process.env;

function autoprefixer() {
    const browsers = configOrBool(SUBSCHEMA_USE_AUTOPREFIXER);
    if (!browsers) {
        return [];
    }
    return [
        require('autoprefixer')()
    ];
}


const plugins = [];
const opts    = {
    isProduction     : NODE_ENV === 'production',
    isKarma          : configOrBool(SUBSCHEMA_KARMA),
    isDemo           : configOrBool(SUBSCHEMA_DEMO),
    isDevServer      : configOrBool(SUBSCHEMA_DEV_SERVER),
    isUseStyleLoader : !configOrBool(SUBSCHEMA_NO_STYLE_LOADER,
        true),
    publicPath       : configOrBool(SUBSCHEMA_PUBLIC, '/'),
    useSubschemaAlias: false,
    useAutoprefixer  : true,
    useScopeHoist    : true,
    babel,
    useDefine        : {
        'process.env.NODE_ENV': NODE_ENV,
    },
    useCssModule     : {
        loader : "css-loader",
        options: {
            modules       : true,
            importLoaders : 1,
            localIdentName: SUBSCHEMA_LOCAL_IDENT,
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
    useNameHash      : configOrBool(SUBSCHEMA_USE_NAME_HASH,
        '[name]-[hash].js'),
    analytics        : configOrBool(SUBSCHEMA_USE_ANALYTICS),
    analyze          : configOrBool(SUBSCHEMA_ANALYZE, 'static'),
};


if (!opts.isUseStyleLoader) {
    const useNameHash       = opts.useNameHash === true ? '[hash].style.css'
        : typeof opts.useNameHash === 'string' ? opts.useNameHash : 'style.css';
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    const extractCSS        = new ExtractTextPlugin(useNameHash);
    opts.useStyle           = function useStyleExtractText(...args) {
        const conf = { use: args.filter(Boolean) };
        if (opts.publicPath) {
            conf.publicPath = opts.publicPath;
        }
        return extractCSS.extract(conf);
    };
    plugins.push(extractCSS);
} else {
    opts.useStyle = function useStyleWithStyleLoader(...args) {
        return ['style-loader'].concat(args.filter(Boolean));
    };
}

opts.useStatsFile = configOrBool(SUBSCHEMA_USE_STATS_FILE)
if (opts.useStatsFile) {
    const filename = opts.useStatsFile === true ? 'stats.json'
        : opts.useStatsFile;
    plugins.push(new (require("webpack-stats-plugin").StatsWriterPlugin)({
        filename,
        transform(data, opts) {
            const [main, css] = data.assetsByChunkName["null"];
            return JSON.stringify({ main, css }, null, 2);
        }
    }));
}

const output = {
    filename: configOrBool(SUBSCHEMA_OUTPUT_FILENAME, opts.useNameHash)
              || opts.useNameHash || '[name].js',
    path    : configOrBool(SUBSCHEMA_OUTPUT_PATH, cwd('lib'))
              || cwd('lib')
};

//if its not anything else its a library.
if (!(opts.isKarma || opts.isDevServer || opts.isDemo)) {
    opts.isLibrary      = true;
    const library       = configOrBool(SUBSCHEMA_LIBRARY),
          libraryTarget = configOrBool(SUBSCHEMA_LIBRARY_TARGET, 'umd');

    if (library === true || library === false) {
        output.library = camelCased(
            require(cwd('package.json')).name);
    } else {
        output.library = library;
    }
    if (libraryTarget) {
        output.libraryTarget = libraryTarget;
    }
}


const externals = useExternalizePeers(useExternals({}));

let webpack = {
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
        alias     : useDepAlias(useAlias()),

    },
    resolveLoader: {
        modules: [
            'node_modules',
            cwd('node_modules'),
            path.resolve(__dirname, 'node_modules'),
        ],
        alias  : resolveMap(
            'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader',
            'raw-loader',
            'file-loader',
            'url-loader',
            'file-loader',
            'json-loader',
            'babel-loader')
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
                use : {
                    loader : 'url-loader',
                    options: {
                        limit   : 10000,
                        mimetype: 'application/font-woff',

                    }
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use : {
                    loader : 'url-loader',
                    options: {
                        limit   : 10000,
                        mimetype: 'application/octet-stream'
                    }
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use : { loader: 'file-loader' }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use : {
                    loader : 'url-loader',
                    options: {
                        limit   : 10000,
                        mimetype: 'image/svg+xml'
                    }
                }
            },
            {
                test: /\.(png|je?pg|gif?f|mpe?g)$/,
                use : {
                    loader : 'file-loader',
                    options: {
                        limit: 10000,
                    }
                }
            },
            {
                test  : /\.less$/,
                loader:
                    opts.useStyle(
                        opts.useCssModule,
                        opts.useLess,
                        opts.usePostCss)

            },
            {
                test  : /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};


webpack.resolve.alias = Object.assign(webpack.resolve.alias,
    resolveMap('react', 'react-dom'));


//if (SUBSCHEMA_MAIN_FIELDS) {
const mainFields = configOrBool(SUBSCHEMA_MAIN_FIELDS, ['source', 'main']);
if (mainFields) {
    webpack.resolve.mainFields =
        Array.isArray(mainFields) ? mainFields : mainFields.split(
            /,\s*/);
    console.warn(`using mainFields`, webpack.resolve.mainFields);
}

//}

function charset(ele) {
    if (!ele.attributes) {
        ele.attributes = {};
    }
    if (!ele.attributes.charset) {
        ele.attributes.charset = 'UTF-8';
    }
}

const ogenerateAssetTags = HtmlWebpackPlugin.prototype.generateAssetTags;

HtmlWebpackPlugin.prototype.generateAssetTags = function (assets) {
    const ret = ogenerateAssetTags.call(this, assets);
    ret.body.forEach(charset);
    ret.head.forEach(charset);
    return ret;
};

opts.HtmlWebpackPlugin = HtmlWebpackPlugin;

opts.useHtml = configOrBool(SUBSCHEMA_USE_HTML);
if (opts.useHtml) {
    console.warn(`using html plugin`);

    opts.useHtml = {
        title     : (deps.description ? deps.description : deps.name),
        hash      : opts.useNameHash,
        template  : opts.useHtml ? path.resolve(__dirname,
            'public',
            opts.analytics ? 'index_analytics.ejs' : 'index.ejs')
            : opts.useHtml,
        filename  : 'index.html',
        publicPath: opts.publicPath,
        analytics : opts.analytics
    };
}

opts.useHot = configOrBool(SUBSCHEMA_USE_HOT);

if (opts.useHot) {
    webpack.devtool = 'cheap-module-source-map';
    babel.plugins.unshift(require.resolve("react-hot-loader/babel"));
    webpack.resolve.alias['webpack/hot/dev-server'] =
        require.resolve('webpack/hot/dev-server.js');

    webpack.resolve.alias['only-dev-server'] =
        require.resolve('webpack/hot/only-dev-server.js');

    console.warn('using hot loading');
}
((idx) => {
    if (idx != -1) {
        opts.target = process.argv[idx + 1];
        process.argv.splice(idx, 2);
    }
})(process.argv.indexOf('--target'));


//we take this away from webpack so we an expose it to the config.
if (SUBSCHEMA_ENTRY) {
    const entry      = {};
    let entryNoParse = JSON.parse('"' + SUBSCHEMA_ENTRY + '"');
    if (!Array.isArray(entryNoParse)) {
        entryNoParse = entryNoParse.split(/,\s*/);
    }
    for (let i = 0, l = entryNoParse.length; i < l; i++) {
        let parts = entryNoParse[i].split('=', 2);
        if (!parts[1]) {
            entry[path.basename(parts[0])] = parts[0];
        } else {
            entry[parts[0]] = parts[1];
        }
    }
    webpack.entry = entry;
} else {
    if (opts.isDemo || configOrBool(SUBSCHEMA_DEV_SERVER)) {
        webpack.entry = { index: cwd('public', 'index') };
    } else if (!webpack.entry && !opts.isKarma) {
        webpack.entry = { index: cwd('src', 'index') };
    }
}

//This is where the magic happens
let customConf = useCustomConf();
opts.webpack   = webpackObject;
if (customConf) {
    webpack = customConf(opts, webpack);
}
if (opts.useDefine) {
    webpack.plugins.push(
        new webpackObject.DefinePlugin(
            Object.keys(opts.useDefine).reduce(function (ret, key) {
                ret[key] = JSON.stringify(opts.useDefine[key]);
                return ret;
            }, {})));
}

if (opts.useHot) {
    const preEntry = ['only-dev-server'];
    if (typeof webpack.entry == 'string') {
        webpack.entry = preEntry.concat(webpack.entry);
    } else if (Array.isArray(webpack.entry)) {
        webpack.entry = webpack.entry.map(entry => preEntry.concat(entry));
    } else if (webpack.entry) {
        webpack.entry =
            Object.keys(webpack.entry).reduce(function (ret, key) {
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
    const subschemaKey = opts.useSubschemaAlias === true ? 'subschema'
        : opts.useSubschemaAlias;
    try {
        webpack.resolve.alias[subschemaKey] =
            require.resolve('subschema/dist/subschema-noreact');
    } catch (e) {
        console.warn('could not resolve subschema alias', e);
    }

}

if (opts.useHtml && !opts.isKarma) {
    /**
     * Allows for a page per entry.
     */
    plugins.push(...Object.keys(webpack.entry).map(key => {
        const config = opts.useHtml;
        const pages  = config.pages || {};
        return new opts.HtmlWebpackPlugin(Object.assign({}, config, {
            filename: `${key}.html`,
        }, pages[key]));
    }));
}
if (opts.useScopeHoist) {
    //  plugins.push(new webpackObject.optimize.ModuleConcatenationPlugin());
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
if (SUBSCHEMA_DEBUG) {
    /* console.log('webpack opts %s, webpack %O', JSON.stringify(opts), JSON.stringify(webpack));*/
    console.log('DEBUG is on');
    console.log('options');
    console.dir(opts);
    console.log('webpack configuration');
    console.dir(webpack);
}
module.exports = webpack;
