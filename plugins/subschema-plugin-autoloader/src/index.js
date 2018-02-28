const { camelCase } = require('subschema-utils');

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


function writeLoader(config, cmd) {
    if (config) {
        if (config.loader === false) {
            return `// ${cmd} not loading`;
        }
        if (config.loader) {

            let l  = `loader.add${uc(config.loader)}`;
            let v1 = camelCase(cmd);
            if (config.name) {
                return `${l}('${config.name}',${v1})`;
            } else {
                return `${l}(${v1})`;
            }
        }
    }
    return `loader.addLoader(${camelCase(cmd)})`
}

const has  = Function.call.bind(Object.prototype.hasOwnProperty);
const keys = (obj) => {
    const ret = []
    if (!obj) {
        return ret;
    }
    for (let k in obj) {
        if (has(obj, k)) {
            ret.push(k);
        }
    }
    return ret;
};

function writeLoadType(plugins) {
    const map = {};
    plugins.forEach((value, key) => {
        if (value && value.config && value.config.loader) {
            map[value.config.loader] = true;
        }
    });
    return keys(map).map(function (key) {
        return `loader.loaderType('${uc(key)}')`
    }).join(';\n');
}

function map(m, each) {
    const result = [];
    m.forEach((value, key) => {
        result.push(each(value.config, key));
    });
    return result;
}

module.exports =
    function ({ plugins }) {

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
            cacheable: true
        }

    };
