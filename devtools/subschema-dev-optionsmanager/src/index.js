import { join, resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

const select = (...args) => {
    for (let i = 0, l = args.length; i < l; i++) {
        if (args[i] !== void(0)) {
            return args[i];
        }
    }
};

const parse      = (filename) => {
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
const nameConfig = (value) => {
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
};

class Option {
    constructor(plugin, config, parent) {
        if (!plugin) {
            throw new OptionError(`Option must have a plugin ${parent}`);
        }
        this.plugin = plugin;
        this.config = config;
        this.parent = parent;
    }

    toJSON() {
        return {
            plugin: typeof this.plugin === 'function' ? (this.plugin.name
                                                         || '[function]')
                : this.plugin,
            config: this.config,
            parent: `[${this.parent && this.parent.name}]`
        }
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

        this.resolveConfig = (pkg) => {
            if (typeof pkg === 'string') {
                pkg = require(`${pkg}/package.json`);
            }
            return pkg[confPrefix] || parse(
                this.resolveFromPkgDir(pkg.name, rcFile));
        };

        this.scan = (name, ignoreRc, parent) => {
            const pkg = name === this.topPackage.name ? this.topPackage
                : require(`${name}/package.json`);
            if (Array.isArray(name)) {
                throw new Error(
                    `${name} can not be an array import from ${parent
                                                               && parent.name}`);

            }
            const conf = this.resolveConfig(pkg);

            if (conf) {
                this.processOpts(name, ignoreRc ? { ...conf, ignoreRc } : conf,
                    parent, pkg);
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

    resolve(name, value) {
        if (value.startsWith('.')) {
            if (name === this.topPackage.name) {
                return this.resolveFromPkgDir(name, value);
            }
        }
        return join(name, value);

    }

    processOpts = (name, {
        presets,
        plugins,
        ignoreRc,
        webpack,
        options,
        env,
    } = {}, pkg) => {
        const envOveride = env && process.env.NODE_ENV
                           && env[process.env.NODE_ENV];
        if (envOveride) {
            return this.processOpts(name, {
                presets : select(envOveride.presets || presets),
                options : select(envOveride.options || options),
                plugins : select(envOveride.plugins || plugins),
                webpack : select(envOveride.webpack || webpack),
                ignoreRc: select(envOveride.ignoreRc || ignoreRc),
            }, pkg);
        }
        if (plugins) {
            plugins.forEach(plugin => {
                //plugin can have configuration.
                //first one wins
                const [pluginName, pluginOptions = (this.resolveConfig(
                    pluginName) || {}).options]  = nameConfig(plugin);

                if (/-preset-/.test(pluginName)) {
                    console.warn(
                        'please make sure that a preset [%s] is not being loaded from "%s" as a plugin',
                        pluginName, name);
                }
                const isLocalPlugin     = pluginName.startsWith('.');
                const resolvePluginName = isLocalPlugin
                    ? this.resolveFromPkgDir(pkg.name, pluginName) : pluginName;

                if (this.plugins.has(resolvePluginName)) {
                    return;
                }

                this.plugins.set(resolvePluginName,
                    this.newOption(resolvePluginName, pluginOptions, pkg));

                if (!(ignoreRc || isLocalPlugin)) {
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
            if (webpack === true) {
                webpack = './subschema-webpack.config.js';
            }
            if (!this.webpack.has(name)) {
                const [webpackPlugin, webpackConf] = nameConfig(webpack);

                const webpackPluginLoc = this.resolveFromPkgDir(name,
                    webpackPlugin);

                try {
                    const webpackModule = require(webpackPluginLoc);
                    this.webpack.set(name,
                        this.newOption(webpackModule, webpackConf, pkg));
                } catch (e) {
                    throw new OptionError(`Could not locate "${join(name,
                        webpackPlugin)}" in package "${pkg.name}" - ${webpackPluginLoc}`);
                }
            }
        }
    };

    toJSON() {
        return {
            plugins: this.plugins,
            webpack: this.webpack
        }
    }

}

export class OptionError extends Error {
    constructor(message) {
        super(message);
        // Maintains proper stack trace for where our error was thrown (only
        // available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, OptionError);
        }
    }
}
