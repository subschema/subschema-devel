const path           = require('path');
const SUBSCHEMA_CONF = 'subschema-webpack.config.js';
const fs             = require('fs');

const {
          SUBSCHEMA_PROJECT_DIR   = process.cwd(),
          SUBSCHEMA_DEBUG,
          SUBSCHEMA_ALIAS_PATTERN = 'subschema',
          SUBSCHEMA_USE_ALIASES,
          SUBSCHEMA_USE_EXTERNALS,
          SUBSCHEMA_DEPENDENCY_ALIASES,
          SUBSCHEMA_EXTERNALIZE_PEERS,
          SUBSCHEMA_KARMA,
          SUBSCHEMA_NO_DEPENDENCY_ALIASES,
      } = process.env;

const asArray = Function.call.bind(Array.prototype.slice);
const cwd     = (...args) => path.resolve(SUBSCHEMA_PROJECT_DIR, ...args);
const project = cwd;

function resolvePkgDir(name) {
    return path.resolve(require.resolve(path.join(name, 'package.json')), '..');
}


function pkg() {
    const _pkg = cwd('package.json');
    debug(`using package`, _pkg);
    return require(_pkg);
}

function dependency(current, ...rest) {
    if (current == pkg().name) {
        //if its the current project than we return relative to ourselves
        return project(...rest);
    }
    const local = cwd(current, ...rest);
    if (fs.existsSync(local)) {
        return local;
    }
    return cwd('node_modules', ...rest);
}

function re(str) {
    if (str.startsWith('!')) {
        str = str.substring(1);
    }
    if (str.startsWith('/') && str.endsWith('/')) {
        return str.substring(1,
            str.length - 1);
    }
    if (!str.startsWith('/')) {
        str = '^' + str;
    }
    if (!str.endsWith('/')) {
        str = str + '$';
    }
    return str;
}

function execThis(func) {
    return func(this);
}

function wrapExcludes(excludes = []) {
    excludes = excludes ? Array.isArray(excludes) ? excludes : [excludes] : [];
    excludes = excludes.map(function (str) {
        const isNegate = str.startsWith('!');
        const _re      = new RegExp(re(str));
        return function (v) {
            const ret = isNegate ? !_re.test(v) : _re.test(v);
            return ret;
        }
    });
    return function (value) {
        return excludes.find(execThis, value);
    }
}

//var DEFAULT_EXCLUDE =
// 'subschema(?:$|.|-(?:native|core|loader|project|component|processors|transitions|css|validators|wiki)(?:-.+?)?)';

function keys$unique(ret, key) {
    ret[key] = true;
    return ret;
}

function keys(obj) {
    if (arguments.length == 0) {
        return [];
    }
    if (arguments.length == 1) {
        return Object.keys(obj);
    }
    const ret = {};
    for (let i = 0, l = arguments.length; i < l; i++) {
        const c = arguments[i];
        if (c) {
            Object.keys(c).reduce(keys$unique, ret);
        }
    }
    return Object.keys(ret);
}

function unique(arr) {
    const ret = {};
    for (let i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && arguments[i].reduce(keys$unique, ret);
    }
    return Object.keys(ret);
}

function hasSource(name) {
    return fs.existsSync(path.join(resolvePkgDir(name), 'src'));
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
    console.warn.apply(console, asArray(arguments));
}

function concatFilteredDependencies(core, userPkg = pkg()) {
    const filteredCore                   = filteredDependencies(core);
    const { include = [], exclude = [] } = core.subschema || {};
    const filteredPkg                    = _filteredDependencies(userPkg,
        include, exclude);
    return unique(filteredCore, filteredPkg);
}

function filteredDependencies(userPkg = pkg()) {
    const subschema = userPkg.subschema;
    let include     = subschema && subschema.include;
    let exclude     = subschema && subschema.exclude;
    if (include) {
        include = Array.isArray(include) ? include : [include];
    }
    if (exclude) {
        exclude = Array.isArray(exclude) ? exclude : [exclude];
    }
    return _filteredDependencies(userPkg, include, exclude);
}

function aliasDependencies(userPkg = pkg()) {
    const { include = [], exclude = [] } = userPkg.subschema
                                           || {};
    return _filteredDependencies(userPkg, include, exclude);
}

const isAliasRe = new RegExp(SUBSCHEMA_ALIAS_PATTERN);

function isAliasable(includes = [], excludes = []) {
    const inc = wrapExcludes(includes, false);
    const exc = wrapExcludes(excludes, true);
    return function (name) {
        try {
            const pkg = require(`${name}/package.json`);
            if (inc(pkg.name)) {
                return true;
            }
            if (exc(pkg.name)) {
                return false;
            }
            return isAliasRe.test(pkg.name)
        } catch (e) {
            console.warn(`could not resolve package.json for '%s'`, name);
        }
        return false;
    }
}

