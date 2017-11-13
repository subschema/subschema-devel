require('babel-polyfill');
describe(
    `started '${process.env.SUBSCHEMA_TEST_MODULE}' with pattern '/${process.env.SUBSCHEMA_TEST_PATTERN}/'`,
    () => it('😀', () => {
    }));

(tc => tc.keys().forEach(key => {
    describe(key, function () {
        tc(key);
    });
}))(require.context("test", true, /-test\.jsx?$/));

describe(`finished '${process.env.SUBSCHEMA_TEST_MODULE}'`, function () {
    it('🙄', () => {
    });
});
