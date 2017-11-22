#!/usr/bin/env node
const OptionsManager = require('../lib').default;

const o = new OptionsManager().scan();
console.dir(o);
