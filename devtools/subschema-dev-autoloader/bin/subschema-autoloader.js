#!/usr/bin/env node
const DefaultLoaderFactory = require('subschema-dev-autoloader').default;
console.log(DefaultLoaderFactory(require('subschema-dev-optionsmanager/lib/instance').default).code);
