import { join, resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

const parse = (filename) => {
    if (!existsSync(filename)) {
        return;
    }
    try {
        const file = readFileSync(filename);
        return JSON.parse(file + '');
    } catch (e) {
        return null;
    }
};


class Option {
    constructor(pluginPath, config, parent) {
        this.pluginPath = pluginPath;
        this.config     = config;
        this.parent     = parent;
    }
}

export default class OptionsManager {
    constructor({ prefix = 'SUBSCHEMA', envPrefix, confPrefix, rcFile } = {}) {

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


        const cwd = this.cwd =
            (...paths) => resolve(process.env['MODULE_DIR'] || process.cwd(),
                ...paths);

        this.topPackage = require(cwd('package.json'));

        this.resolveFromPkgDir = (pkg, ...relto) => {
            if (!pkg || this.topPackage.name === pkg) {
                return cwd(...relto);
            }
            return resolve(require.resolve(join(pkg, 'package.json')), '..',
                ...relto);
        };

        this.scan = (name, ignoreRc, parent) => {
            const pkg  = require(this.resolveFromPkgDir(name, 'package.json'));
            const conf = pkg[confPrefix] || parse(
                this.resolveFromPkgDir(pkg.name, rcFile));
            if (conf) {
                this.processOpts(pkg.name,
                    ignoreRc ? { ...conf, ignoreRc } : conf, parent);
            }
            return this;
        }
    }

    options = new Map();
    webpack = new Map();

    processOpts = (name, {
        presets,
        plugins,
        ignoreRc,
        webpack,
    } = {}, pkg) => {
        if (webpack) {
            if (!webpack.has(name)) {
                const webpackPlugin = Array.isArray(webpack) ? require(
                    webpack[0])
                    : require(webpack);
                const webpackConf   = Array.isArray(webpack) ? webpack[1] : {};
                webpack.set(name, new Option(webpackPlugin, webpackConf, pkg));
            }

        }
        if (plugins) {
            plugins.forEach(plugin => {
                //plugin can have configuration.
                const pluginName = Array.isArray(plugin) ? plugin[0] : plugin;
                const pluginConf = Array.isArray(plugin) ? plugin[1] : {};
                if (this.options.has(pluginName)) {
                    return;
                }
                this.options.set(pluginName,
                    new Option(pluginName, pluginConf, pkg));

                if (ignoreRc !== true) {
                    this.scan(plugin, ignoreRc, pkg);
                }
            })
        }
        if (presets) {
            //presets do not have configuration.
            presets.forEach(child => {
                this.scan(this.resolveFromPkgDir(child), ignoreRc, pkg)
            });
        }
    }

}
