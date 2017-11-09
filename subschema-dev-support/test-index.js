require('babel-polyfill');
const nodeLibsBrowser = require('node-libs-browser')
nodeLibsBrowser.assert = require.resolve('browser-assert');
nodeLibsBrowser.util = require.resolve('util');
const testsContext = require.context("test", true, /-test\.jsx?$/);
testsContext.keys().forEach(testsContext);
