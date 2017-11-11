#!/usr/bin/env node
console.log(require('../src/DefaultLoader.js')(require('subschema-dev-support/webpack-utils').filteredDependencies(require(`${process.cwd()}/package.json`))).code);
