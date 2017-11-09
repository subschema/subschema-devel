#!/usr/bin/env node
const path               = require('path');
const fs                 = require('fs');
const { env, argv, cwd } = process;

const {
          SUBSCHEMA_COVERAGE,
          SUBSCHEMA_COVERAGE_DIR,
          SUBSCHEMA_COVERAGE_USE_GLOBAL,
          SUBSCHEMA_USE_ALIASES,
          npm_lifecycle_event,
      } = env;

function check(file, parent) {
    const p = path.resolve(parent, file);
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
    return /-test\.jsx?$/.test(file)
}

if (!check('test', cwd())) {
    console.warn('no tests for project',
        require(path.resolve(cwd(), 'package.json')).name);
    process.exit(0);
}

function indexOfArg() {
    const args = argv.slice(2);
    for (let i = 0, l = arguments.length; i < l; i++) {
        let idx = args.indexOf(arguments[i]);
        if (idx != -1) {
            return idx;
        }
    }
    return -1;
}

const conf = path.resolve(__dirname, '..', 'karma.conf.js');
let pos;
if ((pos = indexOfArg('start', 'init', 'run', 'completion')) == -1) {
    argv.splice(2, 0, 'start', conf);
} else {
    argv.splice(pos - 1, 0, conf);
}
//only do single run if test event cycle or prepublish.
if (npm_lifecycle_event === 'test' || npm_lifecycle_event === 'prepublish') {
    if (!argv.includes('--single-run', 2)) {
        argv.push('--single-run');
    }
}
if (SUBSCHEMA_COVERAGE || SUBSCHEMA_COVERAGE_DIR
    || SUBSCHEMA_COVERAGE_USE_GLOBAL) {
    env.SUBSCHEMA_COVERAGE = 1;
    if (!argv.includes('--single-run', 2)) {
        argv.push('--single-run');
    }
    if (SUBSCHEMA_COVERAGE_USE_GLOBAL) {
        env.SUBSCHEMA_COVERAGE_DIR = path.resolve(cwd(), '..', 'coverage',
            path.basename(cwd()))
    }
}

if (argv.includes('--single-run', 2) && !argv.includes('--browser', 2)) {
    argv.push('--browser', 'Firefox');
}

env.SUBSCHEMA_MAIN_FIELDS = 1;
env.SUBSCHEMA_KARMA       = 1;
//use these aliases by default, when running in karma. This ensures the same
// version of react, react-dom are used for all tests, regardless of imports.
env.SUBSCHEMA_USE_ALIASES = SUBSCHEMA_USE_ALIASES
    ? `react,react-dom,${SUBSCHEMA_USE_ALIASES}`
    : `react,react-dom`;

require('karma-cli/bin/karma');
