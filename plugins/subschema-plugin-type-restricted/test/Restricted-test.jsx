import React from 'react';
import { expect } from 'chai';
import { change, intoWithState } from 'subschema-test-support';
import { Restricted } from 'subschema-plugin-type-restricted';

describe('subschema-plugin-type-restricted', function () {
    this.timeout(50000);

    it('should create a restricted input', function () {
        const onChange      = (value) => {
            state.setState({ value })
        }, { state, child } = intoWithState(<Restricted formatter="###-##"
                                                        onChange={onChange}/>,
            {}, true);
        expect(child).have.length(1);

    });

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

            input = child.find('input');

            inputEl = input.getDOMNode();

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
