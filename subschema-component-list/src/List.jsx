import React from 'react';
import {isString} from 'subschema-utils';
import CollectionMixin from './CollectionMixin';

export default class ListInput extends CollectionMixin {
    static inputClassName = CollectionMixin.inputClassName;


    createPid() {
        return this._length || 0;
    }
    createDefValue() {
        return [];
    }
    getTemplateItem(edit) {
        const type = edit ? this.props.editType || this.props.itemType : this.props.itemType;
        var value = isString(type) ? {
            type
        } : type || {};
        value.title = false;
        return {
            value,
            key: {title: false, template: false, type: 'Hidden'}
        };
    }
}
