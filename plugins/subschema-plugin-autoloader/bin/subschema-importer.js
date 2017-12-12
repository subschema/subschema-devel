#!/usr/bin/env node
const Importer = require('../lib/importer').default;
const optionsManager = new (require('mrbuilder-optionsmanager').default)({prefix:'subschema', _require:require});
console.log(Importer(optionsManager).code);
