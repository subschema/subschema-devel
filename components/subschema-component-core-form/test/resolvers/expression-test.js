"use strict";
import React, {Component} from 'react';
import {expect} from 'chai';
import ValueManager from 'subschema-valuemanager';
import PropTypes from 'subschema-prop-types';
import resolvers from 'subschema-core/lib/resolvers';
import {intoWithContext, byComponent} from 'subschema-test-support';
import injector from 'subschema-injection';

describe('resolvers/expression', function () {

    class ExpressionTest extends Component {
        static propTypes = {
            expr1: PropTypes.expression,
            expr: PropTypes.expression,
            value: PropTypes.value
        };

        render() {
            return <span>{this.props.expr} {this.props.expr1}</span>
        }
    }

    injector.resolver(PropTypes.expression, resolvers.expression);
    it('should evaluate expression', function () {
        const Injected = injector.inject(ExpressionTest, {path: PropTypes.path});
        const valueManager = ValueManager({'other': 'stuff', hello: {more: '', test: ''}});
        const inst = intoWithContext(<Injected path="hello"
                                               expr="hi {other}"
                                               expr1="{.more} {.test}."/>, {
            valueManager

        }, true);

        const et = byComponent(inst, ExpressionTest);

        expect(et).to.exist;
        expect(et.props.expr).to.eql('hi stuff');
        expect(et.props.expr1).to.eql(' .');
        valueManager.update('hello.more', 'I am');
        expect(et.props.expr1).to.eql('I am .');

        valueManager.update('hello.test', 'cool');
        expect(et.props.expr1).to.eql('I am cool.');
        expect(et.props.expr).to.eql('hi stuff');
        valueManager.update('other', 'huh');
        expect(et.props.expr).to.eql('hi huh');
        expect(et.props.expr1).to.eql('I am cool.');
    });

});
