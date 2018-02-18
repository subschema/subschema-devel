#!/usr/bin/env node
const DefaultLoaderFactory = require('subschema-plugin-autoloader')
const noop                 = () => {
};
const optionsManager       = new (require('mrbuilder-optionsmanager').default)({
    prefix  : 'subschema',
    info    : noop,
    warn    : noop,
    debug   : noop,
    _require: require
});
console.log(DefaultLoaderFactory(optionsManager).code);
