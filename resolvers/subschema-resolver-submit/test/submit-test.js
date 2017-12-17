import React, { Component } from "react";
import PropTypes from 'subschema-prop-types';
import { byTag, into, Simulate } from "subschema-test-support";
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';
import formContext from 'subschema-component-form';
import { expect } from 'chai';

class TestForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.submit
    };

    render() {
        const { children, ...props } = this.props;
        return <form {...props}>
            <h1>What</h1>
            {children}
        </form>
    }
}

describe("resolvers/submit", function () {
    it('should submit ', function (done) {
        const { Form, context }        = newSubschemaContext();
        const { loader, valueManager } = context;
        loader.addLoader(formContext);
        valueManager.addSubmitListener(null, (e, err, value, path) => {
            e && e.preventDefault();
            expect(Object.keys(value).length).to.eql(0);
            expect(err).to.eql({
                "deep.test": [{ "type": "required", "message": "Required" }],
                "hello"    : [{ "type": "required", "message": "Required" }]
            });
            done();
        });
        loader.addTemplate({ TestForm });

        const schema = {
            schema: {
                "hello": {
                    "type"      : "Text",
                    "validators": ["required"]
                },
                "deep" : {
                    "type"     : "Object",
                    "template" : "TestForm",
                    "subSchema": {
                        "schema"   : {
                            "test": {
                                "type"      : "Text",
                                "validators": ["required"]
                            }
                        },
                        "fieldsets": [{
                            "fields": "test",
                            buttons : ["submit"]
                        }]
                    }
                }
            }
        };
        const form   = into(<Form template="ObjectTemplate" loader={loader}
                                  schema={schema}
                                  valueManager={valueManager}/>, true);
        const f      = byTag(form, "form");
        Simulate.submit(f);
        //  f.submit();

    });
});
