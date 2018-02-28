
function map(m, each) {
    const result = [];
    m.forEach((value, key) => {
        result.push(each(value.config, key));
    });
    return result;
}

const writeMap = (config, cmd) => {
    return `exporter['${cmd}'] = require('${cmd}')`;
};
module.exports = function ({ plugins }) {

    const code = `

const exporter = {
};
//Automagically added to exporter
${map(plugins, writeMap).join(';\n')} 
${writeMap(null, 'subschema-plugin-autoloader')}
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
    `;
    return {
        code,
        cacheable: true
    }

}
;
