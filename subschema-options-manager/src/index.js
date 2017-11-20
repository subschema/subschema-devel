const { resolve, join } = require('path');
const { readFileSync }  = require('fs');

const parse = (filename) => {
    try {
        const file = fs.readFileSync(filename);
        return JSON.parse(file + '');
    } catch (e) {
        return null;
    }
};

function uniqKeys$inner(kk) {
    if (this.includes(kk)) {
        this.push(kk);
    }
}

const uniqKeys = (...args) => args.reduce(function (ret, key) {
    const keys = Object.isArray(key) ? key : Object.keys(key);
    keys.forEach(uniqKeys$inner, ret);
    return ret;
}, []);

class Option {
    constructor(name, config, parent) {
        this.name   = name;
        this.config = config;
        this.parent = parent;
    }
}

class OptionsManager {
    constructor({ prefix = 'SUBSCHEMA', envPrefix, confPrefix, rcFile }) {

        envPrefix  = envPrefix || prefix.toUpperCase();
        confPrefix = confPrefix || prefix.toLowerCase();
        rcFile     = `.${confPrefix}}rc`;

        this.env = (key, value) => {
            key = `${envPrefix}_${key}`;
            if (arguments.length < 2) {
                return process.env[key];
            }
            if (!process.env[key]) {
                return (process.env[key] = value);
            }
            return process.env[key];
        };


        this.cwd = cwd =
            (...paths) => resolve(env('MODULE_DIR', process.cwd()), ...paths);

        this.topPackage = reqiure(cwd('package.json');

        this.resolveFromPkgDir = (pkg, ...relto) => {
            if (this.topPackage.name === pkg) {
                return cwd(...relto);
            }
            return resolve(require.resolve(join(pkg, 'package.json')), '..',
                ...relto);
        };

        this.scan = (pkg, ignoreRc, parent) => {
            if (pkg[confPrefix]) {
                this.processOpts(pkg.name, pkg[confPrefix], parent);
            } else {
                this.processOpts(pkg.name,
                    parse(this.resolveFromPkgDir(pkg.name, rcFile)), parent);
            }

            /*            uniqKeys(pkg.dependencies,
                            pkg.peerDependencies,
                            //no pkg.devDependencies to allow for better isolation,
                            pkg.optionalDependencies).forEach((key) => {
                            this.scan(this.resolveFromPkgDir(key, 'package.json'), pkg);
                        });*/
        }
    }

    options     = [];
    searched    = [];
    processOpts = (name, {
        presets,
        plugins,
        ignoreRc,

    } = {}, pkg) => {
        if (presets) {
            //presets do not have configuration.
            presets.forEach(child => {
                this.scan(this.resolveFromPkgDir(child), ignoreRc, pkg)
            });
        }
        if (plugins) {
            plugins.forEach(plugin => {
                //plugin can have configuration.
                if (Array.isArray(plugin)) {
                    this.options.push(new Option(plugin[0], plugin[1], pkg));
                    if (!ignoreRc) {
                        this.scan(plugin[1], ignoreRc, pkg);
                    }
                } else {
                    this.options.push(new Option(plugin, void(0), pkg));
                    if (!ignoreRc) {
                        this.scan(plugin, ignoreRc, pkg);
                    }
                }
            })
        }
    }

}
