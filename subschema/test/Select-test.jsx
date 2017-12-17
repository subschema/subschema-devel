import React from 'react';
import { byTag, byTags, expect, into } from 'subschema-test-support';
import ValueManager from 'subschema-valuemanager';
import { newSubschemaContext } from 'subschema';

describe('subschema/Select', function () {
    let values   = [];
    let onChange = function (e) {
        values.push(e);
    };

    beforeEach(function () {
        values.length = 0;
    });

    it('should have the value selected with numbers', function () {
        const vm                   = ValueManager({ select: 2 });
        const { Form, ...context } = newSubschemaContext();
        context.valueManager = vm;
        const form                 = into(<Form {...context} schema={{
            schema: {
                select: {
                    type   : 'Select',
                    options: [1, 2, 3]
                }
            }
        }}
                                                valueManager={vm}/>, true);

        expect(values.length).to.eql(0);
        const sel = form.find('select');

        const options = form.find('option');

        expect(options).to.have.length(3, 'should have to options');
        expect(options.at(0).prop('value')).to.eql('1');
        expect(options.at(1).prop('value')).to.eql('2');
        expect(options.at(2).prop('value')).to.eql('3');
        expect(sel.prop('value')).to.eql(2);

        vm.update('select', 3);
        form.update();
        expect(form.find('select').prop('value')).to.eql(3);
    });


    it('should have the value selected with validators', function () {
        const vm = ValueManager({ select: 2 });
        const {
                  Form,
                  ...context
              }  = newSubschemaContext();

        function noThree(v) {
            return v == 3 ? { message: 'No threes for you' } : null
        }
        context.valueManager = vm;
        const form = into(<Form
            {...context}
            validate={true}
            schema={{
                schema: {
                    select: {
                        type      : 'Select',
                        validators: [noThree],
                        options   : [1, 2, 3]
                    }
                }
            }}
        />, true);

        expect(form).to.exist;
        expect(values.length).to.eql(0);
        const sel = byTag(form, 'select');

        const options = byTags(form, 'option');

        expect(options.length).to.eql(3, 'should have to options');
        expect(options.at(0).prop('value')).to.eql('1');
        expect(options.at(1).prop('value')).to.eql('2');
        expect(options.at(2).prop('value')).to.eql('3');
        expect(form.find('select').prop('value')).to.eql(2);

        vm.update('select', 3);
        form.update();
        expect(form.find('select').prop('value')).to.eql(3);
        expect(vm.errorsFor('select')[0].message).to.eql('No threes for you');
        vm.update('select', 2);
        expect(vm.errorsFor('select')).to.not.exist;
    });
});
