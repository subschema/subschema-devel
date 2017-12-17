import { expect } from 'chai';
import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import { byComponent, intoWithContext } from 'subschema-test-support';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';

const { field } = PropTypes;

describe('resolvers/field', function () {
    this.timeout(50000);

    class JoeTemplate extends Component {
        static propTypes = {
            error: PropTypes.error,
            title: PropTypes.title,
            name : PropTypes.string,
            help : PropTypes.node
        };

        render() {
            var { name, title, help, error, errorClassName, message, fieldClass, children } = this.props;
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
        const { context, Form }                  = newSubschemaContext();
        const { loader, valueManager, injector } = context;
        const Wrap                               = injector.inject(
            ResolverFieldTest);

        const inst = intoWithContext(<Wrap/>, context, true,
            PropTypes.contextTypes)

        const test = byComponent(inst, ResolverFieldTest);
        const f    = test.props.field;
        expect(f.template.Template.displayName)
            .to.match(/EditorTemplate\$Wrapper/);
        expect(f.Type.displayName).to.match(/Text\$Wrapper/);

    });
    it('should inject default type and overriden template', function () {
        const { context, Form }                  = newSubschemaContext();
        const { loader, valueManager, injector } = context;

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
        }, true, PropTypes.contextTypes)

        const test = byComponent(inst, ResolverFieldTest);
        const f    = test.props.field;
        expect(f.template.Template.displayName).to.match(/\$Wrapper/);
        expect(f.Type.displayName).to.match(/\$Wrapper/);
        const tt = byComponent(inst, TestType);
        const jt = byComponent(inst, JoeTemplate);

    });
    it('should inject default type and template is false', function () {

        const { context, Form }                  = newSubschemaContext();
        const { loader, valueManager, injector } = context;

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
        const f    = test.props.field;
        expect(f.Template).to.not.exist;

        expect(f.Type.displayName).to.match(/TestType\$Wrapper/);
        const tt = byComponent(inst, TestType);


    });
});
