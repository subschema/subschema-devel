import React from 'react';
import { byType, expect, into } from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import { ListenerProperty } from 'subschema-test-samples';
import { setupFunc } from '../support';

describe('subschema-test-samples/ListenerProperty', function () {
    this.timeout(50000);
    it('should render favorites', function () {
        const Subschema                        = newSubschemaContext();
        const { Form, importer, valueManager } = Subschema;

        const mod     = { exports: {} };
        const context = setupFunc(ListenerProperty, Subschema);

        const SelectListener = Subschema.loader.loadType('SelectListen');
        expect(mod.exports,'SelectListen').to.exist;

        const form = into(<Form {...context}/>, true);

        let select = byType(form, SelectListener);
        expect(select).to.exist;


        valueManager.update('favorites', ListenerProperty.data.favorites);

        select = byType(form, SelectListener);
        expect(select).to.exist;
        expect(select.props.options.length).to.eql(2);

    })
});
