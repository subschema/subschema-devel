import React from "react";
import { expect, findNode, into } from "subschema-test-support";
import { types } from "subschema-component-form";

const { Date } = types;

describe('types/Date', function () {
    it('should create a input with a value', function () {
        const text = into(<Date value="01/02/2015" onChange={(e) => e}/>);
        const node = findNode(text);
        expect(node.value).to.eql('2015-01-02');

    });
});
