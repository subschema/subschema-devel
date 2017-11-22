#!/usr/bin/env node
const { cwd, configOrBool, resolvePkgDir } = require('subschema-dev-utils');
const path                                 = require('path');
const fs                                   = require('fs');
const { env, argv }                        = process;

const {
          SUBSCHEMA_DEBUG,
          SUBSCHEMA_COVERAGE,
          SUBSCHEMA_COVERAGE_DIR,
          SUBSCHEMA_COVERAGE_USE_GLOBAL,
          SUBSCHEMA_TEST_PATTERN = '-test\.jsx?$',
          SUBSCHEMA_MODULE_DIR   = cwd('test'),
          SUBSCHEMA_MOCHA_TEST   = 'test/**-test.js'
      } = env;

const testRe = new RegExp(SUBSCHEMA_TEST_PATTERN);

function check(file, parent) {
    const p = parent ? path.resolve(parent, file) : file;
    if (!fs.existsSync(p)) {
        return false;
    }
    if (fs.lstatSync(p).isDirectory()) {
        const files = fs.readdirSync(p);
        for (let i = 0, l = files.length; i < l; i++) {
            if (check(files[i], p)) {
                return true;
            }
        }
    }
    return testRe.test(file)
}

if (!check(SUBSCHEMA_MODULE_DIR)) {
    console.warn('no tests for project ', SUBSCHEMA_MODULE_DIR);
    process.exit(0);
}

console.warn(`running tests '${cwd()}/${SUBSCHEMA_MOCHA_TEST}'`);
argv.push('--timeout', '20000');

let mocha;
try {
    mocha = require.resolve('mocha/bin/_mocha');
} catch (e) {
    mocha = `${__dirname}/../node_modules/mocha/bin/_mocha`;
}

(idx => {
    if (idx > -1) {
        argv.splice(idx, 1);
        env.SUBSCHEMA_NO_PATH_FIX = 1;
    }
})(argv.indexOf('--no-fix-paths'));

if (configOrBool(SUBSCHEMA_COVERAGE)
    || configOrBool(SUBSCHEMA_COVERAGE_DIR)
    || configOrBool(SUBSCHEMA_COVERAGE_USE_GLOBAL)) {

    env.SUBSCHEMA_COVERAGE = 1;
    let coverage           = env.SUBSCHEMA_COVERAGE_DIR || cwd('coverage');

    if (configOrBool(SUBSCHEMA_COVERAGE_USE_GLOBAL)) {
        coverage = cwd('..', 'coverage', path.basename(cwd()))
    }

    env.SUBSCHEMA_COVERAGE_LOAD_PLUGIN = 1;

    argv.splice(2, 0, '--source-map=false', `--report-dir=${coverage}`,
        `--reporter=json`, `--instrument=false`, '--all',
        '--include=src/**/*.js', mocha);
    mocha = path.resolve(__dirname, '..', 'node_modules', '.bin', 'nyc');
} else {
    argv.push('-r', resolvePkgDir('babel-polyfill'));
}
argv.push('-r', require.resolve('subschema-dev-babel/babel-register'));
argv.push(SUBSCHEMA_MOCHA_TEST);
if (SUBSCHEMA_DEBUG) {
    console.log(`[subschema-mocha] running with args `, argv);
}
require(mocha);
