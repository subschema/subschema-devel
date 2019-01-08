import { availablePlugins, transform } from 'Babel';
import form from './form';
import reactClassDisplayName from 'mrbuilder-plugin-babel/react-class-display-name';
import transformClassProps from 'babel-plugin-transform-class-properties';
import babelrc from 'val-loader!./babelrc.js';


if (!availablePlugins['./react-class-display-name']) {
    availablePlugins['./react-class-display-name'] = reactClassDisplayName;
}
if (!availablePlugins['transform-class-properties']){
    availablePlugins['transform-class-properties'] = transformClassProps;
}
export function stringify(obj) {

    return !obj ? 'null' : JSON.stringify(obj, null, 2)

}


export function normalize(options) {
    const { setupTxt = '', imports = {}, data, props, errors, schema } = options.sample;

    var importString = '';
    var restOfCode   = setupTxt.split("\n").map(function (v) {
        return v.replace(/^\s*import\s+?(.+?);?\s*$/, function (all, imp) {
            importString += `import ${imp};\n`;
            return '';

        });
    }).join("\n");
    Object.keys(imports).reduce(function (str, key) {
        const imp = (imports[key] == true) ? key : `{${imports[key].join(
            ', ')}}`;

        return `${importString};\nimport ${imp} from '${key}';\n`
    }, importString);
    return `
import React from 'react';    
import {render} from 'react-dom';
import {Form} from 'subschema';
${importString}\n
    
const schema = ${stringify(schema)};
    
${options.useData ? `let value = ${stringify(data)};` : ''}
${options.useErrors ? `let errors = ${stringify(errors)};` : ''}

${restOfCode}

\n`;
}

export function source(managed, template = form) {
    const codeText = managed.codeText || normalize(managed);
    const formText = template ? template(managed) : '';
    return `${codeText}\n${formText}`;

}

export function compile(src) {
    return transform(src, babelrc);
}
