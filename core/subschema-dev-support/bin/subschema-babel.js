#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PRESETS='subschema-dev-support';
process.env.MRBUILDER_PROFILE = 'babel';

require('mrbuilder/bin/mrbuilder');
