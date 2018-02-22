import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import { byComponent, intoWithContext } from 'subschema-test-support';
import {expect} from 'chai';
import {className} from 'subschema-resolver-classname'
import {injectorFactory} from 'subschema-injection';
import loaderFactory from 'subschema-loader';

describe('subschema-resolver-classname', function () {
    this.timeout(50000);
    let injector, loader;
    beforeEach(()=>{
        loader = loaderFactory();
        injector = injectorFactory(loader);
        loader.addType({TestContainer, TestContainerDefault});
        loader.addResolver(PropTypes.className, className);

    });

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
        loader.addStyle({
            TestContainer: {
                container: 'abc'
            }
        });
        const Injected = injector.inject(TestContainer);
        const inst     = byComponent(
            intoWithContext(<Injected />, {loader,injector}, true), TestContainer);
        expect(inst.prop('className')).to.eql('abc');
    });
    it('should load default className with stuff', function () {
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
            intoWithContext(<Injected />, {loader,injector}, true),
            TestContainerDefault);
        expect(inst.prop('className')).to.eql('the hell ghi here missing');
    })
});
