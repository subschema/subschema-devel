import loaderFactory from 'subschema-loader';
import { cachedInjector, injectorFactory } from 'subschema-injection';
import ValueManager from 'subschema-valuemanager';
import { warning } from 'subschema-utils';
import Form from 'subschema-form';
import { propTypeToName } from 'subschema-prop-types';
import PropTypes from 'prop-types';

const IGNORE_PROPS = [
    'path',
    'id',
    'className',
    'cssClass'
];
const IGNORE_TYPES = Object.keys(PropTypes).reduce((ret, v) => {
    ret.push(PropTypes[v]);
    ret.push(PropTypes[v].isRequired);
    return ret;
}, []);

const makeResolver = (loader) => {
    return (propType) => {

        if (propType == null || PropTypes[propType] || IGNORE_TYPES.includes(
                propType)) {
            return null;
        }
        let ret = loader.loadResolver(
            propType);
        if (ret) {
            return ret;
        }
        const toName = propTypeToName(propType);

        if (PropTypes[toName] || IGNORE_PROPS.includes(toName)) {
            return ret;
        }


        if (!toName || IGNORE_PROPS.includes(toName)) {
            return ret;
        }

        ret = loader.loadResolver(toName);
        warning(ret, 'PropType not found %s', toName);
        return ret;

    }
}

/**
 * Used to initialize new subschema for testing.  But also to override
 * behaviours if necessary.
 *
 */

export default function newSubschemaContext(defaultLoaders         = [],
                                            defaultInjectorFactory = (loader) => cachedInjector(
                                                injectorFactory(
                                                    makeResolver(loader))),
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
    rest.ValueManager = defaultValueManager;
    return rest;

}
