const { camelCase } = require('subschema-utils').default;

function writeImport(cmd) {
    return `import ${camelCase(cmd)} from '${cmd}'`
}

function writeLoader(cmd) {
    return `loader.addLoader(${camelCase(cmd)})`
}

const EXCLUDES = ['subschema', 'subschema-prop-types'];
module.exports = function (dependencies = []) {
    if (dependencies.dependencies) {
        dependencies = dependencies.dependencies;
    }
    dependencies = dependencies.filter(v => !EXCLUDES.includes(v));
    return {
        code     : `
import loaderFactory from 'subschema-loader';

//Automagically imported
${dependencies.map(writeImport).join(';\n')} 

const loader = loaderFactory();
//Automagically added to importer
${dependencies.map(writeLoader).join(';\n')} 

//Your Welcome.
export default loader;
    `,
        dependencies,
        cacheable: true
    }

};
