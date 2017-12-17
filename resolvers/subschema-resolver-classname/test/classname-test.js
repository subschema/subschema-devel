import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';
import { byComponent, intoWithContext } from 'subschema-test-support';
import {expect} from 'chai';
import {className} from 'subschema-resolver-classname'
describe('resolvers/className', function () {
    this.timeout(50000);

    class TestContainer extends Component {
        static propTypes = {
            className:PropTypes.className
        };

        render() {
            return <div {...this.props}/>
        }
    }
    class TestContainerDefault extends Component {
        static propTypes    = {
            className:PropTypes.className
        };
        static defaultProps = {
            className: 'whatever Some.more found missing'
        };

        render() {
            return <div {...this.props}/>
        }
    }
    it('should load default className', function () {
        const {context}            = newSubschemaContext();
        const { loader, injector } = context;
        loader.addResolver(PropTypes.className, className);
        loader.addStyle({
            TestContainer: {
                container: 'abc'
            }
        });
        const Injected = injector.inject(TestContainer);
        const inst     = byComponent(
            intoWithContext(<Injected />, context, true), TestContainer);
        expect(inst.prop('className')).to.eql('abc');
    });
    it('should load default className with stuff', function () {
        const {context}            = newSubschemaContext();
        const { loader, injector } = context;
        loader.addResolver(PropTypes.className, className);
        loader.addStyle({
            Some                : {
                more: 'ghi'
            },
            Global              : {
                found: 'here'
            },
            TestContainerDefault: {
                whatever: 'the hell'
            }
        });
        const Injected = injector.inject(TestContainerDefault);
        const inst     = byComponent(
            intoWithContext(<Injected />, context, true),
            TestContainerDefault);
        expect(inst.prop('className')).to.eql('the hell ghi here missing');
    })
});
