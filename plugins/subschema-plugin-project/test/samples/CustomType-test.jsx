import React from 'react';
import { byComponent, click, expect, into } from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import CustomType from 'subschema-example-customtype';
import { setupFunc } from '../support';

describe('subschema-plugin-project/samples/CustomType', function () {
    it('should render', function () {
        const schema    = CustomType.schema;
        //loader, schema, Subschema, React
        const Subschema = newSubschemaContext();
        const { Form, loader }  = Subschema;

        const context = setupFunc(CustomType, Subschema);

        const form = into(<Form  {...context}/>, true);

        const SwitchButton = context.loader.loadType('SwitchButton');
        expect(SwitchButton).to.exist;
        byComponent(form, SwitchButton);

    })
});
