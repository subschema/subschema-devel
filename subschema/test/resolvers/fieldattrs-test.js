import React from "react";
import { expect, into } from "subschema-test-support";
import { newSubschemaContext } from 'subschema';

//TODO - Figure these out.
describe("subschema-resolver-fieldattrs", function () {
    it('should insert fieldAttrs', function () {
        const { Form, valueManager, loader } = newSubschemaContext();
        const schema                         = {
            test: {
                "type"      : "Text",
                "fieldAttrs": {
                    "data-stuff"   : 1,
                    "aria-required": true
                }
            }
        };
        const form                           = into(<Form schema={{
            schema
        }}/>);

        const input = form.find('input').getDOMNode();
        expect(input.dataset.stuff).to.eql('1');
        expect(input.attributes['aria-required'].value).to.eql('true');
    });
});