function _filteredDependencies({
                                   name, dependencies,
                                   peerDependencies,

                               }        = pkg(),
                               includes,
                               excludes = []) {

    return [name].concat(keys(dependencies, peerDependencies))
                 .filter(isAliasable(includes, excludes));
}

function wrapFunc(f) {
    if (!f) {
        return;
    }
    return function (opts, conf) {
        return f.call(this, opts, conf) || conf;
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

function parseAlias(key) {
    const parts = key.split('=', 2);
    const name  = parts[0];
    if (parts[1]) {
        this[name] = parts[1];
    } else if (fs.existsSync(project(name, 'package.json'))) {
        this[name] = project(name);
    } else {
        this[name] = project('node_modules', name);
    }
}

function useAlias(alias = {}) {
    const _aliases = configOrBool(SUBSCHEMA_USE_ALIASES);
    if (_aliases) {
        _aliases.split(/,\s*/).forEach(parseAlias, alias);
    }
    debug('using aliases', alias);
    return alias;
}

function useExternalizePeers(externals = {}) {
    const usePeers = configOrBool(SUBSCHEMA_EXTERNALIZE_PEERS);
    if (usePeers) {
        const localPkg = project('package.json');
        const peers    = require(localPkg).peerDependencies;
        if (!peers) {
            info(
                `using --externalize-peers however there are no peerDependencies in ${localPkg}`);
        } else {
            Object.keys(peers).reduce(function (ret, key) {

                if (!(key in ret)) {
                    ret[key] = key;
                }
                return ret;
            }, externals);
        }
    }
    return externals;
}

function useExternals(arg = {}) {
    const externals = configOrBool(SUBSCHEMA_USE_EXTERNALS, '');
    if (typeof externals === 'string') {
        return externals.split(/,\s*/)
                        .reduce(function (ret, key) {
                            const [k, v] = key.split(/\s*=\s*/, 2);
                            set(ret, k, v || k);
                            return ret;
                        }, arg);
    }
    return arg;
}


function useCustomConf(customConf, confFile = SUBSCHEMA_CONF, deps = pkg()) {
    aliasDependencies(deps).forEach(function (key) {
        if (fs.existsSync(dependency(key, confFile))) {
            customConf =
                applyFuncs(customConf, require(dependency(key, confFile)));
            debug(`using custom config for ${key}`);
        } else {
            let resolvedTo;
            try {
                resolvedTo = require.resolve(`${key}/${confFile}`);
            } catch (e) {
                //swallow it probably does not exists.
            }
            if (resolvedTo) {
                //don't swallow. because it does exist but theres a problem;
                customConf = applyFuncs(customConf, require(resolvedTo));
                debug(`using custom config for ${key}`);

            }
        }
    });

    return customConf;
}

function resolveRelativePkg(name, ...args) {
    return path.resolve(resolvePkgDir(name), ...args);
}

function makeAlias(ret, key) {
    ret[key + '/lib/style.css'] = resolveRelativePkg(key, 'lib', 'style.css');
    ret[key]                    =
        ret[key + '/lib'] = resolveRelativePkg(key, 'src');
    if (SUBSCHEMA_KARMA) {
        ret[key + '/test'] = resolveRelativePkg(key, 'test');
        ret[key + '/']     = resolveRelativePkg(key, 'src');

    }
    return ret;
}

function useDepAlias(alias = {}, deps = pkg()) {
    let aliasArr = [];

    if (configOrBool(SUBSCHEMA_NO_DEPENDENCY_ALIASES)) {
        return alias;
    }
    const aliases = configOrBool(SUBSCHEMA_DEPENDENCY_ALIASES);
    if (!aliases) {
        aliasArr = aliasDependencies(deps);
    } else {
        aliasArr = aliases.split(/,\s*/);
    }
    const r = (deps.name ? [deps.name].concat(aliasArr) : aliasArr).filter(
        hasSource).reduce(makeAlias, alias);
    return r;
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


module.exports = {
    set,
    camelCased,
    wrapFunc,
    project,
    deps: pkg(),
    pkg,
    configOrBool,
    applyFuncs,
    useAlias,
    useDepAlias,
    useCustomConf,
    useExternals,
    useExternalizePeers,
    filteredDependencies,
    dependency,
    resolvePkgDir,
    debug,
    warn,
    concatFilteredDependencies,
    info,
    cwd, sliced, resolveMap

};
