#!/usr/bin/env node

const noop = () => {
};

const Importer       = require('../lib/importer').default;
const optionsManager = new (require('mrbuilder-optionsmanager').default)(
    {
        prefix  : 'subschema',
        info    : noop,
        warn    : noop,
        debug   : noop,
        _require: require
    });
console.log(Importer(optionsManager).code);
