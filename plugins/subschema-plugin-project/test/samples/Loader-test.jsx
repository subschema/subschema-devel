import React from 'react';
import Loader from 'subschema-example-loader';
import { newSubschemaContext } from 'subschema';
import { into, setupFunc } from '../support';
import {expect} from 'chai';

describe('subschema-plugin-project/samples/Loader', function () {

    this.timeout(50000);
    it('should load a custom type', () => {
        const Subschema        = newSubschemaContext();
        const { Form, loader } = Subschema;

        const context = setupFunc(Loader, Subschema);
        const CheckboxSelect = loader.loadType('CheckboxSelect');
        const SimpleTemplate = loader.loadTemplate('SimpleTemplate');
        const Contact = loader.loadSchema('Contact');
        const Address = loader.loadSchema('Address');

        expect(SimpleTemplate).to.exist;
        expect(CheckboxSelect).to.exist;
        expect(Contact).to.exist;
        expect(Address).to.exist;


        const form    = into(<Form {...context}/>, true);

        expect(form.find(CheckboxSelect)).to.have.length(1);


    });
});
