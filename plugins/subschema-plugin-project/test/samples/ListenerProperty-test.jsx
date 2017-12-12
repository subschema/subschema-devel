import React from 'react';
import { expect } from 'chai';
import { into, setupFunc } from '../support';
import { newSubschemaContext } from 'subschema';
import ListenerProperty from 'subschema-example-listenerproperty';

describe('subschema-plugin-project/samples/ListenerProperty', function () {
    this.timeout(50000);
    it('should render favorites', function () {
        const Subschema                        = newSubschemaContext();
        const { Form, importer, valueManager } = Subschema;

        const context = setupFunc(ListenerProperty, Subschema);
        const SelectListener = context.loader.loadType('SelectListen');

        expect(SelectListener).to.exist;

        const form = into(<Form {...context}/>, true);

        let select = form.find(SelectListener);
        expect(select).to.exist;


        context.valueManager.update('favorites', ListenerProperty.data.favorites);
        form.update();
        select = form.find(SelectListener);
        expect(select).to.have.length(1);
        expect(select.prop('options')).to.have.length(2);

    })
});
