import React from 'react';
import { blur, focus, into } from 'subschema-test-support';
import ValueManager from 'subschema-valuemanager';
import { newSubschemaContext } from 'subschema';
import { ObjectType } from 'subschema-plugin-object';
import { Text } from 'subschema-plugin-type-text';

describe('subschema/Object', function () {

    const schema = {
        schema: {
            nested: {
                "type"     : "Object",
                "subSchema": {
                    "n1": {
                        validators: "required"
                    },
                    "n2": {
                        validators: "required"
                    },
                    n3  : "Text"
                }
            },
            test  : Object.freeze({
                fieldClass: 'stuff',
                validators: ["required"]
            })
        }
    };

    it('should not other objects', function () {
        const { Form, context, ...rest } = newSubschemaContext();
        const form                       = into(<Form {...rest}
                                                      schema={schema}/>, true);

        const obj = form.find(ObjectType).at(0);
        const n1  = obj.find(Text).at(1);
        const n2  = obj.find(Text).at(2);
        const n3  = obj.find(Text).at(3);

        const test = form.find('.stuff');


        focus(n1);
        form.update();
        blur(n1);
        form.update();
        focus(n2);
    });
    it('should not validate nested objects', function () {
        const { Form, context } = newSubschemaContext();

        const vm   = ValueManager({}, { 'nested.n2': [{ message: 'borked' }] });
        const form = into(<Form schema={schema} valueManager={vm}/>, true);

        const obj  = form.find(ObjectType).at(0);
        const n1   = obj.find(Text).at(1);
        const n2   = obj.find(Text).at(2);
        const n3   = obj.find(Text).at(3);
        const test = form.find('.stuff');


        focus(n1);
        blur(n1);
        focus(n2);
    });

});
