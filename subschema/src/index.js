import React from 'react';
import DefaultLoader from './DefaultLoader.js';
import importer from './importer';
import _newSubschemaContext from 'subschema-context';


export function newSubschemaContext(defaultLoaders = [DefaultLoader],
                                    defaultInjectionFactory,
                                    defaultValueManagerFactory) {
    const ctx        = _newSubschemaContext(defaultLoaders,
        defaultInjectionFactory, defaultValueManagerFactory);
    ctx.ValueManager = defaultValueManagerFactory;
    ctx.importer     = importer(ctx, React);

    return ctx;
}

export default newSubschemaContext();

