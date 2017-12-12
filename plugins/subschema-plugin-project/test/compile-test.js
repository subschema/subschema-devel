import { expect } from 'chai';
import { compile, source } from 'subschema-plugin-project';

import {samples} from './support';

describe('compile', function () {
    Object.keys(samples).forEach((key) => {
        it(`should compile form sample "${key}" `, () => {
            expect(compile(
                source({ sample: { sample: samples[key] } })).code).to.exist
        });
    });
});
