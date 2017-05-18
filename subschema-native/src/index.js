import React from 'react';

import _PropTypes from 'subschema-prop-types';
import _ValueManager from 'subschema-valuemanager';
import _processors from 'subschema-processors';
import _validators from 'subschema-validators';
import _tutils, {warning as _warning} from 'subschema-utils';
import _loaderFactory from 'subschema-loader';
import {stringInjector as _stringInjector, injectorFactory as _injectorFactory} from 'subschema-injection';
import {
    resolvers as _resolvers,
    Form as _Form,
    Field as _Field,
    FieldSet as _FieldSet,
    Conditional as _Conditional,
    RenderContent as _RenderContent,
    Object as _ObjectType,
    RenderTemplate as _RenderTemplate,
    newSubschemaContext as _newSubschemaContext
} from  "subschema-core";
import _templates from './templates';
import _types from './types';
import _styles, {compile} from './styles';
import NativePropTypes from './PropTypes';
import NativeResolvers from './resolvers';

export const compileStyle = compile;

/**
 * Allows for a new Subschema instance to be created. Mostly for testing,
 * but for other stuff, may be useful.
 *
 * @param defaultLoaders
 * @param defaultResolvers
 * @param defaultPropTypes
 */


const _DefaultLoader = _loaderFactory();
_DefaultLoader.addTypes(_types);
_DefaultLoader.addTemplates(_templates);
_DefaultLoader.addLoader(_processors);
_DefaultLoader.addLoader(_validators);
_DefaultLoader.addStyles(_styles);
_DefaultLoader.addResolvers(NativePropTypes, NativeResolvers);
_DefaultLoader.addTypes({ObjectType: _ObjectType, Object: _ObjectType});
export const stringInjector = _stringInjector;
export const injectorFactory = _injectorFactory;
export const RenderTemplate = _RenderTemplate;
export const RenderContent = _RenderContent;
export const loaderFactory = _loaderFactory;
export const Conditional = _Conditional;
export const Field = _Field;
export const FieldSet = _FieldSet;
export const Form = _Form;
export const PropTypes = _PropTypes;
export const ValueManager = _ValueManager;
export const tutils = _tutils;
export const validators = _validators;
export const warning = _warning;
export const templates = _templates;
export const types = _types;
export const processors = _processors;
export const DefaultLoader = _DefaultLoader;
export const resolvers = _resolvers;
resolvers.style = NativeResolvers.style;

export const _initSubchemaContext = newSubschemaContext();
export const loader = _initSubchemaContext.loader;
export const injector = _initSubchemaContext.injector;
export const Subschema = {
    stringInjector,
    injectorFactory,
    RenderTemplate,
    RenderContent,
    loaderFactory,
    Conditional,
    Field,
    FieldSet,
    Form,
    PropTypes,
    ValueManager,
    tutils,
    validators,
    warning,
    templates,
    types,
    processors,
    DefaultLoader,
    resolvers,
    loader,
    injector
};
export function newSubschemaContext(defaultLoaders = [DefaultLoader],
                                    defaultResolvers = _resolvers,
                                    defaultPropTypes = _PropTypes,
                                    defaultInjectionFactory,
                                    defaultValueManagerFactory = _ValueManager,
                                    defaultSubschema = Subschema) {
    const ctx = _newSubschemaContext(defaultLoaders, defaultResolvers, defaultPropTypes, defaultInjectionFactory, defaultValueManagerFactory, defaultSubschema);
    return ctx;
}


export default Subschema;