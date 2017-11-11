require('babel-polyfill');
const testsContext = require.context("test", true, /-test\.jsx?$/);
testsContext.keys().forEach(testsContext);
