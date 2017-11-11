import React from 'react';
import ReactDOM from 'react-dom';
import { templates, types } from 'subschema-component-form';
import {
    byTag, byType, change, expect, into, intoWithState, Simulate, TestUtils
} from 'subschema-test-support';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';

const { Restricted } = types;


describe('types/Restricted', function () {
    this.timeout(50000);

    it('should create a restricted input', function () {
        const onChange      = (value) => {
            state.setState({ value })
        }, { state, child } = intoWithState(<Restricted formatter="###-##"
                                                        onChange={onChange}/>,
            {}, true);
        expect(child).to.exist;

    });
    it('should work within a Form', function () {
        const { Form, valueManager } = newSubschemaContext();
        const schema                 = {
            schema: {
                'test': {
                    type     : 'Restricted',
                    formatter: '###-##'
                }
            }
        };
        const form                   = into(<Form valueManager={valueManager}
                                                  schema={schema}/>)
        const restricted             = byType(form, Restricted);
        const input                  = byTag(restricted, 'input');
        change(input, '1');
        expect(valueManager.path('test')).to.eql('1',
            'should update value manager');
        change(input, '123');
        expect(valueManager.path('test')).to.eql('123-',
            'should update value manager');
        change(input, '123-4');
        expect(valueManager.path('test')).to.eql('123-4',
            'should update value manager');
    })
    describe('mm20YY', function () {
        let onChange, input, inputEl, state, child;

        before(function () {
            onChange = function (value) {
                state.setState({ value })
            };
            ({ state, child } = intoWithState(<Restricted formatter="mm20YY"
                                                          onChange={onChange}/>,
                {}));


            expect(child).to.exist;

            input =
                TestUtils.scryRenderedDOMComponentsWithTag(child, 'input')[0];

            inputEl = ReactDOM.findDOMNode(input);

        });

        it('enters 2/16', function () {
            change(input, '2');
            expect(inputEl.value).to.eql('02/');

            change(input, '02/1');
            expect(inputEl.value).to.eql('02/201');

            change(input, '02/2016');
            expect(inputEl.value).to.eql('02/16');
        });

        it('enters 1/16', function () {
            change(input, '1');
            expect(inputEl.value).to.eql('1');

            change(input, '1/');
            expect(inputEl.value).to.eql('01/');
        });
        it('enters 1/1', function () {
            change(input, '1/1');
            expect(inputEl.value).to.eql('01/201');

            change(input, '01/16');
            expect(inputEl.value).to.eql('01/16');
        });

        it('enters 01/2016', function () {
            change(input, '0');
            expect(inputEl.value).to.eql('0');

            change(input, '01');
            expect(inputEl.value).to.eql('01/');

            change(input, '01/2');
            expect(inputEl.value).to.eql('01/2');

            change(input, '01/20');
            expect(inputEl.value).to.eql('01/20');

            change(input, '01/201');
            expect(inputEl.value).to.eql('01/201');

            change(input, '01/2016');
            expect(inputEl.value).to.eql('01/16');

        });
        it('enters 13', function () {

            change(input, '13');
            expect(inputEl.value).to.eql('01/203');

        });
        it('enters 133', function () {

            change(input, '133');
            expect(inputEl.value).to.eql('01/33');

        });
    });
});
