import { join, resolve } from 'path';
import {
    configOrBool, get, info, parseJSON, parseValue, set, warn
} from 'subschema-dev-utils';
import { merge, nameConfig, select } from './util';

const split = (value = '') => (Array.isArray(value) ? value
    : value.split(/,\s*/)).filter(Boolean);

export const DEFAULT_ALL = ['DEBUG',
    'ENABLE',
    'DISABLE',
    'PLUGINS',
    'PRESETS',
    'MODULE_DIR'
];

export default class OptionsManager {

    plugins = new Map();
    webpack = new Map();

    constructor({
                    prefix,
                    envPrefix,
                    confPrefix,
                    rcFile,
                    all = DEFAULT_ALL,
                    env = {},
                    argv = [],
                    cwd,
                    webpackFilePath,
                    _require = require
                } = {}) {
        prefix            = prefix.toUpperCase();
        envPrefix         = envPrefix || prefix.toUpperCase();
        confPrefix        = confPrefix || prefix.toLowerCase();
        rcFile            = `.${confPrefix}rc`;
        const webpackFile =
                  webpackFilePath
                  || `${envPrefix.toLowerCase()}-webpack.config.js`;

        this.env = (key, def) => {
            const ret = env[key.toUpperCase()];
            if (ret === null || ret === void(0)) {
                return def;
            }
            return ret;
        };

        this.cwd        = (...paths) => resolve(this.env('MODULE_DIR', cwd()),
            ...paths);
        this.topPackage = _require(this.cwd('package.json'));


        this.warn = (...args) => {
            console.warn(`WARN [[${prefix.toLowerCase()}]`, ...args);

        };

        this.info = (...args) => {
            if (this.env('DEBUG')) {
                console.warn(`INFO [${prefix.toLowerCase()}]`, ...args);
            }
        };

        const resolveFromPkgDir = (pkg, file, ...relto) => {
            if (!pkg || this.topPackage.name === pkg) {
                if (file === 'package.json') {
                    return this.topPackage;
                }
                return this.cwd(file, ...relto);
            }
            if (file === 'package.json') {
                return _require.resolve(join(pkg, file))
            }
            return resolve(_require.resolve(join(pkg, 'package.json')), '..',
                file, ...relto);
        };

        const resolveConfig = (pkg) => {
            if (typeof pkg === 'string') {
                pkg = _require(`${pkg}/package.json`);
            }
            return pkg[confPrefix] || parseJSON(
                resolveFromPkgDir(pkg.name, rcFile));
        };

        const processEnv = (prefix = '') => {
            const plugins = split(
                this.env(`${envPrefix}_${prefix}PLUGINS`, ''));
            const presets = split(
                this.env(`${envPrefix}_${prefix}PLUGINS`, ''));
            this.info('process', plugins, presets, 'from env', prefix);
            if ((plugins.length || presets.length)) {
                processOpts.call(this,
                    this.topPackage.name, { plugins, presets },
                    this.topPackage);
            }
        };

        const newOption = (name, plugin, config, parent) => {
            const opt          = new Option(name, plugin,
                merge(plugin, config, { argv, env }), parent);
            opt.optionsManager = this;
            return opt;
        };

        this.scan = (name, ignoreRc, parent) => {
            this.info('scanning', name);

            const pkg = name === this.topPackage.name ? this.topPackage
                : _require(`${name}/package.json`);
            if (Array.isArray(name)) {
                throw new Error(
                    `${name} can not be an array import from ${parent
                                                               && parent.name}`);

            }
            const conf = resolveConfig(pkg);

            if (conf) {
                processOpts.call(this, name,
                    ignoreRc ? { ...conf, ignoreRc } : conf,
                    parent, pkg);
            }
            return this;
        };
        processEnv();
        this.scan(this.topPackage.name, false, this.topPackage);
        //ALLOW for fallbacks when tooling wants to signal things.
        processEnv('INTERNAL_');


        function processOpts(name, {
            presets,
            plugins,
            ignoreRc,
            webpack,
            options,
            env = {},
        } = {}, pkg) {
            const envOveride = env.NODE_ENV && env[env.NODE_ENV];
            if (envOveride) {
                return processOpts.call(this, name, {
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
                    const [pluginName, pluginOptions = (resolveConfig(
                        pluginName) || {}).options]  = nameConfig(plugin);

                    if (/-preset-/.test(pluginName)) {
                        this.warn(
                            'please make sure that a preset [%s] is not being loaded from "%s" as a plugin',
                            pluginName, name);
                    }
                    const isLocalPlugin     = pluginName.startsWith('.');
                    const resolvePluginName = isLocalPlugin
                        ? resolveFromPkgDir(pkg.name, pluginName)
                        : pluginName;

                    if (this.plugins.has(resolvePluginName)) {
                        return;
                    }

                    this.plugins.set(resolvePluginName,
                        newOption(resolvePluginName, resolvePluginName, pluginOptions, pkg));

                    if (!(ignoreRc || isLocalPlugin)) {
                        this.scan(pluginName, ignoreRc, pkg);
                    }
                })
            }

            if (presets) {
                //presets do not have configuration.
                presets.forEach(presetName => {
                    if (Array.isArray(presetName)) {
                        this.warn(
                            'presets can not be an array and can not be configured, add the plugin you wish to configure individual plugins');
                        return;
                    }
                    if (/-plugin-/.test(presetName)) {
                        this.warn(
                            'please make sure that a plugin [%s]  is not being loaded from as a preset from "%s"',
                            presetName, name);
                    }
                    this.scan(presetName, ignoreRc, pkg)
                });
            }
            //last so we can gather all presets.
            if (webpack) {

                if (this.webpack.has(name)) {
                    return;
                }
                let [webpackPlugin, webpackConf] = nameConfig(webpack);
                if (webpackPlugin === true) {
                    webpackPlugin = webpackFile;
                } else if (webpackPlugin === false) {
                    this.webpack.set(name, false);
                    return;
                }
                const webpackPluginLoc = resolveFromPkgDir(name, webpackPlugin);

                try {
                    const webpackModule = _require(webpackPluginLoc);
                    this.webpack.set(name,
                        newOption(name, webpackModule, webpackConf, pkg));
                } catch (e) {
                    warn(`Could not locate "${join(name,
                        webpackPlugin)}" in package "${pkg.name}" - ${webpackPluginLoc}`);
                    throw e;
                }
            }
        };


    }

