import React from 'react';
import { change, expect, findNode, into } from 'subschema-test-support';
import { types } from 'subschema-component-form';

const { Text } = types;

describe('types/Text', function () {
    it('should create a input with a value', function () {
        const text = into(<Text value="abc" onChange={(e) => e}/>);
        expect(text).toExist();
        const node = findNode(text);
        expect(node.value).toBe('abc');

    });

    it('should trigger on change when changed', function () {
        const args = [], onChange = (e) => {
            args.push(e.target.value)
        };
        const text = into(<Text className="stuff" value="abc"
                                onChange={onChange}/>);
        expect(text).toExist();
        const node = findNode(text);
        expect(node.value).toBe('abc');
        change(node, 'def');
        expect(args[0]).toBe('def');
        expect(node.className).toBe('stuff');
        expect(node.value).toBe('abc');
        const attrs = toAttr(node);
        expect(Object.keys(attrs).length).toBe(3);
        expect(attrs.class).toBe('stuff');
        expect(attrs.type).toBe('text');

    });

    function toAttr(node) {
        const attributes = findNode(node).attributes;
        const obj        = {};

        for (let i = 0, len = attributes.length; i < len; i++) {
            obj[attributes[i].name] = attributes[i].value;
        }
        return obj;
    }
});
