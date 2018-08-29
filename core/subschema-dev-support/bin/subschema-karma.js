#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PRESETS='subschema-dev-support';
process.env.SUBSCHEMA_INTERNAL_PRESETS='subschema';
process.env.MRBUILDER_PROFILE = 'karma';
require('mrbuilder/bin/mrbuilder');
