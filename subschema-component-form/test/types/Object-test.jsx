import React from 'react';
import {into, intoWithContext, TestUtils, expect, findNode, Simulate} from 'subschema-test-support';
import ValueManager from 'subschema-valuemanager';
import {types} from 'subschema-component-form';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';
const ObjectType = types.Object
const TextInput = types.Text;

describe('types/Object', function () {

    const schema = {
        schema: {
            nested: {
                "type": "Object",
                "subSchema": {
                    "n1": {
                        validators: "required"
                    },
                    "n2": {
                        validators: "required"
                    },
                    n3: "Text"
                }
            },
            test: Object.freeze({
                fieldClass: 'stuff',
                validators: ["required"]
            })
        }
    };

    it('should not other objects', function () {
        const {Form, context, ...rest} = newSubschemaContext();
        const  form = into(<Form {...rest} schema={schema}/>, true);

        const  obj = TestUtils.scryRenderedComponentsWithType(form, ObjectType)[0];
        const  [n1, n2, n3] = TestUtils.scryRenderedComponentsWithType(obj, TextInput);
        const  test = TestUtils.findRenderedDOMComponentWithClass(form, 'stuff');


        Simulate.focus(findNode(n1));
        Simulate.blur(findNode(n1));
        Simulate.focus(findNode(n2));
    });
    it('should not validate nested objects', function () {
        const {Form, context} = newSubschemaContext();

        const  vm = ValueManager({}, {'nested.n2': [{message: 'borked'}]});
        const  form = into(<Form schema={schema} valueManager={vm}/>, true);

        const  obj = TestUtils.scryRenderedComponentsWithType(form, ObjectType)[0];
        const  [n1, n2, n3] = TestUtils.scryRenderedComponentsWithType(obj, TextInput);
        const  test = TestUtils.findRenderedDOMComponentWithClass(form, 'stuff');


        Simulate.focus(findNode(n1));
        Simulate.blur(findNode(n1));
        Simulate.focus(findNode(n2));
    });

});
