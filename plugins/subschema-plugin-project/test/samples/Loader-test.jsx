import React from 'react';
import { byTypes, expect, into } from 'subschema-test-support';
import { Loader } from 'subschema-test-samples'
import { newSubschemaContext } from 'subschema';
import { setupFunc } from '../support';


describe('subschema-project/samples/Loader', function () {

    this.timeout(50000);
    it('should load a custom type', () => {
        const Subschema        = newSubschemaContext();
        const { Form, loader } = Subschema;

        const context = setupFunc(Loader, Subschema);
        const form    = into(<Form {...context}/>, true);

        const CheckboxSelect = loader.loadType('CheckboxSelect');
        expect(CheckboxSelect, 'CheckboxSelect should be found').to.exist;

        byTypes(form);


    });
});
