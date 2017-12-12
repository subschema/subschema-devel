import React from 'react';
import {into, expect, byComponents, byId}  from 'subschema-test-support';
import NestedForms from 'subschema-example-nestedforms';
import {newSubschemaContext, ValueManager} from 'subschema';

describe('subschema-test-samples/NestedForms', function () {
    let Form, loader, Subschema, FieldSetTemplate;
    beforeEach(function () {
        Subschema = newSubschemaContext();
        Form = Subschema.Form;
        loader = Subschema.loader;
        FieldSetTemplate = loader.loadTemplate('FieldSetTemplate');
    });

    it('should render simple nested with seperate templates', function () {
        const form = into(<Form
            schema={{
                schema: {
                    first: 'Text',
                    second: {
                        type: 'Object',
                        subSchema: {
                            test: 'Text'
                        }
                    }
                },
                fieldsets: [{legend: 'First Legend', fields: 'first'},

                    {legend: 'Second Legend', fields: 'second.test'}]
            }}
        />, true);
        expect(byComponents(form, FieldSetTemplate), 'should find three FieldSetTemplate').to.have.length(3);
    });
    it('should render simple nested', function () {
        const form = into(<Form
            schema={{
                schema: {
                    first: 'Text',
                    second: {
                        type: 'Object',
                        subSchema: {
                            test: 'Text'
                        }
                    }
                },
                fieldsets: [{fields: 'second.test, first', legend: 'All'}]
            }}
        />, true);
        expect(byComponents(form, FieldSetTemplate).length).to.eql(2)
    });
    it('should render nested forms', () => {
        const valueManager = Subschema.valueManager = ValueManager(NestedForms.data);

        const form = into(<Form schema={NestedForms.schema} valueManager={valueManager}/>, true);
        const street = form.find('[name="address.street"]');


/*        expect(street.prop('value')).to.eql('1 First St');

        valueManager.update('address.street', 'Something');
        expect(form.find('[name="address.street"]').prop('value')).to.eql('Something');*/

    });
});
