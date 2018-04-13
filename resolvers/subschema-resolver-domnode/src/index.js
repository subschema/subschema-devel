import React from 'react';


//Expose for configurability
export const settings = {
    type    : 'span',
    document: typeof window === 'undefined' ? null : window.document
};

export function loadDomNode(val, key, props, { loader, injector }) {
    val = val || key;
    if (typeof val === 'string') {
        return settings.document.querySelector(val);
    }
    return val;
}

export default {
    resolver: {
        domNode: function (Clazz, key, propList, OrigClazz) {
            this.property.call(Clazz, key, loadDomNode);
        }
    }
};
