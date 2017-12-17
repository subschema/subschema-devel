import React from 'react';
import {
    byComponent, byComponents, findNode, into
} from 'subschema-test-support';
import { expect } from 'chai';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';
import { ButtonsTemplate } from 'subschema-plugin-template-buttons';
import { Button as ButtonTemplate } from 'subschema-plugin-template-button';


describe('templates/ButtonsTemplate', function () {
    it('should render buttons', function () {
        const { Form, context, ...rest } = newSubschemaContext();

        const form = into(<Form {...rest} schema={
            {
                schema   : {},
                fieldsets: [{
                    buttons: ['one', 'two', 'three']
                }]
            }
        }/>, true);
        expect(form.find('.btn')).to.have.length(3);
    });
    it('should render buttons with actions', function () {
        const { Form, context, ...rest } = newSubschemaContext();

        const form = into(<Form {...rest} schema={
            {
                schema   : {},
                fieldsets: [{
                    buttons: [{ label: 'one', primary: true }, 'two', 'three']
                }]
            }
        }/>, true);
        const btns = form.find('.btn');
        expect(btns).to.have.length(3);

        expect(btns.at(0).getDOMNode().classList.contains('btn-primary')).to.eql(true,
            'should have primary');
    })
});
