import React            from "react";
import {generate}       from "subschema-plugin-project";
import {expect}         from 'chai';
import {testEachSample} from "./support";

describe('subschema-plugin-project', function () {
    this.timeout(50000);
    describe('generate', () => {
        testEachSample((ds, sample) => {

            it(`should render "${sample}"`, async () => {
                const blob = await generate(ds, 'page', 'string');
                expect(blob).to.exist;
            });

        });
    });
});
