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
    constructor(plugin, config, parent) {
        this.plugin = plugin;
        this.config = config;
        this.parent = parent;
    }
}

export default class OptionsManager {

    plugins = new Map();
    webpack = new Map();

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

        this.resolveConfig = function (name) {
            const pkg = require(this.resolveFromPkgDir(name, 'package.json'));
            return pkg[confPrefix] || parse(
                this.resolveFromPkgDir(pkg.name, rcFile));
        };

        this.scan = (name, ignoreRc, parent) => {
            if (Array.isArray(name)) {
                throw new Error(
                    `${name} can not be an array import from ${parent
                                                               && parent.name}`);

            }
            const conf = this.resolveConfig(name);

            if (conf) {
                this.processOpts(name,
                    ignoreRc ? { ...conf, ignoreRc } : conf, parent);
            }
            return this;
        };

        this.scan(this.topPackage.name, false, this.topPackage);
    }

    newOption(plugin, config, parent) {
        const opt          = new Option(plugin, config, parent);
        opt.optionsManager = this;
        return opt;
    }

    processOpts = (name, {
        presets,
        plugins,
        ignoreRc,
        webpack,
    } = {}, pkg) => {

        if (plugins) {
            plugins.forEach(plugin => {
                //plugin can have configuration.
                //first one wins
                const pluginName = Array.isArray(plugin) ? plugin[0] : plugin;
                const pluginConf = Array.isArray(plugin) ? plugin[1]
                    : (this.resolveConfig(plugin) || {}).options;

                if (/-preset-/.test(pluginName)) {
                    console.warn(
                        'please make sure that a preset [%s] is not being loaded from "%s" as a plugin',
                        pluginName, name);
                }

                if (this.plugins.has(pluginName)) {
                    return;
                }
                this.plugins.set(pluginName,
                    this.newOption(pluginName, pluginConf, pkg));

                if (ignoreRc !== true) {
                    this.scan(pluginName, ignoreRc, pkg);
                }
            })
        }

        if (presets) {
            //presets do not have configuration.
            presets.forEach(presetName => {
                if (Array.isArray(presetName)) {
                    console.warn(
                        'presets can not be an array and can not be configured, add the plugin you wish to configure individual plugins');
                    return;
                }
                if (/-plugin-/.test(presetName)) {
                    console.warn(
                        'please make sure that a plugin [%s]  is not being loaded from as a preset from "%s"',
                        presetName, name);
                }
                this.scan(presetName, ignoreRc, pkg)
            });
        }
        //last so we can gather all presets.
        if (webpack) {
            if (!this.webpack.has(name)) {
                const webpackPlugin = Array.isArray(webpack) ? webpack[0]
                    : webpack;
                const webpackConf   = Array.isArray(webpack) ? webpack[1] : {};
                this.webpack.set(name,
                    this.newOption(
                        webpackPlugin.startsWith('.') ? require(
                            this.resolveFromPkgDir(name, webpackPlugin))
                            : require(webpackPlugin), webpackConf, pkg));
            }
        }

    }

}
