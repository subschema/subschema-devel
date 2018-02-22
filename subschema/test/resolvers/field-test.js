import { expect } from 'chai';
import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import { byComponent, intoWithContext } from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';

const { field } = PropTypes;

describe('subschema/field', function () {
    this.timeout(50000);

    class JoeTemplate extends Component {
        static propTypes = {
            error: PropTypes.error,
            title: PropTypes.title,
            name : PropTypes.string,
            help : PropTypes.node
        };

        render() {
            let { name, title, help, error, errorClassName, message, fieldClass, children } = this.props;
            if (!title) {
                title = ''
            }
            return (<div>
                {name}
                {children}
                {help === false ? null : error}
            </div>);
        }
    }

    class ResolverFieldTest extends Component {
        static propTypes = { field };

        render() {
            const { template, Type, ...rest } = this.props.field;
            const { Template }                = template || {};
            if (Template) {
                return <Template {...rest}><Type {...rest}/></Template>
            }
            return <Type {...rest}/>
        }
    }

    it('should inject default type and template', function () {
        const { Form, loader, valueManager, injector } = newSubschemaContext();

        const Wrap = injector.inject(
            ResolverFieldTest);

        const inst = intoWithContext(<Wrap/>, {
                valueManager,
                injector,
                loader
            }, true,
            PropTypes.contextTypes);

        const test = byComponent(inst, ResolverFieldTest);
        const f    = test.prop('field');
        expect(f.template.Template.displayName)
            .to.match(/EditorTemplate\$Wrapper/);
        expect(f.Type.displayName).to.match(/Text\$Wrapper/);

    });
    it('should inject default type and overriden template', function () {
        const { loader, valueManager, injector }                  = newSubschemaContext();


        class TestType extends Component {
            static template = { template: 'JoeTemplate', className: 'what' };

            render() {
                return <span>testtype</span>
            }
        }

        const Wrap = injector.inject(ResolverFieldTest);

        loader.addTemplate('JoeTemplate', JoeTemplate);
        loader.addType('TestType', TestType);

        const inst = intoWithContext(<Wrap field={{ type: 'TestType' }}/>, {
            valueManager,
            loader,
            injector
        }, true, PropTypes.contextTypes);

        const test = byComponent(inst, ResolverFieldTest);
        const f    = test.prop('field');
        expect(f.template.Template.displayName).to.match(/\$Wrapper/);
        expect(f.Type.displayName).to.match(/\$Wrapper/);
        byComponent(inst, TestType);
        byComponent(inst, JoeTemplate);

    });
    it('should inject default type and template is false', function () {

        const { loader, valueManager, injector  }                  = newSubschemaContext();


        class TestType extends Component {
            static template = false;

            render() {
                return <span>testtype</span>
            }
        }

        const Wrap = injector.inject(ResolverFieldTest);

        loader.addTemplate('JoeTemplate', JoeTemplate);
        loader.addType('TestType', TestType);

        const inst = intoWithContext(<Wrap field={{ type: 'TestType' }}/>, {
            valueManager,
            loader,
            injector
        }, true, PropTypes.contextTypes);

        const test = byComponent(inst, ResolverFieldTest);
        const f    = test.prop('field');
        expect(f.Template).to.not.exist;

        expect(f.Type.displayName).to.match(/TestType\$Wrapper/);
         byComponent(inst, TestType);


    });
});
