import React from 'react';
import DefaultLoader from './autoloader';
import _importer from './importer';
import _newSubschemaContext from 'subschema-context';

export function newSubschemaContext(defaultLoaders = [DefaultLoader],
                                    defaultInjectionFactory,
                                    defaultValueManagerFactory) {
    const ctx    = _newSubschemaContext(defaultLoaders,
        defaultInjectionFactory, defaultValueManagerFactory);

    ctx.importer = _importer({
        react                     : require('react'),
        'subschema'               : ctx,
        'react-dom'               : require('react-dom'),
        'subschema-context'       : require('subschema-context'),
        'subschema-css'           : require('subschema-css'),
        'subschema-dom'           : require('subschema-dom'),
        'subschema-expression'    : require('subschema-expression'),
        'subschema-field'         : require('subschema-field'),
        'subschema-fieldset'      : require('subschema-fieldset'),
        'subschema-form'          : require('subschema-form'),
        'subschema-injection'     : require('subschema-injection'),
        'subschema-loader'        : require('subschema-loader'),
        'subschema-prop-types'    : require('subschema-prop-types'),
        'subschema-rendercontent' : require('subschema-rendercontent'),
        'subschema-rendertemplate': require('subschema-rendertemplate'),
        'subschema-utils'         : require('subschema-utils'),
        'subschema-valuemanager'  : require('subschema-valuemanager')
    });

    return ctx;
}

const def = newSubschemaContext();

export const Form         = def.Form;
export const ValueManager = def.ValueManager;
export const valueManager = def.valueManager;
export const importer     = def.importer;
export const loader       = def.loader;

export default def;

