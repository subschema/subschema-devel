import PropTypes from "subschema-prop-types";
import {warning} from "subschema-utils";
const handleLoader = (value, key, props, {loader}) => {
    if (typeof loader[key] === 'function') {
        return loader[key](value);
    }
    const cased = `load${key[0].toUpperCase()}${key.substring(1)}`;
    if (typeof loader[cased] === 'function') {
        return loader[cased](value);
    }
    if (typeof loader[`${cased}s`] === 'function') {
        return loader[`${cased}s`](value);
    }
    warning(false, `Do not know what kind of loader this is %s`, key);

};

export default function loader(Clazz, key) {
    Clazz.contextTypes.loader = PropTypes.loader;

    Clazz::this.property(key, handleLoader);
}