"use strict";

const conf = require('./babel-helper');
const Module = require('module');
const path = require('path');
const babelRegister = require('babel-register');
const oload = Module._load;
const project = path.join(__dirname, '..');
//only look into ern- projects that have a src directory.
conf.only = /subschema[^/]*\/(src|test|lib)/;
const cwd = process.cwd();
if (!process.env.SUBSCHEMA_NO_PATH_FIX) {
    Module._load = function (file, parent) {
        const isRelative = file.startsWith('.');

        const fullpath = isRelative ? path.resolve(path.dirname(parent.filename), file).replace(project, '') : file.startsWith('/') ? file.replace(project, '') : file;
        if (isRelative && /subschema(?:[a-z-]*)(\/lib\/(.*))$/.test(fullpath)) {
            const pp = /^\/?(subschema(?:[a-z-]*))(?:\/lib\/)(.+?)$/.exec(fullpath);
            if (pp) {
                return oload(path.join(cwd, '..', pp[1], 'src', pp[2] || 'index.js'));
            }
        }
        const parts = /^(subschema(?:[a-z-]*))(?:\/node_modules\/(subschema(?:[a-z-]*)))*(?:\/(?:src|lib)(?:\/?(.+?)?))?$/.exec(fullpath);
        if (parts) {
            const pkg = parts[1];
            const fpkg = parts[2];
            const file = parts[3] || 'index.js';
            const rp = path.join(project, fpkg || pkg, 'src', file);
            return oload(rp, parent);
        }
        return oload(file, parent);
    };
}
babelRegister(conf);

