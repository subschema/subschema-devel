import _ValueManager from 'subschema-valuemanager';
import __Form from 'subschema-form';
import DefaultLoader from 'subschema-plugin-autoloader';
import _newSubchemaContext from 'subschema-context';

/**
 * defaultLoaders         = [],
 defaultInjectorFactory = (loader) => cachedInjector(
 injectorFactory(
 makeResolver(loader))),
 defaultValueManager    = ValueManager
 * @param opts
 * @returns {{Form, valueManager, ValueManager, loader, context: {valueManager,
 *     loader, injector}}}
 */
const newSubschemaContext = ({ defaultLoaders = [DefaultLoader], injectorFactory, valueManager }) => {
    const ctx = _newSubchemaContext(defaultLoaders, injectorFactory);
    let {
              valueManager:_valueManager,
              ValueManager = _ValueManager,
              loader       = DefaultLoader,
              injectorFactory: _injectorFactory,
              Form         = __Form,
          }   = ctx;
    valueManager = valueManager || _valueManager;
    if (!valueManager) {
        valueManager = ValueManager();
    }
    Form.defaultProps.valueManager = valueManager;

    return {
        Form,
        valueManager,
        ValueManager,
        loader,
        context: {
            valueManager,
            loader,
            injector: Form.defaultProps.injector(loader)
        }
    }
};

export default newSubschemaContext;
