import React, {Component} from "react";
import {injectorFactory} from '../lib/index';
import cachedInjector from '../lib/cachedInjector';
import PropTypes from 'subschema-prop-types'
import {expect} from 'chai';

describe("cachedInjector", function () {
    this.timeout(5000);
    let injector = cachedInjector(injectorFactory());
    class TestComponent extends Component {
        render() {
            return (<div>hello</div>);
        }
    }
    it('should return the same instance without args', function () {
        const C1 = injector.inject(TestComponent);
        const C2 = injector.inject(TestComponent);
        expect(C1).to.eql(C2);
        expect(C1).to.eql(TestComponent);
    });
    it('should return the same instance with empty args', function () {
        const C1 = injector.inject(TestComponent, {}, {});
        const C2 = injector.inject(TestComponent);
        expect(C1).to.eql(C2);
        expect(C1).to.eql(TestComponent);
    });
    it('should return different instances with different values', function () {
        const C1 = injector.inject(TestComponent, {}, {value: "stuff"});
        const C2 = injector.inject(TestComponent, {}, {});
        expect(C2).to.eql(TestComponent);
        expect(C1).to.not.eql(C2);
        const C3 = injector.inject(TestComponent, {}, {});
        const C4 = injector.inject(TestComponent, {}, {value: "stuff"});
        expect(C3).to.eql(TestComponent);
        expect(C3).to.not.eql(C4);
    });
    it('should return different instances with different propTypes', function () {
        const C1 = injector.inject(TestComponent, {value: PropTypes.value}, {});
        const C2 = injector.inject(TestComponent, {}, {});
        expect(C1).to.not.eql(C2);
        expect(C2).to.eql(TestComponent);

        const C3 = injector.inject(TestComponent, {}, {});
        const C4 = injector.inject(TestComponent, {value: PropTypes.value}, {});
        expect(C3).to.not.eql(C4);
        expect(C3).to.eql(TestComponent);
    });
    it('should return same instances with same propTypes', function () {
        const C1 = injector.inject(TestComponent, {value: PropTypes.value}, {});
        const C2 = injector.inject(TestComponent, {value: PropTypes.value}, {});
        expect(C1).to.eql(C2);
        expect(C1).to.not.eql(TestComponent);
        const C3 = injector.inject(TestComponent, {more: PropTypes.value}, {});
        const C4 = injector.inject(TestComponent, {more: PropTypes.value}, {});
        expect(C3).to.eql(C4);
        expect(C3).to.not.eql(TestComponent);
    });
});
