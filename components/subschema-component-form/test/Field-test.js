import React, {Component} from 'react';
import {expect} from 'chai';
import PropTypes from 'subschema-prop-types';
import Field from 'subschema-core/lib/Field';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';
import {templates, types} from 'subschema-component-form';
const {EditorTemplate} = templates;
const {Text} = types;
import {into, change, blur, intoWithContext, byTag, byComponent, findNode} from 'subschema-test-support';

describe('subschema-core/Field', function () {
    this.timeout(50000);

    const validators = ['required', function (val) {
        if (val && val.length < 3) {
            return {message: `${val.length} is less than 3`}
        }
    }];

    it('should render errors and friends', function () {
        const {context} = newSubschemaContext();

        const WField = context.injector.inject(Field);
        const field = {
            help: 'Hello',
            validators,
            type: 'Text',
            template: 'EditorTemplate'
        };
        const finst = intoWithContext(<WField path="name"
                                              field={field}/>, context, true, PropTypes.contextTypes);
        expect(finst).to.exist;
        const type = byComponent(finst, Text);
        const templ = byComponent(finst, EditorTemplate);
        const input = byTag(finst, 'input');
        expect(type).to.exist;
        expect(templ).to.exist;
        expect(input).to.exist;
        expect(templ.props.help.content).to.eql('Hello');
        expect(templ.props.title).to.eql('Name');
        expect(input.getAttribute('type')).to.eql('text');
        change(input, 'a');
        expect(templ.props.help.content).to.eql('Hello');
        change(input, 'aa');
        expect(templ.props.help.content).to.eql('Hello');
        blur(input);
        expect(templ.props.error).to.eql('2 is less than 3');
        change(input, 'aaa');
        expect(templ.props.error).to.not.exist;
        expect(templ.props.help.content).to.eql('Hello');

    });
    it('should not render template only field', function () {
        const {context} = newSubschemaContext();
        const {valueManager, injector, loader} = context ;

        loader.addType('TestText', class extends Component {

            static template = false;

            render() {
                return <input {...this.props}/>
            }
        });
        loader.addTemplate('EditorTemplate', EditorTemplate);

        const WField = injector.inject(Field);
        const field = {
            help: 'Hello',
            type: 'TestText'
        };
        const finst = intoWithContext(<WField path="name"
                                              field={field}/>, context, true, PropTypes.contextTypes);
        expect(finst).to.exist;
        const input = byTag(finst, 'input');
        expect(input).to.exist;

    });

    it('should render errors and friends with type custom typeTemplate', function () {
        const {context} = newSubschemaContext();
        const {valueManager, injector, loader} = context ;
        class JoeText extends Component {
            static template = {
                template: 'JoeTemplate'
            };

            render() {
                return <input {...this.props}/>
            }
        }
        class JoeTemplate extends Component {
            static propTypes = {
                error: PropTypes.error,
                title: PropTypes.title,
                name: PropTypes.string,
                help: PropTypes.node
            };

            render() {
                var {name, title, help, error, errorClassName, message, fieldClass, children} = this.props;

                return (<div>
                    {title}
                    {children}
                    {error || help }
                </div>);
            }
        }
        loader.addType('JoeText', JoeText);
        loader.addTemplate('JoeTemplate', JoeTemplate);
        const WField = injector.inject(Field);
        const field = {
            help: 'Hello',
            type: 'JoeText',
            validators: validators
        };
        const finst = intoWithContext(<WField path="name" field={field}/>, {
            valueManager,
            loader,
            injector
        }, true, PropTypes.contextTypes);
        expect(finst).to.exist;
        const type = byComponent(finst, JoeText);
        const templ = byComponent(finst, JoeTemplate);
        const input = byTag(finst, 'input');
        expect(type).to.exist;
        expect(templ).to.exist;
        expect(input).to.exist;
        expect(templ.props.help).to.eql('Hello');
        expect(templ.props.title).to.eql('Name');
        change(input, 'a');
        expect(templ.props.help).to.eql('Hello');
        change(input, 'aa');
        expect(templ.props.help).to.eql('Hello');
        blur(input);
        expect(templ.props.error).to.eql('2 is less than 3');
        change(input, 'aaa');
        expect(templ.props.error).to.not.exist;
        expect(templ.props.help).to.eql('Hello');

    });
});
