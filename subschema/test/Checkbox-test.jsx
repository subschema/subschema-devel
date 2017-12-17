import React from 'react';
import {
    check, expect, into, intoWithState, Simulate, TestUtils
} from 'subschema-test-support';
import { Checkbox } from 'subschema-plugin-type-checkbox';
import { EditorTemplate } from 'subschema-plugin-template-editor';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';


describe('subschema/Checkbox', function () {
    it('should create a form', function () {
        const { Form, valueManager } = newSubschemaContext();
        const root                   = into(<Form valueManager={valueManager}
                                                  schema={{
                                                      schema: {
                                                          c1: 'Checkbox',
                                                          c2: {
                                                              type: 'Checkbox'
                                                          }
                                                      }
                                                  }}/>);

        const ret = root.instance().getValue();
        expect(ret.c1, 'c1 should not exist').to.not.exist;
        expect(ret.c2, 'c2 should not exist').to.not.exist;
        valueManager.update('c1', true);
        expect(root.instance().getValue().c1).to
                                             .eql(true, 'should update value');

    });

    it('should trigger on and off if the value matches', function () {
        const onChange         = (value = false) => {
            state.setState({ value });
        };
        const { child, state } = intoWithState(<Checkbox
            value="nolo" onChange={onChange}/>, { value: 'nolo' }, true);

        let checkbox = child.find('input');
        expect(checkbox.prop('checked')).to.eql(true);
        check(checkbox, true);
        expect(state.instance().state.value).to
                                            .eql('nolo', 'state should update');
        checkbox = child.find('input');

        check(checkbox, false);
        expect(state.instance().state.value).to
                                            .eql(null, 'state should update');


    });
    it('should validate on change', function () {
        const { Form, valueManager } = newSubschemaContext();
        const root                   = into(<Form valueManager={valueManager}
                                                  schema={{
                                                      schema: {
                                                          checkbox: {
                                                              type      : 'Checkbox',
                                                              validators: ['required']
                                                          }
                                                      }
                                                  }}/>, true);
        expect(root.find(EditorTemplate).find('p').text()).to.eql('');
        valueManager.validate();
        root.update();
        expect(root.find(EditorTemplate).find('p').text()).to.eql('Required');
        check(root.find(Checkbox), true);
        expect(root.find(EditorTemplate).find('p')).to.have.length(1);

    });
});
