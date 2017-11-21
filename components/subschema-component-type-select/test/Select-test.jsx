import React from "react";
import {into, byTag, expect, select, byTags} from "subschema-test-support";
import {types} from "subschema-component-form";
import ValueManager from 'subschema-valuemanager';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';
const {Select} = types;

describe('types/Select', function () {
    this.timeout(50000);
    var values = [];
    var onChange = function (e) {
        values.push(e);
    };

    beforeEach(function () {
        values.length = 0;
    });

    it('should create a select', function () {
        var sel = into(<Select options={[{val: 1, label: 'One'}, {val: 2, label: 'Two'}]} path="test"
                               onChange={onChange}/>);
        expect(sel).to.exist;
        expect(values.length).to.eql(0);
        var options = byTags(sel, 'option');
        expect(options.length).to.eql(2, 'should have to options');
        expect(options[0].value).to.eql('1');
        expect(options[1].value).to.eql('2');
        select(sel, 1);
        expect(values.length).to.eql(1);
        expect(values[0]).to.eql('2');

    });

    it('should create a multi select', function () {
        var sel = into(<Select multiple={true} options={[{val: 1, label: 'One'}, {val: 2, label: 'Two'}]}
                               path="test" onChange={onChange}/>);

        expect(sel).to.exist;
        expect(values.length).to.eql(0);
        var options = byTags(sel, 'option');
        expect(options.length).to.eql(2, 'should have to options');
        expect(options[0].value).to.eql('1');
        expect(options[1].value).to.eql('2');
        select(sel, 1);
        expect(values.length).to.eql(1);
        expect(values[0][0]).to.eql('2');

        select(sel, 0);
        expect(values.length).to.eql(2);
        expect(values[0][0]).to.eql('2');
        expect(values[1][0]).to.eql('1');

    });

    it('should have the value selected with numbers', function () {
        const vm = ValueManager({select: 2});
        const {Form, ...context} = newSubschemaContext({valueManager: vm});
        const form = into(<Form {...context} schema={{schema: {select: {type: 'Select', options: [1, 2, 3]}}}}
                                valueManager={vm}/>, true);

        expect(form).to.exist;
        expect(values.length).to.eql(0);
        const sel = byTag(form, 'select');

        const options = byTags(form, 'option');

        expect(options.length).to.eql(3, 'should have to options');
        expect(options[0].value).to.eql('1');
        expect(options[1].value).to.eql('2');
        expect(options[2].value).to.eql('3');
        expect(sel.value).to.eql('2');

        vm.update('select', 3);
        expect(sel.value).to.eql('3');
    });


    it('should have the value selected with validators', function () {
        const vm = ValueManager({select: 2});
        const {
            Form,
            ...context
        } = newSubschemaContext({valueManager: vm});

        function noThree(v) {
            return v == 3 ? {message: 'No threes for you'} : null
        }

        const form = into(<Form
            {...context}
            validate={true}
            schema={{schema: {select: {type: 'Select', validators: [noThree], options: [1, 2, 3]}}}}
        />, true);

        expect(form).to.exist;
        expect(values.length).to.eql(0);
        const sel = byTag(form, 'select');

        const options = byTags(form, 'option');

        expect(options.length).to.eql(3, 'should have to options');
        expect(options[0].value).to.eql('1');
        expect(options[1].value).to.eql('2');
        expect(options[2].value).to.eql('3');
        expect(sel.value).to.eql('2');

        vm.update('select', 3);
        expect(sel.value).to.eql('3');
        expect(vm.errorsFor('select')[0].message).to.eql('No threes for you');
        vm.update('select', 2);
        expect(vm.errorsFor('select')).to.not.exist;
    });

});
