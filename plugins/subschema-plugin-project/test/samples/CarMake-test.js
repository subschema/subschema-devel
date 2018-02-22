import React from 'react';
import { byTypes, expect, into, select } from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import  CarMake from 'subschema-example-carmake';
import { setupFunc } from '../support';

describe('subschema-plugin-project/samples/CarMake', function () {
    it('should not be selectable', function () {
        const Subschema        = newSubschemaContext();
        const { Form, loader } = Subschema;
        const Select           = loader.loadType('Select');
        const schema             = CarMake.schema;
        //loader, schema, Subschema, React

        expect(CarMake, 'CarMake-setup should load').to.exist;
        const context = setupFunc(CarMake, Subschema);

        const form = into(<Form {...context} />, true);

        let selects = byTypes(form, Select);
        expect(selects).to.have.length(2);
        select(selects.at(0), 1);
        form.update();
        expect(context.valueManager.path('make')).to.eql('amc');
        selects = byTypes(form, Select);
        expect(selects.at(1).prop('placeholder')).to.eql('Select a model of AMC');
        select(selects.at(1), 2);
        form.update();
        expect(context.valueManager.path('model')).to.eql('Concord');

    })
});
