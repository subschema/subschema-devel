import { expect } from 'chai';
import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import ValueManager from 'subschema-valuemanager';
import { intoWithContext } from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';

describe('subschema-resolver-type', function () {
    let injector, loader, valueManager;

    class TestStuff extends Component {
        static propTypes    = {
            value: PropTypes.value
        };
        static defaultProps = {
            value: "more"
        };

        render() {
            return <div>{this.props.value}</div>;
        }
    }


    class TargetTest extends Component {
        static propTypes    = {
            custom: PropTypes.type,
            path  : PropTypes.path
        };
        static defaultProps = {
            custom: 'TestStuff'
        };

        render() {
            const TestStuff = this.props.custom;
            return <div><TestStuff/></div>
        }

    }

    beforeEach(() => {
        const ctx = newSubschemaContext();
        injector  = ctx.injector;
        loader    = ctx.loader;
        loader.addType({ TestStuff, TargetTest });
    });
    it('should follow inject types', function () {
        const Injected     = injector.inject(TargetTest);
        const valueManager = ValueManager({ more: 'd' });
        const inst         = intoWithContext(<Injected path="hello"/>, {
            valueManager,
            loader,
            injector
        }, true);

        expect(inst.find(TestStuff).prop('value')).to.eql('d');
        valueManager.update('more', 'stuff');
        inst.update();
        expect(inst.find(TestStuff).prop('value')).to.eql('stuff');
    });

    it('should inject configured types', function () {
        const Injected     = injector.inject(TargetTest, {});
        const valueManager = ValueManager({ 'other': 'stuff', more: 'd' });
        const inst         = intoWithContext(<Injected
            custom={{ type: 'TestStuff', path: 'other' }}/>, {
            valueManager,
            loader,
            injector
        }, true, PropTypes.contextTypes);

        expect(inst.find(TestStuff).prop('value')).to.eql('d');
        valueManager.update('more', 'other');
        inst.update();
        expect(inst.find(TestStuff).prop('value')).to.eql('other');
    });

});
