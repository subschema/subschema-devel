import { mount } from 'subschema-test-support';
import { Form } from 'subschema';


describe('Form#nested validation', function () {


    it.only('should validate a nested modal', () => {

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
                            validators: ['required']
                        },
                        bad : {
                            type      : 'Text',
                            validators: ['required']
                        }
                    }
                }
            },
            fieldsets: [
                'open',
                {
                    template: 'ModalTemplates',
                    fields  : ['nested']
                }
            ]

        }}/>, true);

    });
})



