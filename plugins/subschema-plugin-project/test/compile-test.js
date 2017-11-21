import { expect } from 'chai';
import { compile, source } from 'subschema-project';

import fixtures from 'subschema-test-samples';

describe('compile', function () {
    Object.keys(fixtures).forEach((key) => {
        it(`should compile form sample "${key}" `, () => {
            expect(compile(
                source({ sample: { sample: fixtures[key] } })).code).to.exist
        });
    });
});
