#!/usr/bin/env node
const OptionsManager = new (require('subschema-dev-optionsmanager').default);
const DefaultLoaderFactory = require('subschema-dev-autoloader').default;
console.log(DefaultLoaderFactory(OptionsManager).code);
