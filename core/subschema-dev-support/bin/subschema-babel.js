#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PRESETS = 'subschema-dev-support';
process.env.MRBUILDER_PROFILE = 'babel';
if (!(process.argv.slice(2).includes('-f') || process.argv.slice(2).includes('--file'))) {
    process.argv.splice(2, 0, '-f', '-');
}
require('mrbuilder/bin/mrbuilder');
