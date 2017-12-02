#!/usr/bin/env node
process.env.SUBSCHEMA_INTERNAL_PLUGINS =[process.env.SUBSCHEMA_INTERNAL_PLUGINS, 'subschema-dev-support'].join(',');
require('subschema-dev-webpack/bin/subschema-webpack');
