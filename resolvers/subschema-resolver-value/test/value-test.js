import React, { Component } from 'react';
import { expect } from 'chai';
import PropTypes from 'subschema-prop-types';
import ValueManager from 'subschema-valuemanager';
import { byComponent, intoWithContext } from 'subschema-test-support';
import { injectorFactory } from 'subschema-injection';
import * as resolvers from 'subschema-resolver-value';

describe("resolvers/value", function () {
    this.timeout(50000);
    let injector;
    beforeEach(() => {
        injector = injectorFactory();

        injector.resolver(PropTypes.value, resolvers.value);
    });

    class ValueTestClass extends Component {
        static propTypes = {

            value: PropTypes.value
        };

        static defaultProps = {
            value: "."
        };

        render() {
            return <span>{this.props.value} {this.props.other}</span>
        }
    }


    it('should resolve value', function () {

        const Injected     = injector.inject(ValueTestClass);
        const valueManager = ValueManager({ 'test': 'abc', more: 'd' });
        const inst         = intoWithContext(<Injected value="test" other="more"
                                                       stuff="what"
                                                       options="a,b,c"
                                                       expr="{more} {test}"/>, {
            valueManager
        }, true);

        const vtc = byComponent(inst, ValueTestClass);
        expect(vtc.prop('value')).to.eql('abc');
        valueManager.update('test', 'huh');
        inst.update();
        expect(inst.find(ValueTestClass).prop('value')).to.eql('huh');
    });
});
