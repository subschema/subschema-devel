import loaderFactory from 'subschema-loader';
import { cachedInjector, injectorFactory } from 'subschema-injection';
import ValueManager from 'subschema-valuemanager';
import { warning } from 'subschema-utils';
import Form from 'subschema-form';

/**
 * Used to initialize new subschema for testing.  But also to override
 * behaviours if necessary.
 *
 */

export default function newSubschemaContext(defaultLoaders         = [],
                                            defaultInjectorFactory = (loader) => cachedInjector(
                                                injectorFactory(loader)),
                                            defaultValueManager    = ValueManager) {
    warning(defaultValueManager, `A default ValueManager is required`);

    const defaultLoader = loaderFactory(defaultLoaders);

    const rest = { Form };

    const formDefaultProps = rest.Form.defaultProps;

    //Form needs these to kick off the whole thing.  Its defaults can be
    // overriden with properties.
    rest.loader = formDefaultProps.loader = defaultLoader;
    rest.injector = formDefaultProps.injector = defaultInjectorFactory;
    rest.valueManager = formDefaultProps.valueManager = defaultValueManager();
    return rest;

}
