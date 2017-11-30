const m          = require('../subschema-webpack.config');
const { expect } = require('chai')
describe('subschema-dev-fonts', function () {
    it('should add rules', function () {
        const webpack = {
            module: {
                rules: []
            }
        };
        m({}, webpack);
        expect(webpack.module.rules).to.have.length(4);
    });
});
