#!/usr/bin/env node
const OptionsManager = new (require('subschema-dev-optionsmanager').default);
console.log(require('../src/DefaultLoader.js')(Array.from(OptionsManager.plugins.keys())).code);
