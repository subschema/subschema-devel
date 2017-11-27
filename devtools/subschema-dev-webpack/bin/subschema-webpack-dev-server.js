#!/usr/bin/env node
const path = require('path');
const argv = process.argv;
const env  = process.env;


env.SUBSCHEMA_DEV_SERVER = env.SUBSCHEMA_DEV_SERVER || 1;
env.SUBSCHEMA_USE_HTML   = env.SUBSCHEMA_USE_HTML || 1;
env.SUBSCHEMA_MAIN_FIELDS = env.SUBSCHEMA_MAIN_FIELDS || 1;
if (!env.NODE_ENV) {
    env.NODE_ENV = 'development';
}

if (!argv.includes('--config')) {
    argv.push('--config', path.resolve(__dirname, '..', 'webpack.config.js'));
}

let idx;
if ((idx = argv.indexOf('--no-hot')) !== -1) {
    argv.splice(idx, 1);
    idx = argv.indexOf('--hot');
    if (idx > -1) {
        argv.splice(idx, 1);
    }

    env.SUBSCHEMA_USE_HOT = 0;
} else if (!argv.includes('--hot')) {
    argv.push('--hot');
    env.SUBSCHEMA_USE_HOT = 1;
}

if ((idx = argv.indexOf('--public')) !== -1) {
    env.SUBSCHEMA_PUBLIC = argv[idx + 1];
}

if ((idx = argv.indexOf('--use-externals')) !== -1) {
    const externals = argv.splice(idx, 2).pop();
    console.warn(`using externals ${externals}`);
    env.SUBSCHEMA_USE_EXTERNALS = externals;
}
if ((idx = argv.indexOf('--no-use-externals')) !== -1) {
    argv.splice(idx, 1);
    env.SUBSCHEMA_USE_EXTERNALS = '';
}
if ((idx = argv.indexOf('--entry')) !== -1) {
    const entryArgs = [];
    for (let i = idx + 1, l = argv.length; i < l; i++) {
        if (argv[i].startsWith('-')) {
            break;
        }
        entryArgs.push(argv[i]);
    }
    argv.splice(idx, entryArgs.length + 1);
    env.SUBSCHEMA_ENTRY = JSON.stringify(entryArgs).replace(/^"(.+?)"$/, '$1');
}

if (argv.indexOf('-h') !== -1 || argv.indexOf('--help') !== -1) {
    console.warn(`${argv[1]}
    \t--public use this as public dir
    \t--hot enable hot loading
    \t--no-hot disable hot loading
    \t--use-externals a comma seperated dot valued list of externals to use`);
}
const webpackDevServer = require.resolve(
    'webpack-dev-server/bin/webpack-dev-server');
if (env.SUBSCHEMA_DEBUG) {
    console.warn('subschema-debug', webpackDevServer, 'arguments',
        argv.slice(2));
}
require(webpackDevServer);
