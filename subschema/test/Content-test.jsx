import React, { Component } from 'react';
import {
    context, expect, Form, into, intoWithContext
} from 'subschema-test-support';
import { Content as _Content } from 'subschema-plugin-content';
import ValueManager from 'subschema-valuemanager';
import PropTypes from 'subschema-prop-types';
import { newSubschemaContext } from 'subschema';

class TestClass extends Component {
    render() {
        return <div><span>hello</span>{this.props.children}</div>
    }

}

describe('subschema/Content', function () {
    let Content;
    let loader;
    let context;
    let injector;

    beforeEach(function () {
        let { Form, ...context_ } = newSubschemaContext();
        context                   = context_;
        loader                    = context.loader;
        injector                  = context.injector;
        loader.addType('Test', TestClass);
        Content = injector.inject(_Content);

    });

    function ctx(opts = {}) {
        return {
            loader,
            injector,
            valueManager: context.valueManager,
            ...opts,
        }
    }

    it('should do simple subsitution', function () {

        const valueManager = ValueManager({ test: 2 });

        const root = intoWithContext(<Content key='t1'
                                              content='your value is {test}'
                                              path="test"/>,
            { loader, injector, valueManager }, true);
        expect(root.text()).to.eql('your value is 2');
        expect(root.getDOMNode().tagName).to.eql('SPAN');
    });
    it('should do simple subsitution escape html in values', function () {
        const what         = `<h1>2</h1>`
        const valueManager = ValueManager({ what });
        const root         = intoWithContext(<Content key='t2'
                                                      content='your value is {what}'
                                                      path="test"/>,
            {
                valueManager,
                loader,
                injector

            }, true, PropTypes.contextTypes);
        expect(root.getDOMNode().innerHTML).to.eql(
            'your value is &lt;h1&gt;2&lt;/h1&gt;');
        expect(root.getDOMNode().tagName).to.eql('SPAN');
    });

    it('should render an array of content', function () {
        const what         = '<' + 'h1' + '>2<' + '/h1>';
        const more         = 1;
        const valueManager = ValueManager({ what, more });
        const content      = ['your value is {what}', 'is more'];
        const root         = intoWithContext(<Content key='t2' content={content}
                                                      path="test"/>,
            ctx({ valueManager }), true, PropTypes.contextTypes);
        expect(root.getDOMNode().tagName).to.eql('SPAN');

    });
    it('should render an object of content', function () {
        const what         = '<' + 'h1' + '>2<' + '/h1>';
        const more         = 1;
        const valueManager = ValueManager({ what, more });
        const content      = { h3: 'your value is {what}', div: 'is more' };
        const root         = intoWithContext(<Content key='t2' content={content}
                                                      path="test"/>,
            ctx({ valueManager }), true, PropTypes.contextTypes);
        expect(root.getDOMNode().tagName).to.eql('SPAN');

    });

    it('should render loaded types', function () {
        const what         = '<' + 'h1' + '>2<' + '/h1>';
        const more         = 1;
        const valueManager = ValueManager({ what, more });
        const content      = {
            h3: 'your value is {what}', Test: {
                content: ['is more']
            }
        };
        const root         = intoWithContext(<Content key='t2' content={content}
                                                      path="test"/>,
            ctx({ valueManager }), true, PropTypes.contextTypes);
        expect(root.getDOMNode().tagName).to.eql('SPAN');

    });
    it('should render loaded an h3', function () {
        const what         = '<' + 'h1' + '>2<' + '/h1>';
        const more         = 1;
        const valueManager = ValueManager({ what, more });

        const root = intoWithContext(<Content key='t2' dataType='p'
                                              className='stuff' content={''}
                                              path="test"/>,
            ctx({ valueManager }), true, PropTypes.contextTypes);
        const node = root.getDOMNode();
        const str  = node.innerHTML;
        expect(str).to.eql('');
        //expect(str).to.eql('your value is &lt;h1&gt;2&lt;/h1&gt;');
        expect(node.tagName).to.eql('P');
        expect(node.className).to.eql('stuff');
    });
    it('should render nested content', function () {
        const title = {

            type     : 'h3',
            content  : 'hello',
            className: 'panel-title clearfix'

        };

        intoWithContext(<Content content={title}
                                 className='panel panel-default'/>,
            ctx(), true);

    });
    it('should render nested content with children', function () {
        const title = {

            type     : 'h3',
            content  : ['hello', { children: true }],
            className: 'panel-title clearfix'

        };

        const root = intoWithContext(<Content content={title}
                                              className='panel panel-default'>
            <div>What</div>
        </Content>, ctx(), true, PropTypes.contextTypes);
        const node = root.getDOMNode();
        const str  = node.innerHTML;
    });

    it('should render content stuff in a form', function () {
        const content          = [
            {
                "className": "clz-left",
                "content"  : [
                    {
                        "type"   : "h1",
                        "content": "Heading stuff {hello}"
                    },
                    {
                        "type"   : "p",
                        "content": "Super special content"
                    },
                    {
                        "type"     : "button",
                        "className": "btn btn-primary",
                        "content"  : "Activate"
                    }
                ]
            },
            {
                "className": "clz-right",
                "content"  : [
                    {
                        "type"     : "img",
                        "className": "super-img",
                        "src"      : "about:blank",
                        "content"  : false
                    }
                ]
            }
        ];
        const schema           = {
            schema: {
                'test': {
                    type    : "Content",
                    template: false,
                    title   : false,
                    content
                }
            },
            fields: ["test"]

        };
        const { Form, loader } = newSubschemaContext();

        const form = into(<Form schema={schema}
                                valueManager={ValueManager({ hello: 'Joe' })}
                                loader={loader}/>);
        const node = form.getDOMNode();
        const str  = node.innerHTML.replace(/\s?data-reactid=\"[^"]*\"/g, '')
                         .replace(/\s+?/g, ' ');

        /*  expect(str).toEqual('<span type="span"><span  type="span">' +
         '<span class="clz-left" type="span">' +
         '<span class="clz-left">Heading stuff Joe</span>' +
         '<span class="clz-left">Super special content</span>' +
         '<span class="clz-left">Activate</span>' +
         '</span>' +
         '<span class="clz-right" type="span">' +
         '<img type="img" class="super-img" src="about:blank" content="false">' +
         '</span>' +
         '</span></span>');
         */
//        '<span class="clz-left" type="span"><span class="clz-left">Heading
// stuff Joe</span><span class="clz-left">Super special content</span><span
// class="clz-left">Activate</span></span><span class="clz-right"
// type="span"><img type="img" class="super-img" src="about:blank"
// content="false"></span>'
        //       '<span class="clz-left" type="span"><span
        // class="clz-left">Heading stuff Joe</span><span
        // class="clz-left">Super special content</span><span
        // class="clz-left">Activate</span></span><span class="clz-right"
        // type="span"><img type="img" class="super-img" src="about:blank"
        // content="false"></span>'

    });
});
