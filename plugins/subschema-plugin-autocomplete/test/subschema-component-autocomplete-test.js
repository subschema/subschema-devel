import React from 'react';
import {
    change, click, expect, into, intoWithState
} from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import 'subschema-styles-bootstrap';
import autocomplete, {
    Autocomplete, AutocompleteItemTemplate, styles
} from 'subschema-plugin-autocomplete';
import { Text } from 'subschema-plugin-type-text';
import { OptionsProcessor } from 'subschema-processors';

function noop() {

}

describe('subschema-plugin-autocomplete', function () {
    this.timeout(50000);
    const options = [
        { label: 'ABC', val: 'abc' },
        { label: 'DBC', val: 'dbc' },
        { label: 'JDK', val: 'jdk' }
    ];
    it('should render options and insert value even for zero', function () {
        const { Form, loader, ValueManager } = newSubschemaContext();
        loader.addLoader(autocomplete);
        const valueManager = ValueManager();
        const root         = into(<Form schema={{
            schema: {
                auto: {
                    type   : 'Autocomplete',
                    options: [
                        { label: 'ab', val: 0 },
                        { label: 'Hello', val: 1 }
                    ]
                }
            }
        }} loader={loader} valueManager={valueManager}/>, true);
        const input        = root.find('input');
        change(input, 'A', root);

        const found = root.find(AutocompleteItemTemplate);
        expect(found).to.have.length(1);

        click(found, root);

        expect(valueManager.path('auto')).to.eql(0)


    });

    it('should render an autocomplete and select suggested', function () {

        const { child, state } = intoWithState(<Autocomplete
            inputType={Text}
            itemTemplate={AutocompleteItemTemplate}
            options={options} processor={OptionsProcessor}
            onInputChange={noop} onChange={noop} onSelect={noop}/>, {});

        const input = state.find('input');
        expect(input, 'should show input').to.have.length(1);
        change(input, 'b', state);
        expect(state.find(AutocompleteItemTemplate)).to.have.length(2,
            'should suggest two');

        change(input, 'db', state);

        click(state.find(AutocompleteItemTemplate).at(0), state);
        expect(state.find('input').prop('value')).to.eql('DBC');
    });

    it('should render an autocomplete  with a value and autoSelectSingle set to true',
        function () {
            const { child, state } = intoWithState(<Autocomplete
                itemTemplate={AutocompleteItemTemplate}
                inputType={Text}
                value="abc"
                autoSelectSingle={true}
                options={options} processor={OptionsProcessor}
                onInputChange={noop} onChange={noop} onSelect={noop}/>, {});
            const input            = state.find('input');
            expect(input.prop('value')).to.eql('abc');
            change(input, 'j', state);
            expect(state.find('input').prop('value')).to.eql('JDK');
        });
});
