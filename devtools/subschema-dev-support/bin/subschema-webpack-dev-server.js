#!/usr/bin/env node
process.env.SUBSCHEMA_INTERNAL_PLUGINS = 'subschema-dev-support';
require('subschema-dev-webpack-server/bin/subschema-dev-webpack-server');
