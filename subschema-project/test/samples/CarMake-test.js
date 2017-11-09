import React from 'react';
import { byTypes, expect, into, select } from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import { CarMake } from 'subschema-test-samples';
import { setupFunc } from '../support';

describe('subschema-test-samples/CarMake', function () {
    it('should not be selectable', function () {
        const Subschema        = newSubschemaContext();
        const { Form, loader } = Subschema;
        const Select           = loader.loadType('Select');
        var schema             = CarMake.schema;
        //loader, schema, Subschema, React

        expect(CarMake, 'CarMake-setup should load').to.exist;
        const context = setupFunc(CarMake, Subschema);

        const form = into(<Form {...context} />, true);

        let selects = byTypes(form, Select);
        expect(selects.length).to.eql(2, 'should have 2 selects');
        select(selects[0], 1);
        expect(context.valueManager.path('make')).to.eql('amc');
        selects = byTypes(form, Select);
        expect(selects[1].props.placeholder).to.eql('Select a model of AMC');
        select(selects[1], 2);
        expect(context.valueManager.path('model')).to.eql('Concord');

    })
});
