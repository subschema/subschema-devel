import PropTypes from 'subschema-prop-types';
import {resolveKey} from 'subschema-utils';

function handleErrorsListeners(value, key, props, {valueManager}) {
    return valueManager.addErrorListener(resolveKey(props.path, value), (err, old, path) => {
        const errors = this.state[key] || {};
        if (path === void(0)){
            console.warn('error void path');
            return;
        }
        if (err) {
            errors[path] = err;
        } else {
            delete errors[path];
        }
        if (this.mounted) {
            this.setState({[key]: (Object.keys(errors).length > 0) ? errors : null});
        } else {
            this.state[key] = (Object.keys(errors).length > 0) ? errors : null;
        }
    }, this, true).remove;
}

/**
 * Listens to errors on the path and returns them.  This is similar to resolvers/error except
 * that it provides the path and all errors.
 *
 * @param Clazz
 * @param key
 */
export default {
    resolver: {
        errors: function(Clazz, key) {
            Clazz.contextTypes.valueManager = PropTypes.valueManager;

            Clazz::this.listener(key, handleErrorsListeners);

        }
    }
};
