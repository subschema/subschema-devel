#!/usr/bin/env node
var path  = require('path');
var argv  = process.argv;
var slice = Function.call.bind(Array.prototype.slice);

function indexOfArg() {
    var argv = slice(process.argv, 2);
    var idx  = -1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        if ((idx = argv.indexOf(arguments[i])) != -1) {
            return idx + 2;
        }
    }
    return -1;
}

function hasArg() {
    return indexOfArg.apply(null, arguments) != -1;
}

function envMap(envName, argNames) {
    argNames = slice(arguments, 1);
    var idx;
    for (var i = 0, l = argNames.length; i < l; i++) {
        if ((idx = indexOfArg(argNames[i])) != -1) {
            process.env[envName] = argv[i + 1];
            return true;
        }
    }
    return false;
}

function envRemove(envName, argName, value) {

    var idx;
    if ((idx = indexOfArg(argName)) != -1) {
        process.env[envName] = value == null ? 1 : value;
        argv.splice(idx, 1);
        return true;
    }
    return false;
}

function envSplice(envName, argName) {
    var idx;
    if ((idx = indexOfArg(argName)) != -1) {
        process.env[envName] = argv.splice(idx, 2).pop();
        return true;
    }
    return false;
}


if (hasArg('-p', '--production')) {
    process.env.NODE_ENV = 'production';
}
if (!hasArg('--config')) {
    argv.push('--config', path.resolve(__dirname, '..', 'webpack.config.js'));
}

if (envSplice('SUBSCHEMA_DEMO', '--demo')) {
    process.env.SUBSCHEMA_USE_NAME_HASH   = 1;
    process.env.SUBSCHEMA_NO_STYLE_LOADER = 1;
    process.env.SUBSCHEMA_USE_HTML        = 1;
    var demo                              = process.env.SUBSCHEMA_DEMO;
    if (!(demo == true || demo == '1' || demo == 1 )) {
        if (demo.startsWith('.') || !demo.startsWith('/')) {
            process.env.SUBSCHEMA_OUTPUT_PATH =
                path.resolve(process.cwd(), demo);
        }
    } else {
        process.env.SUBSCHEMA_DEMO = 1;
    }
} else {

    if (!envRemove('SUBSCHEMA_EXTERNALIZE_PEERS', '--externalize-peers')) {
        //By default we externalize peer dependencies.
        process.env.SUBSCHEMA_EXTERNALIZE_PEERS = 1;
    }
    if (envRemove('SUBSCHEMA_EXTERNALIZE_PEERS', '--no-externalize-peers')) {
        process.env.SUBSCHEMA_EXTERNALIZE_PEERS = '';
    }
    envMap('SUBSCHEMA_OUTPUT_PATH', '--output-path');
    envMap('SUBSCHEMA_OUTPUT_FILENAME', '--output-filename');
    envMap('SUBSCHEMA_OUTPUT_LIBRARY', '--output-library');
    envMap('SUBSCHEMA_OUTPUT_LIBRARY_TARGET', '--output-library-target');
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
