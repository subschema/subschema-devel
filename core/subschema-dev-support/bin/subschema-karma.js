#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PLUGINS='subschema';
process.env.SUBSCHEMA_INTERNAL_PLUGINS='subschema';
require('mrbuilder/bin/mrbuilder-karma');
