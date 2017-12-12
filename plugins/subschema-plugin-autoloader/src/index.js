import { camelCase } from 'subschema-utils';
import OptionsManager from 'mrbuilder-optionsmanager';

function writeImport(config, cmd) {
    if (config && config.loader === false) {
        return `// not importing ${cmd}`;
    }
    return `import ${camelCase(cmd)} from '${cmd}'`
}

function uc(value) {
    if (value) {
        value = value + '';
        return value[0].toUpperCase() + value.substring(1);
    }
    return value;
}

const stringify = (...args) => JSON.stringify(...args);

function writeLoader(config, cmd) {
    if (config) {
        if (config.loader === false) {
            return `// ${cmd} not loading`;
        }
        if (config.loader) {

            let l  = `loader.add${uc(config.loader)}`;
            let v1 = camelCase(cmd);
            if (config.name) {
                return `${l}(${stringify(config.name)},${v1})`;
            } else {
                return `${l}(${v1})`;
            }
        }
    }
    return `loader.addLoader(${camelCase(cmd)})`
}

function writeLoadType(plugins) {
    const map = {};
    plugins.forEach((value, key) => {
        if (value && value.config && value.config.loader) {
            map[value.config.loader] = true;
        }
    });
    return Object.keys(map).map(function (key) {
        return `loader.loaderType(${stringify(uc(key))})`
    }).join(';\n');
}

function map(m, each) {
    const result = [];
    m.forEach((value, key) => {
        result.push(each(value.config, key));
    });
    return result;
}

export default function ({ plugins }) {

    return {
        code     : `
import loaderFactory from 'subschema-loader';

//Automagically imported
${map(plugins, writeImport).join(';\n')} 

const loader = loaderFactory();
//Setup loader types;
${writeLoadType(plugins)}

//Automagically added to importer
${map(plugins, writeLoader).join(';\n')} 

//Your Welcome.
export default loader;
    `,
        plugins  : Array.from(plugins.keys()),
        cacheable: true
    }

};
