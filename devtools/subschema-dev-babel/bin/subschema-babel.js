#!/usr/bin/env node
const { plugins, presets } = require('../');
const { argv }             = process;
if (!argv.includes('-s')) {
    argv.push('-s', 'true');
}
if (!(argv.includes('--out-file') || argv.includes('--out-dir'))) {
    argv.push('--out-dir', 'lib');
}
if (!(argv.includes('--copy-files') || argv.includes('-D'))) {
    argv.push('--copy-files');
}
if (!argv.includes('--presets')) {
    argv.push('--presets', presets);
}
if (!argv.includes('--plugins')) {
    argv.push('--plugins', plugins);
}
if (!(argv.includes('--out-file') || argv.includes('--filename'))) {
    argv.push('src');
}
require('babel-cli/bin/babel');
