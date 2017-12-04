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

    constructor({
                    prefix,
                    envPrefix,
                    confPrefix,
                    rcFile,
                    all = DEFAULT_ALL,
                    env = process.env,
                    argv = process.argv,
                    cwd = process.cwd,
                    webpackFilePath,
                    info = console.info || console.warn,
                    warn = console.warn,
                    _require = require
                } = {}) {
        prefix     = prefix.toUpperCase();
        envPrefix  = envPrefix || prefix.toUpperCase();
        confPrefix = confPrefix || prefix.toLowerCase();
        rcFile     = `.${confPrefix}rc`;

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
            warn(`WARN [${prefix.toLowerCase()}]`, ...args);

        };

        this.info = (...args) => {
            if (this.env(`${envPrefix}_DEBUG`)) {
                info(`INFO [${prefix.toLowerCase()}]`, ...args);
            }
        };

        this.info('NODE_ENV is', env.NODE_ENV);

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
            const pluginConfig = pkg[confPrefix]
                                 || parseJSON(
                    resolveFromPkgDir(pkg.name, rcFile))
                                 || {};

            const envOverride = pluginConfig.env
                                && pluginConfig.env[env.NODE_ENV] || {};
            return {
                presets : select(envOverride.presets, pluginConfig.presets),
                options : select(envOverride.options, pluginConfig.options),
                plugins : select(envOverride.plugins, pluginConfig.plugins),
                webpack : select(envOverride.webpack, pluginConfig.webpack),
                ignoreRc: select(envOverride.ignoreRc, pluginConfig.ignoreRc),
            };
        };


        const newOption = (name, plugin, config, parent) => {
            if (config === false) {
                return false;
            }
            const opt          = new Option(name, plugin, config, parent);
            opt.optionsManager = this;
            return opt;
        };

        const processOpts = (name, {
            presets,
            plugins,
            ignoreRc,
            webpack
        } = {}, options, pkg, parent, override) => {
            if (this.plugins.has(name)) {
                return;
            }

            if (options === false) {
                this.plugins.set(name, false);
                return;
            } else {
                let plugin;
                if (webpack) {
                    plugin = require(resolveFromPkgDir(name,
                        webpack === true ? webpackFile : webpack));
                }
                this.plugins.set(name, newOption(name, plugin, options, pkg));
            }

            if (plugins) {
                plugins.map(plugin => {
                    const [pluginName, pluginOpts] = nameConfig(plugin);
                    if (pluginOpts === false) {
                        this.plugins.set(pluginName, false);
                        return;
                    }
                    const isLocal = pluginName.startsWith('.');
                    if (isLocal) {
                        const localName = join(name, pluginName);
                        this.plugins.set(localName,
                            newOption(localName, require(localName), pluginOpts,
                                pkg));
                        return;
                    }
                    return [pluginName, override || pluginOpts];
                }).filter(Boolean).forEach(([pluginName, pluginOpts]) => {
                    scan(ignoreRc, pkg, pluginName, pluginOpts);
                })
            }

            if (presets) {
                //presets all get the same configuration.
                presets.forEach(preset => {
                    const [presetName, config] = nameConfig(preset);
                    scan(ignoreRc, pkg, presetName, void(0), config)
                });
            }
        };
        const processEnv  = (prefix = '') => {
            const pluginsName = `${envPrefix}_${prefix}PLUGINS`;
            const presetsName = `${envPrefix}_${prefix}PRESETS`;
            const plugins     = split(this.env(pluginsName, ''));
            const presets     = split(this.env(presetsName, ''));
            if ((plugins.length || presets.length)) {
                this.info('process from env', pluginsName, plugins,
                    presetsName, presets);
                processOpts(`${envPrefix}_${prefix}ENV`,
                    { plugins, presets },
                    void(0),
                    this.topPackage);
            }
        };
        const scan        = (ignoreRc, parent, name, options, override) => {
            this.info('scanning', name);

            const pkg = name === this.topPackage.name ? this.topPackage
                : _require(`${name}/package.json`);
            if (Array.isArray(name)) {
                throw new Error(
                    `${name} can not be an array import from ${parent
                                                               && parent.name}`);

            }

            const pluginConf = resolveConfig(pkg);

            options = merge(name, options || pluginConf.options, { env, argv });

            processOpts(name, pluginConf, options, pkg, parent,
                override);
        };


        processEnv();
        scan(false, this.topPackage, this.topPackage.name);
        //ALLOW for fallbacks when tooling wants to signal things.
        processEnv('INTERNAL_');

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
        return !!this.plugins.get(name);
    }

    //make nice stringify
    toJSON() {
        return {
            name   : this.topPackage.name,
            plugins: this.plugins
        }
    }
}

class Option {
    constructor(name,
                plugin,
                config,
                parent) {
        this.name   = name;
        this.plugin = plugin;
        this.config = config;
        this.parent = parent;
    }

    info(...args) {
        (this.optionsManager || console).info(`- ${this.name}`,
            ...args);
    }

    warn(...args) {
        (this.optionsManager || console).warn(`- ${this.name}`, ...args);
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
