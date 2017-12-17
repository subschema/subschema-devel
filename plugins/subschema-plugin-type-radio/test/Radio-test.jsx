import React from "react";
import {intoWithState, findNode, byTags, expect} from "subschema-test-support";
import {renderToStaticMarkup} from "react-dom/server";
import Radio from 'subschema-component-form/types/Radio';
import RadioItemTemplate from 'subschema-component-form/templates/RadioItemTemplate';

describe('types/Radio', function () {


    it('should create a radios and test output', function () {

        const result = renderToStaticMarkup(<Radio
            itemTemplate={RadioItemTemplate}
            path="test"
            options={ [{val: 1, label: 'One'}, {val: 2, label: 'Two'}]}
        />);
        expect(result).to.eql(
            '<div><div class="radio "><label class="" for="test.0"><input type="radio" id="test.0" name="test" value="1"/><span>One</span></label></div><div class="radio "><label class="" for="test.1"><input type="radio" id="test.1" name="test" value="2"/><span>Two</span></label></div></div>'
        );
    });

    it('should create a radios and test output checked', function () {

        const result = renderToStaticMarkup(<Radio
            itemTemplate={RadioItemTemplate}
            path="test"
            value={1}
            options={ [{val: 1, label: 'One'}, {val: 2, label: 'Two'}]}
        />);
        expect(result).to.eql(
            '<div><div class="radio "><label class="" for="test.0"><input type="radio" id="test.0" name="test" checked="" value="1"/><span>One</span></label></div><div class="radio "><label class="" for="test.1"><input type="radio" id="test.1" name="test" value="2"/><span>Two</span></label></div></div>'
        );
    });

    it('should create a radios', function () {
        let state, child;

        function handleState(value) {
            state.setState({value});
        }

        ({state, child} = intoWithState(<Radio
            itemTemplate={RadioItemTemplate}
            onChange={handleState}
            name="stuff"
            options={ [{val: 1, label: 'One'}, {val: 2, label: 'Two'}]}
        />, {value: 2}, true));

        const inputs = child.find('input');
        expect(inputs.length).to.eql(2);

        const dm0 = inputs.at(0), dm1 = inputs.at(1);
        expect(dm0.prop('checked')).to.eql(false);
        expect(dm1.prop('checked')).to.eql(true);
        state.setState({value: 1});
        expect(dm0.prop('checked')).to.eql(true);
        expect(dm1.prop('checked')).to.eql(false);

    });

});
