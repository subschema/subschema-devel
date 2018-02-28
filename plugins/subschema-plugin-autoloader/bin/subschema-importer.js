#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PLUGINS =
    `${process.env.MRBUILDER_INTERNAL_PLUGINS || ''},mrbuilder-plugin-babel`;
const OptionsManager                   = require('mrbuilder-optionsmanager');
const noop                             = () => {
};
global._MRBUILDER_OPTIONS_MANAGER      =
    new OptionsManager({
        prefix: 'mrbuilder', _require: require, info: noop,
        warn  : noop,
        debug : noop
    });

const DefaultLoaderFactory = require('../src/importer');
const babelRc              = require('mrbuilder-plugin-babel/babel-config');

console.log(
    require("babel-core").transform(DefaultLoaderFactory(new OptionsManager({
        prefix  : 'subschema',
        info    : noop,
        warn    : noop,
        debug   : noop,
        _require: require
    })).code, babelRc).code);
