import React from 'react';
import { change, expect, findNode, into } from 'subschema-test-support';
import { Text } from 'subschema-plugin-type-text';

describe('types/Text', function () {
    it('should create a input with a value', function () {
        const text = into(<Text value="abc" onChange={(e) => e}/>);
        expect(text).to.have.length(1);
        const node = text.find('input');
        expect(node.prop('value')).to.eql('abc');

    });

    it('should trigger on change when changed', function () {
        const args = [], onChange = (e) => {
            args.push(e.target.value)
        };
        const text = into(<Text className="stuff" value="abc"
                                onChange={onChange}/>);
        const node = text.getDOMNode();
        expect(node.value).to.eql('abc');
        change(text, 'def');
        expect(args[0]).to.eql('def');
        expect(node.className).to.eql('stuff');
        expect(node.value).to.eql('abc');
        const attrs = toAttr(node);
        expect(Object.keys(attrs).length).to.eql(3);
        expect(attrs.class).to.eql('stuff');
        expect(attrs.type).to.eql('text');

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
