import React, {Component} from 'react';
import {expect} from 'chai';
import ValueManager from 'subschema-valuemanager';
import PropTypes from 'subschema-prop-types';
import {intoWithContext, byComponent} from 'subschema-test-support';
import injector from 'subschema-injection';
import {expression} from 'subschema-resolver-expression'
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

    injector.resolver(PropTypes.expression, expression);
    it('should evaluate expression', function () {
        const Injected = injector.inject(ExpressionTest, {path: PropTypes.path});
        const valueManager = ValueManager({'other': 'stuff', hello: {more: '', test: ''}});
        const inst = intoWithContext(<Injected path="hello"
                                               expr="hi {other}"
                                               expr1="{.more} {.test}."/>, {
            valueManager

        }, true);

        let et = inst.find(ExpressionTest);

        expect(et.prop('expr')).to.eql('hi stuff');
        expect(et.prop('expr1')).to.eql(' .');
        valueManager.update('hello.more', 'I am');
        inst.update();
        et = inst.find(ExpressionTest);
        expect(et.prop('expr1')).to.eql('I am .');

        valueManager.update('hello.test', 'cool');
        inst.update();
        et = inst.find(ExpressionTest);
        expect(et.prop('expr1')).to.eql('I am cool.');
        expect(et.prop('expr')).to.eql('hi stuff');

        valueManager.update('other', 'huh');
        inst.update();
        et = inst.find(ExpressionTest);
        expect(et.prop('expr')).to.eql('hi huh');
        expect(et.prop('expr1')).to.eql('I am cool.');
    });

});
