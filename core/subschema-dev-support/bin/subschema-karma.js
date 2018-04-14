#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PRESETS='subschema-dev-support';
process.env.SUBSCHEMA_INTERNAL_PRESETS='subschema';

require('mrbuilder/bin/mrbuilder-karma');
