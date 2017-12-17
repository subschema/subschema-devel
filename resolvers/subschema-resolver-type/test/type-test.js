import {expect} from 'chai';
import React, {Component} from 'react';
import PropTypes from 'subschema-prop-types';
import ValueManager from 'subschema-valuemanager';
import loaderFactory from 'subschema-loader';
import {intoWithContext, byComponent,findNode, change} from 'subschema-test-support';
import resolvers from 'subschema-core/lib/resolvers';
import {injectorFactory} from 'subschema-injection';

const injector = injectorFactory();

describe('resolvers/type', function () {

    class TestStuff extends Component {
        static propTypes = {
            value: PropTypes.value
        };
        static defaultProps = {
            value: "more"
        };

        render() {
            return <div>{this.props.value}</div>;
        }
    }
    const loader = loaderFactory();

    loader.addType({TestStuff});

    class TargetTest extends Component {
        static propTypes = {
            custom: PropTypes.type,
            path: PropTypes.path
        };
        static defaultProps = {
            custom: 'TestStuff'
        };

        render() {
            const TestStuff = this.props.custom;
            return <div><TestStuff/></div>
        }

    }

    injector.resolver(PropTypes.type, resolvers.type);
    injector.resolver(PropTypes.value, resolvers.value);

    it('should follow inject types', function () {
        const Injected = injector.inject(TargetTest);
        const valueManager = ValueManager({more: 'd'});
        const inst = intoWithContext(<Injected path="hello"/>, {
            valueManager,
            loader,
            injector
        }, true, PropTypes.contextTypes);

        const et = byComponent(inst, TargetTest);
        const stuff = byComponent(inst, TestStuff);
        const node = findNode(et);
        expect(et).to.exist;
        expect(stuff).to.exist;
        expect(stuff.props.value).to.eql('d');
        valueManager.update('more', 'stuff');
        expect(stuff.props.value).to.eql('stuff');
    });

    it('should inject configured types', function () {
        const Injected = injector.inject(TargetTest, {});
        const valueManager = ValueManager({'other': 'stuff', more: 'd'});
        const inst = intoWithContext(<Injected custom={{type:'TestStuff', path:'other'}}/>, {
            valueManager,
            loader,
            injector
        }, true, PropTypes.contextTypes);

        const et = byComponent(inst, TargetTest);
        const stuff = byComponent(inst, TestStuff);
        const node = findNode(et);
        expect(et).to.exist;
        expect(stuff).to.exist;
        expect(stuff.props.value).to.eql('d');
        valueManager.update('more', 'other');
        expect(stuff.props.value).to.eql('other');
    });

});
