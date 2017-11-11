#!/usr/bin/env node
const path                  = require('path');
const { configOrBool, cwd } = require('../webpack-utils');
const { argv, env }         = process;

const slice = Function.call.bind(Array.prototype.slice);

function indexOfArg() {
    const args = slice(argv, 2);
    let idx    = -1;
    for (let i = 0, l = arguments.length; i < l; i++) {
        if ((idx = args.indexOf(arguments[i])) !== -1) {
            return idx + 2;
        }
    }
    return -1;
}

function hasArg(...args) {
    return indexOfArg(...args) != -1;
}

function envMap(envName, argNames) {
    argNames = slice(arguments, 1);
    let idx;
    for (let i = 0, l = argNames.length; i < l; i++) {
        if ((idx = indexOfArg(argNames[i])) !== -1) {
            env[envName] = argv[i + 1];
            return true;
        }
    }
    return false;
}

function envRemove(envName, argName, value) {

    let idx;
    if ((idx = indexOfArg(argName)) !== -1) {
        env[envName] = value == null ? 1 : value;
        argv.splice(idx, 1);
        return true;
    }
    return false;
}

function envSplice(envName, argName) {
    let idx;
    if ((idx = indexOfArg(argName)) !== -1) {
        env[envName] = argv.splice(idx, 2).pop();
        return true;
    }
    return false;
}

function envSpliceMulti(envName, argName) {
    let idx;
    if ((idx = indexOfArg(argName)) !== -1) {
        const allArgs = [];
        for (let end = idx + 1, length = argv.length; end < length; end++) {
            if (argv[end].startsWith('-')) {
                break;
            }
            allArgs.push(argv[end])
        }
        argv.splice(idx, allArgs.length + 1);
        env[envName] =
            JSON.stringify(allArgs).replace(/^"(.+?)"$/, '$1');
        return true;
    }
    return false;
}

envSpliceMulti('SUBSCHEMA_ENTRY', '--entry');

if (hasArg('-p', '--production')) {
    env.NODE_ENV = 'production';
}

if (!hasArg('--config')) {
    argv.push('--config', path.resolve(__dirname, '..', 'webpack.config.js'));
}
if (envSplice('SUBSCHEMA_DEMO', '--demo')) {
    env.SUBSCHEMA_USE_NAME_HASH   = 1;
    env.SUBSCHEMA_NO_STYLE_LOADER = 1;
    env.SUBSCHEMA_USE_HTML        = 1;

    const demo = configOrBool(env.SUBSCHEMA_DEMO);
    if (demo) {
        env.SUBSCHEMA_OUTPUT_PATH = cwd(demo === true ? 'demo' : demo);
    }

} else {

    if (!envRemove('SUBSCHEMA_EXTERNALIZE_PEERS', '--externalize-peers')) {
        //By default we externalize peer dependencies.
        env.SUBSCHEMA_EXTERNALIZE_PEERS = 1;
    }
    if (envRemove('SUBSCHEMA_EXTERNALIZE_PEERS', '--no-externalize-peers')) {
        env.SUBSCHEMA_EXTERNALIZE_PEERS = '';
    }
    envMap('SUBSCHEMA_OUTPUT_PATH', '--output-path');
    envMap('SUBSCHEMA_OUTPUT_FILENAME', '--output-filename');
    envMap('SUBSCHEMA_OUTPUT_LIBRARY', '--output-library');
    envMap('SUBSCHEMA_OUTPUT_LIBRARY_TARGET', '--output-library-target');
    envMap('SUBSCHEMA_TARGET', '--target');
    envSplice('SUBSCHEMA_PUBLIC', '--public');
    envRemove('SUBSCHEMA_NO_STYLE_LOADER', '--no-style-loader');
    envSplice('SUBSCHEMA_USE_STATS_FILE', '--use-stats-file');
    envSplice('SUBSCHEMA_USE_EXTERNALS', '--use-externals');

}

if (hasArg('--help', '-h')) {
    console.warn(`
ARGS: ${argv.slice(2)}    
subschema-webpack extensions
    --demo [path]\t\tgenerate a demo app a that location
    --no-style-loader\t\tdon't use style loader (better for server side).
    --use-stats-file [file]\toutput a file with css and compiled information.
    --use-externals [externals]\tuse the following as externals react,...
    --externalize-peers\t\t (default) use this to make externalize the peerDependencies.
    --no-externalize-peers Do not externalize peer dependencies.
    --debug\t\t\toutput some debug information.
    
    
Otherwise supports webpack commands:    
`)
}
require('webpack/bin/webpack');
