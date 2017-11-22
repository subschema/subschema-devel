import React from 'react';
import DefaultLoader from './DefaultLoader.js';
import importer from './importer';
import _newSubschemaContext from 'subschema-context';


export function newSubschemaContext(defaultLoaders = [DefaultLoader],
                                    defaultInjectionFactory,
                                    defaultValueManagerFactory) {
    const ctx    = _newSubschemaContext(defaultLoaders,
        defaultInjectionFactory, defaultValueManagerFactory);
    ctx.importer = importer(ctx, React);

    return ctx;
}

const def = newSubschemaContext();

export const Form         = def.Form;
export const ValueManager = def.ValueManager;
export const valueManager = def.valueManager;
export const importer = def.importer;

export default def;

