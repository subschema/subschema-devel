import React from 'react';
import { expect, mount } from 'subschema-test-support';
import { Form } from 'subschema';


describe.only('Form#nested validation', function () {


    it('should validate a nested modal', () => {

        const root = mount(<Form schema={{
            schema   : {
                open: {
                    type: 'Checkbox',
                },

                nested: {
                    type     : 'Object',
                    subSchema: {
                        good: {
                            type      : 'Text',
                            validators: 'required'
                        },
                        bad : {
                            type      : 'Text',
                            validators: 'required'
                        }
                    }
                }
            },
            fieldsets: [
                'open',
                {
                    template   : 'ModalTemplate',
                    fields     : 'nested',
                    conditional: 'open'
                }
            ],

        }}/>, true);

        const btn = root.find('input[type="checkbox"]');
        btn.simulate('change', { target: { checked: true } });
        root.find('button.btn-primary').simulate('click');

        root.find('input[id="nested.good"]')
            .simulate('change', { target: { value: 'hello' } })
        root.find('input[id="nested.bad"]')
            .simulate('change', { target: { value: 'goodybye' } })
        root.find('button.btn-primary').simulate('click');

        expect(root.find('Form').prop('valueManager').getValue()).to.eql({
            "nested": {
                "good": "hello", "bad": "goodybye"
            }
        });

    });
});



