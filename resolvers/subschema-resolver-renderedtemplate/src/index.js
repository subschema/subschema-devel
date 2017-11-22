import React from 'react';
import renderTemplate from 'subschema-rendertemplate';
/**
 * Renders a component into a node.
 *
 * @param Clazz
 * @param key
 */
export default {
    resolver: {
        renderedTemplate: function(Clazz, key) {
            Clazz::this.property(key, renderedTemplate$resolver);
        }
    }
};

function renderedTemplate$resolver(value) {
    if (value == null || value === false) {
        return null;
    }
    if (React.isValidElement(value)) {
        return value;
    }
    return renderTemplate(value);
}
