import React from 'react';
import DefaultLoader from './DefaultLoader.js';
import importer from './importer';
import ValueManager from 'subschema-valuemanager';
import { newSubschemaContext as _newSubschemaContext } from 'subschema-core';

export function newSubschemaContext(defaultLoaders             = [DefaultLoader],
                                    defaultResolvers,
                                    defaultPropTypes,
                                    defaultInjectionFactory,
                                    defaultValueManagerFactory = ValueManager,
                                    defaultSubschema) {
    const ctx        = _newSubschemaContext(defaultLoaders, defaultResolvers,
        defaultPropTypes, defaultInjectionFactory, defaultValueManagerFactory,
        defaultSubschema);
    ctx.ValueManager = defaultValueManagerFactory;
    ctx.importer     = importer(ctx, React);

    return ctx;
}

export default newSubschemaContext();

