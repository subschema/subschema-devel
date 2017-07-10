#!/usr/bin/env node
var path = require('path');
var cwd = process.cwd();
var argv = process.argv;

if (argv.indexOf('--config') == -1) {
    argv.push('--config', path.resolve(__dirname, '..', 'webpack.config.js'));
}
if (argv.indexOf('--entry') == -1) {
    argv.push('--entry', path.resolve(cwd, 'public', 'index.jsx'));
}
if (argv.indexOf('--output-path') == -1) {
    argv.push('--output-path', path.resolve(cwd, 'lib'))
}
if (argv.indexOf('--output-filename') == -1) {
    argv.push('--output-filename', path.join('app.entry.js'));
}
var idx;
if ((idx = argv.indexOf('--no-hot')) != -1) {
    var hidx = argv.indexOf('--hot');
    if (hidx > -1) {
        argv.splice(hidx, 1);
    }
} else {
    if (argv.indexOf('--hot') == -1) {
        argv.push('--hot');
    }
    process.env.SUBSCHEMA_USE_HOT = 1;
}

if ((idx = argv.indexOf('--use-externals')) != -1) {
    var externals = argv.splice(idx, 2).pop();
    console.warn(`using externals ${externals}`);
    process.env.SUBSCHEMA_USE_EXTERNALS = externals;
}
if (argv.indexOf('-h') != -1 || argv.indexOf('--help') != -1) {
    console.warn(`${argv[1]}
    \t--use-externals a comma seperated dot valued list of externals to use`);
}
process.env.SUBSCHEMA_USE_HTML = 1;
var webpackDevServer = require.resolve('webpack-dev-server/bin/webpack-dev-server');
if (process.env.SUBSCHEMA_DEBUG){
    console.warn(webpackDevServer, argv.slice(2));
}
require(webpackDevServer);
