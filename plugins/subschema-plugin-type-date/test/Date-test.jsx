import React from "react";
import { expect, into } from "subschema-test-support";
import {DateInput} from 'subschema-plugin-type-date';

describe('subschema-plugin-type-date', function () {
    it('should create a input with a value', function () {
        const date = into(<DateInput value="01/02/2015" onChange={(e) => e}/>);

        expect(date.find('input').prop('value')).to.eql('2015-01-02');

    });
});
