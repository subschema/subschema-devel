require('subschema-dev-browserslist');
const path           = require('path');
const optionsManager = require('subschema-dev-optionsmanager/instance').default;
const webpackUtils   = require('subschema-dev-utils');
const {
          DefinePlugin,
          optimize: {
              ModuleConcatenationPlugin
          }
      }              = require('webpack');
const configOrBool   = webpackUtils.configOrBool,
      camelCased     = webpackUtils.camelCased,
      resolveMap     = webpackUtils.resolveMap,
      cwd            = webpackUtils.cwd,
      pkg            = webpackUtils.pkg;


const {
          NODE_ENV         = process.argv.includes('-p')
              ? 'production'
              : 'development',
          SUBSCHEMA_DEBUG,
          SUBSCHEMA_TARGET = 'web',
          SUBSCHEMA_OUTPUT_PATH,
          SUBSCHEMA_MAIN_FIELDS,
          SUBSCHEMA_OUTPUT_FILENAME,
          SUBSCHEMA_ENTRY,
          SUBSCHEMA_LIBRARY,
          SUBSCHEMA_LIBRARY_TARGET,
          SUBSCHEMA_USE_HOT,
          SUBSCHEMA_DEV_SERVER,
          SUBSCHEMA_KARMA,
          SUBSCHEMA_DEMO,
          SUBSCHEMA_PUBLIC,
          SUBSCHEMA_USE_NAME_HASH,
          SUBSCHEMA_ANALYZE,
          SUBSCHEMA_USE_ANALYTICS
      } = process.env;


const plugins = [];
const opts    = {
    isProduction : NODE_ENV === 'production',
    isKarma      : optionsManager.enabled('subschema-dev-karma'),
    isDemo       : optionsManager.enabled('subschema-dev-server'),
    isDevServer  : optionsManager.enabled('subschema-dev-webpack'),
    publicPath   : configOrBool(SUBSCHEMA_PUBLIC, '/'),
    useScopeHoist: true,
    useTarget    : SUBSCHEMA_TARGET,
    analyze      : configOrBool(SUBSCHEMA_ANALYZE, 'static'),
};


const output = {
    filename: configOrBool(SUBSCHEMA_OUTPUT_FILENAME, opts.useNameHash)
              || opts.useNameHash || '[name].js',
    path    : configOrBool(SUBSCHEMA_OUTPUT_PATH, cwd('lib'))
              || cwd('lib')
};

//if its not anything else its a library.
let externals = [];
if (!(opts.isKarma || opts.isDevServer || opts.isDemo)) {
    opts.isLibrary      = true;
    const library       = configOrBool(SUBSCHEMA_LIBRARY),
          libraryTarget = configOrBool(SUBSCHEMA_LIBRARY_TARGET, 'umd');

    if (library === true || library === false) {
        output.library = camelCased(pkg().name);
    } else {
        output.library = library;
    }
    if (libraryTarget) {
        output.libraryTarget = libraryTarget;
    }
    externals = Object.keys(pkg().peerDependencies || {});
}
//Any time a peerDependencies is defined, we will make it an
// extenral

let webpack = {

    resolve      : {
        extensions: ['.js', '.jsx'],
        alias     : {}
    },
    resolveLoader: {
        modules: [
            'node_modules',
            cwd('node_modules'),
            path.resolve(__dirname, 'node_modules'),
        ],
        alias  : resolveMap(
            'raw-loader',
            'json-loader'
        )
    },
    output,
    plugins,
    externals,
    module       : {
        rules: [

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
const mainFields = configOrBool(SUBSCHEMA_MAIN_FIELDS,
    opts.useTarget === 'web' ? ['source', 'browser', 'main']
        : ['source', 'main']);
if (mainFields) {
    webpack.resolve.mainFields =
        Array.isArray(mainFields) ? mainFields : mainFields.split(
            /,\s*/);
    console.warn(`using mainFields`, webpack.resolve.mainFields);
}

//}


opts.useHot = configOrBool(SUBSCHEMA_USE_HOT);


((idx) => {
    if (idx != -1) {
        opts.target = process.argv[idx + 1];
        process.argv.splice(idx, 2);
    }
})(process.argv.indexOf('--target'));


//we take this away from webpack so we an expose it to the config.
if (SUBSCHEMA_ENTRY) {
    let entry = {};
    let entryNoParse;
    try {
        entryNoParse = JSON.parse(SUBSCHEMA_ENTRY);
    } catch (e) {
        entryNoParse = JSON.parse('"' + SUBSCHEMA_ENTRY + '"');
    }
    const isStr = typeof entryNoParse === 'string';
    if (isStr || Array.isArray(entryNoParse)) {
        entryNoParse = isStr ? entryNoParse.split(/,\s*/) : entryNoParse;

        for (let i = 0, l = entryNoParse.length; i < l; i++) {
            const parts = entryNoParse[i].split('=', 2);
            let key     = parts[0], value = parts[1];
            if (!value) {
                value = key;
                key   = path.basename(key);
            }
            if (entry[key]) {
                if (Array.isArray(entry[key])) {
                    entry[key].push(value);
                } else {
                    entry[key] = [entry[key], value];
                }
            } else {
                entry[key] = value;
            }
        }
    } else {
        entry = entryNoParse;
    }
    webpack.entry = entry;
} else {
    if (opts.isDemo || configOrBool(SUBSCHEMA_DEV_SERVER)) {
        if (!webpack.entry || (Object.keys(webpack.entry).length === 1)) {
            webpack.entry = { index: cwd('public', 'index') };
        }
    } else if (!webpack.entry && !opts.isKarma) {
        webpack.entry = { index: cwd('src', 'index') };
    }
}

//This is where the magic happens
try {
    optionsManager.webpack.forEach((option, key) => {
        if (option.config !== false) {
            console.warn('loading webpack plugin', key);
            if (typeof option.plugin === 'function') {
                const tmpWebpack = option.plugin.call(opts, option.config || {},
                    webpack,
                    optionsManager);
                if (tmpWebpack) {
                    webpack = tmpWebpack;
                }
            } else if (option.plugin) {
                //TODO - better merge.
                webpack = Object.assign({}, webpack, option.plugin);
            }
        } else {
            console.warn('disabled loading webpack plugin', key);
        }
    });
} catch (e) {
    console.warn('optionsManager', JSON.stringify(optionsManager, null, 2));
    throw e;
}

if (opts.useDefine) {
    webpack.plugins.push(
        new DefinePlugin(
            Object.keys(opts.useDefine).reduce(function (ret, key) {
                ret[key] = JSON.stringify(opts.useDefine[key]);
                return ret;
            }, {})));
}


if (opts.useScopeHoist) {
    webpack.plugins.push(new ModuleConcatenationPlugin());
}

if (SUBSCHEMA_DEBUG) {
    /* console.log('webpack opts %s, webpack %O', JSON.stringify(opts), JSON.stringify(webpack));*/
    console.log('DEBUG is on');
    console.log('optionsManager');
    console.log(JSON.stringify(optionsManager, null, 2));
    console.log('webpack configuration');
    console.dir(webpack);
}
module.exports = webpack;
