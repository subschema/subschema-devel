import { camelCase } from 'subschema-utils';


function map(m, each) {
    const result = [];
    m.forEach((value, key) => {
        result.push(each(value.config, key));
    });
    return result;
}

const writeMap = (config, cmd) => {
    if (cmd === "subschema-plugin-autoloader"){
        return;
    }
    cmd = JSON.stringify(cmd);
    return `exporter[${cmd}] = require(${cmd})`;
};

export default function ({ plugins }) {

    return {
        code     : `

const exporter = {
};
//Automagically added to exporter
${map(plugins, writeMap).join(';\n')} 

//Your Welcome.
module.exports = function (extended){
    extended = extended || {};
    return function import$wrap(key){
        if (key in extended){
            return extended[key];
        }
        if (key in exporter){
          return exporter[key];
        }
    }
};
    `,
        plugins  : Array.from(plugins.keys()),
        cacheable: true
    }

};
