import { configure, mount as _mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe(
    `started '${SUBSCHEMA_TEST_MODULE}'`,
    () => it('😀', () => {
    }));

(tc => tc.keys().forEach(key => {
    describe(key, function () {
        tc(key);
    });
}))(require.context("test", true));

describe(`finished '${SUBSCHEMA_TEST_MODULE}'`, function () {
    it('🙄', () => {
    });
});
