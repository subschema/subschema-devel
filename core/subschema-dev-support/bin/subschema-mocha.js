#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PRESETS='subschema-dev-support';
require('mrbuilder/bin/mrbuilder-mocha');
