import {
    configOrBool, info, parseJSON, parseValue, set, warn
} from 'subschema-dev-utils';

export const select = (...args) => {
    for (let i = 0, l = args.length; i < l; i++) {
        if (args[i] !== void(0)) {
            return args[i];
        }
    }
};


export const nameConfig = (value) => {
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
};


export const camel = (v = '', idx) => !v ? v : `${idx > 0 ? v[0].toUpperCase()
    : v[0].toLowerCase()}${v.substring(1)
                            .toLowerCase()}`;

export const parse = (value, name) => {
    try {
        return parseValue(value);
    } catch (e) {
        console.warn('error parsing "%s" in [%s]', value, name);
        return;
    }
};

export const mergeEnv = (plugin, options = {}, { env } = process) => {
    if (options === false) {
        options = {};
    }

    const upperPlugin = plugin.toUpperCase();
    const keys        = Object.keys(env);
    let ret           = Object.assign({}, options);
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        if (key === upperPlugin) {
            const value = configOrBool(env[key]);
            if (value === false) {
                return false;
            } else {
                ret = parse(value, plugin);
            }
        }
        if (key.startsWith(upperPlugin)) {
            const keyPart   = key.substring(upperPlugin.length + 1);
            const camelName = keyPart.split('_').map(camel).join('');
            set(ret, camelName, parse(env[key], plugin));
        }
    }
    return ret;
};

export const mergeArgs          = (plugin, options, { argv } = process) => {
    if (options === false) {
        options = {};
    }

    const copy = [];
    let ret    = Object.assign({}, options);

    for (let i = 2, l = argv.length; i < l; i++) {
        let arg = argv[i];
        if (arg.startsWith('--')) {
            arg = arg.substring(2);
            if (arg === plugin) {
                return false;
            }
            if (arg.startsWith(plugin)) {
                const parts = arg.substring(plugin.length + 1).split('=', 2);
                const key   = parts.shift().split('-').map(camel).join('');
                set(ret, key, parts[0] ? parse(parts[0], arg) : false);
                continue;
            }
        }
        copy.push(arg);
    }
    argv.splice(2, argv.length, ...copy);
    return ret;
};
/**
 * Merge the env and args into the options.
 * Either a command line or an env variable can override a turned off component.
 *
 * resolution order
 * ENV,
 * ARG,
 * Plugin Options,
 * Options
 *
 *
 * @param plugin
 * @param options
 * @param process
 */

             export const merge = (plugin, options, process) => {
    if (options === false) {
        return false;
    }
    const ret = mergeArgs(plugin, options, process);
    if (ret === false) {
        return false;
    }
    return mergeEnv(plugin, ret, process);
};
