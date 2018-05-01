#!/usr/bin/env node
require('rimraf')('./lib', function () {
    console.log('removed', process.cwd() + '/lib');
});
