const path                         = require('path');
const { existsSync, readFileSync } = require('fs');
const {
          SUBSCHEMA_PROJECT_DIR
              = process.cwd(),
          SUBSCHEMA_DEBUG
      }                            = process.env;

const asArray = Function.call.bind(
    Array.prototype.slice);

const cwd = (...args) =>
    path.resolve(SUBSCHEMA_PROJECT_DIR, ...args);

const project   = cwd;
const parseJSON = (filename) => {
    if (!existsSync(filename)) {
        return;
    }
    const file = readFileSync(filename) + '';
    return JSON.parse(file);
};

function resolvePkgDir(name, pkg, ...rest) {

    try {
        if (pkg === 'package.json') {
            return require.resolve(path.join(name, 'package.json'));
        }
        if (pkg) {
            return path.resolve(
                require.resolve(path.join(name, 'package.json')), '..', pkg,
                ...rest);
        }
        return path.resolve(require.resolve(path.join(name, 'package.json')),
            '..');

    } catch (e) {
        if (pkg().name === name) {
            return cwd();
        }
    }
    throw new Error(`could not resolve package.json in ${name} or ${cwd()}`)
}

const PKG_CACHE = {};

function pkg() {

    const _pkg = cwd('package.json');

    if (PKG_CACHE[_pkg]) {
        return PKG_CACHE[_pkg]
    }

    debug(`using package`, _pkg);
    return (PKG_CACHE[_pkg] = require(_pkg));

}


function keys$unique(ret, key) {
    ret[key] = true;
    return ret;
}

function debug(...args) {
    if (configOrBool(SUBSCHEMA_DEBUG)) {
        console.log('[subschema]', ...args);
    }
}

function warn() {
    console.warn.apply(console, asArray(arguments));
}

function info() {
    const value = configOrBool(SUBSCHEMA_DEBUG);
    if (value > 1) {
        console.warn.apply(console, asArray(arguments));
    }
}

function set(obj, key, value) {
    const keys = key.split('.');
    const last = keys.pop();
    let cobj   = obj || {};
    while (keys.length) {
        const c = keys.shift();
        cobj    = cobj[c] || (cobj[c] = {});
    }
    obj[last] = value;
    return obj;
}

function get(obj, key, def) {
    if (key == null) {
        return obj == null ? def : obj;
    }
    if (obj == null) {
        return def;
    }
    const paths = key.split('.');
    let ret     = obj;
    while (paths.length) {
        if (!obj) {
            return def;
        }
        ret = obj[paths.shift()];
    }
    return ret == null ? def : ret;
}

function applyFuncs(f1, f2) {
    f1 = f1 && (f1.default ? f1.default : f1);
    f2 = f2 && (f2.default ? f2.default : f2);
    if (!f2) {
        return wrapFunc(f1);
    }
    if (!f1 && f2) {
        return wrapFunc(f2);
    }
    if (!f1 && !f2) {
        return null;
    }
    f1 = wrapFunc(f1);
    f2 = wrapFunc(f2);
    return function (opts, conf) {
        //keep scope.
        return f1.call(this, opts, (f2.call(this, opts, conf)));
    }
}


function configOrBool(value, defaultValue) {
    if (value == null) {
        return false;
    }

    switch (String(value).trim().toLowerCase()) {
        case '':
        case 'false':
        case '0':
            return false;
        case 'true':
        case '1':
            return defaultValue || true;
        default:
            return value;
    }
}

const camelCased = function (str) {
    return str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    })
};

const sliced = Function.call.bind(Array.prototype.slice);


function resolveMap(...args) {
    return args.reduce(function (ret, key) {
        ret[key] = resolvePkgDir(key);
        return ret;
    }, {});
}

function parseValue(value) {
    if (/^".*"$/.test(value)) {
        return JSON.parse(value)
    }

    if (/^\/.*\/[gim]*$/.test(value)) {
        const parts = value.split(/^\/(.*)\/([gim]*)$/);
        const re    = parts[1];
        const mod   = parts[2];
        if (mod) {
            return new RegExp(re, mod);
        }
        return new RegExp(re);
    }
    if (/^\d+?(?:\.\d*)?$/) {
        return JSON.parse(value);
    }
    return JSON.parse(`"${value}"`);
}

module.exports = {
    parseValue,
    get,
    set,
    camelCased,
    project,
    pkg,
    configOrBool,
    applyFuncs,
    debug,
    warn,
    parseJSON,
    info,
    cwd, sliced, resolveMap

};
