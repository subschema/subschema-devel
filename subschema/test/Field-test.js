import React, { Component } from 'react';
import { expect } from 'chai';
import PropTypes from 'subschema-prop-types';
import Field from 'subschema-field';
import { newSubschemaContext } from 'subschema';
import { EditorTemplate } from 'subschema-plugin-template-editor';
import {
    blur, byComponent, byTag, change, intoWithContext
} from 'subschema-test-support';


describe('subschema-core/Field', function () {
    this.timeout(50000);

    const validators = ['required', function (val) {
        if (val && val.length < 3) {
            return { message: `${val.length} is less than 3` }
        }
    }];

    it('should render errors and friends', function () {
        const { Form, ValueManager, ...context } = newSubschemaContext();

        const WField = context.injector.inject(Field);
        const field  = {
            help    : 'Hello',
            validators,
            type    : 'Text',
            template: 'EditorTemplate'
        };
        const finst  = intoWithContext(<WField path="name"
                                               field={field}/>, context, true);
        let templ    = finst.find(EditorTemplate);
        const input  = byTag(finst, 'input');

        expect(templ.prop('help').content).to.eql('Hello');
        expect(templ.prop('title')).to.eql('Name');
        expect(input.getDOMNode().getAttribute('type')).to.eql('text');
        change(input, 'a');
        finst.update();
        expect(finst.find(EditorTemplate).prop('help').content).to.eql('Hello');

        change(input, 'aa');
        finst.update();


        expect(finst.find(EditorTemplate).prop('help').content).to.eql('Hello');
        blur(input);
        finst.update();

        expect(finst.find(EditorTemplate).prop('error')).to.eql(
            '2 is less than 3');
        change(input, 'aaa');
        finst.update();
        templ = finst.find(EditorTemplate);

        expect(templ.prop('help').content).to.eql('Hello');

    });
    it('should not render template only field', function () {
        const { valueManager, injector, loader } = newSubschemaContext();

        loader.addType('TestText', class extends Component {

            static template = false;

            render() {
                return <input {...this.props}/>
            }
        });
        loader.addTemplate('EditorTemplate', EditorTemplate);

        const WField = injector.inject(Field);
        const field  = {
            help: 'Hello',
            type: 'TestText'
        };
        const finst  = intoWithContext(<WField path="name"
                                               field={field}/>,
            { valueManager, injector, loader }, true,
            PropTypes.contextTypes);

        expect(byTag(finst, 'input')).to.have.length(1);


    });

    it('should render errors and friends with type custom typeTemplate',
        function () {
            const { valueManager, injector, loader } = newSubschemaContext();

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
                    name : PropTypes.string,
                    help : PropTypes.node
                };

                render() {
                    var { name, title, help, error, errorClassName, message, fieldClass, children } = this.props;

                    return (<div>
                        {title}
                        {children}
                        {error || help}
                    </div>);
                }
            }

            loader.addType('JoeText', JoeText);
            loader.addTemplate('JoeTemplate', JoeTemplate);
            const WField = injector.inject(Field);
            const field  = {
                help      : 'Hello',
                type      : 'JoeText',
                validators: validators
            };
            const finst  = intoWithContext(<WField path="name" field={field}/>,
                {
                    valueManager,
                    loader,
                    injector
                }, true, PropTypes.contextTypes);
            byComponent(finst, JoeText);
            const templ = byComponent(finst, JoeTemplate);
            const input = byTag(finst, 'input');
            expect(templ.prop('help')).to.eql('Hello');
            expect(templ.props().title).to.eql('Name');
            change(byTag(finst, 'input'), 'a');
            finst.update();

            expect(byComponent(finst, JoeTemplate).props().help).to
                                                                .eql('Hello');
            change(byTag(finst, 'input'), 'aa');
            finst.update();

            expect(byComponent(finst, JoeTemplate).props().help).to
                                                                .eql('Hello');
            blur(byTag(finst, 'input'));
            finst.update();

            expect(byComponent(finst, JoeTemplate).props().error).to.eql(
                '2 is less than 3');
            change(byTag(finst, 'input'), 'aaa');
            finst.update();
            expect(byComponent(finst, JoeTemplate).props().error).to.not.exist;
            expect(byComponent(finst, JoeTemplate).props().help).to
                                                                .eql('Hello');

        });
});
