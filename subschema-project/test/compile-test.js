import expect from 'expect';
import {compile, source} from 'subschema-project';

import fixtures from 'subschema-test-samples';

describe('compile', function () {
    Object.keys(fixtures).forEach((key) => {
        it(`should compile form sample "${key}" `, () => {
            const sample = fixtures[key];
            const src = source({sample: {sample}});
            const transpiled = compile(src);
            expect(transpiled.code).toExist();
        });
    });
});
