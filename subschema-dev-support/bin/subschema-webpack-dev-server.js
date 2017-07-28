#!/usr/bin/env node
var path = require('path');
var argv = process.argv;

process.env.SUBSCHEMA_DEV_SERVER = 1;


if (argv.indexOf('--config') == -1) {
    argv.push('--config', path.resolve(__dirname, '..', 'webpack.config.js'));
}
var idx;
if ((idx = argv.indexOf('--no-hot')) != -1) {
    argv.splice(idx, 1);
    idx = argv.indexOf('--hot');
    if (idx > -1) {
        argv.splice(idx, 1);
    }

    process.env.SUBSCHEMA_USE_HOT = 0;
} else if (argv.indexOf('--hot') == -1) {
    argv.push('--hot');
    process.env.SUBSCHEMA_USE_HOT = 1;
}

if ((idx = argv.indexOf('--public')) != -1) {
    process.env.SUBSCHEMA_PUBLIC = argv[idx + 1];
}

if ((idx = argv.indexOf('--use-externals')) != -1) {
    var externals = argv.splice(idx, 2).pop();
    console.warn(`using externals ${externals}`);
    process.env.SUBSCHEMA_USE_EXTERNALS = externals;
}
if ((idx = argv.indexOf('--no-use-externals')) != -1) {
    argv.splice(idx, 1);
    process.env.SUBSCHEMA_USE_EXTERNALS = '';

}
if (argv.indexOf('-h') != -1 || argv.indexOf('--help') != -1) {
    console.warn(`${argv[1]}
    \t--use-externals a comma seperated dot valued list of externals to use`);
}
process.env.SUBSCHEMA_USE_HTML = 1;
var webpackDevServer           = require.resolve(
    'webpack-dev-server/bin/webpack-dev-server');
if (process.env.SUBSCHEMA_DEBUG) {
    console.warn('subschema-debug', webpackDevServer, 'arguments',
        argv.slice(2));
}
require(webpackDevServer);