    resolve(name, value) {
        if (value.startsWith('.')) {
            if (name === this.topPackage.name) {
                return this.resolveFromPkgDir(name, value);
            }
        }
        return join(name, value);

    }

    config(name, def) {
        const parts = name.split('.', 2);
        const key   = parts.shift();
        if (!this.enabled(key)) {
            return false;
        }
        const config = this.plugins.get(key).config;
        return get(config, parts.shift(), def);
    }

    enabled(name) {
        const option = this.plugins.get(name);
        if (option == null || option.config === false) {
            return false;
        }
        return true;
    }

    //make nice stringify
    toJSON() {
        return {
            plugins: this.plugins,
            webpack: this.webpack
        }
    }
}


class Option {
    constructor(name,
                plugin,
                config,
                parent) {
        if (!plugin) {
            throw new Error(
                `Option must have a plugin ${parent} for [${name}]`);
        }
        this.plugin = plugin;
        this.config = config;
        this.parent = parent;
        this.name   = name;
    }

    info(...args) {
        this.optionsManager && this.optionsManager.info(`- ${this.name}`,
            ...args);
    }

    warn(...args) {
        this.optionsManager && this.optionsManager.warn(`- ${this.name}`,
            ...args);
    }

    toJSON() {
        return {
            name  : this.name,
            plugin: typeof this.plugin === 'function' ? (this.plugin.name
                                                         || '[function]')
                : this.plugin,
            config: this.config,
            parent: `[${this.parent && this.parent.name}]`
        }
    }
}
