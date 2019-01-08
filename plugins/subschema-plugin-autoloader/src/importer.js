function map(m, each) {
    const result = [];
    m.forEach((value, key) => {
        if (value) {
            result.push(each(value.config, key));
        }
    });
    return result;
}

const writeMap = (config, cmd) => {
    return `exporter['${cmd}'] = require('${cmd}')`;
};
module.exports = function ({plugins}) {

    const code = `

const exporter = {
};
//Automagically added to exporter
${map(plugins, writeMap).join(';\n')} 
${writeMap(null, 'subschema-plugin-autoloader')}
//Your Welcome.
function toModule(obj){
    if (obj && obj.default != null && !obj.__esModule){
        Object.defineProperty(obj, '__esModule', {
                  value: true,
                  writable: false,
                  enumerable: false
                });
    }
    return obj;
};

module.exports = function (extended){
    extended = extended || {};
    
    return function import$wrap(key){
        if (key in extended){
            //weird its a module but not a module, make it a module.
            
            return toModule(extended[key]);
        }
        if (key in exporter){
          return toModule(exporter[key]);
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
