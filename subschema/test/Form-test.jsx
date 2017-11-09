import React, { Component } from "react";
import {
    byClass, byTag, byTags, byType, cleanUp, click, expect, into, Simulate,
    TestUtils
} from "subschema-test-support";
import { newSubschemaContext } from "subschema";

describe('components/Form', function () {
    this.timeout(50000);
    let Form, ValueManager, EditorTemplate, ButtonTemplate, loader;

    beforeEach(function () {
        const context  = newSubschemaContext();
        loader         = context.loader;
        Form           = context.Form;
        ValueManager   = context.ValueManager;
        EditorTemplate = context.loader.loadTemplate('EditorTemplate');
        ButtonTemplate = context.loader.loadTemplate('ButtonTemplate')
    });
    afterEach(cleanUp);

    it('should create a form with a schema and value and triggered error only after having been valid',
        function (done) {
            const value = {}, schema = {
                schema: {
                    name: {
                        type      : 'Text',
                        validators: ['email'],
                        help      : 'I need help'
                    }
                }
            }, errors                = {};

            const root  = into(<Form value={value} schema={schema}
                                     errors={errors}
                                     loader={loader}/>);
            const edit  = TestUtils.scryRenderedComponentsWithType(root,
                EditorTemplate)[0];
            const input = byTag(edit, 'input');
            Simulate.blur(input);

            expect(edit.props.error).to.not.exist;

            /*
             Simulate.change(input, {target: {value: 'dude@g'}});
             expect(field.state.errors.name).to.not.exist;
             */

            Simulate.change(input, { target: { value: 'dude@g.com' } });

            expect(edit.props.error).to.not.exist;

            Simulate.change(input, { target: { value: 'dude@g' } });
            expect(edit.props.error).to.exist;
            Simulate.change(input, { target: { value: 'dude@g.com' } });

            expect(edit.props.error).to.not.exist;


            Simulate.change(input, { target: { value: 'dude@g' } });

            expect(edit.props.error).to.exist;

            Simulate.blur(input);
            expect(edit.props.error).to.exist;

            Simulate.change(input, { target: { value: 'dude@go.com' } });
            expect(edit.props.error).to.not.exist;

            Simulate.change(input, { target: { value: 'dude@g' } });
            expect(edit.props.error).to.exist;

            Simulate.change(input, { target: { value: '' } });
            expect(edit.props.error).to.not.exist;
            done();
        });
    //This should give a warning. and it does, but it makes debuuging harder so
    // let's skip it and leave it for documentation sake.
    it.skip('should create a form', function () {

        const root = into(<Form/>);
        expect(root).to.exist;
    });
    it('should create a form with a schema', function () {

        const root = into(<Form schema={{
            schema: {
                name: 'Text'
            }
        }}/>);

        expect(root).to.exist;
        const edit = TestUtils.scryRenderedComponentsWithType(root,
            EditorTemplate)[0]
        expect(edit).to.exist;
    });
    it('should create a form with a schema and value', function () {

        const root = into(<Form value={{ name: 'Joe' }} schema={{
            schema: {
                name: 'Text'
            }
        }}/>);

        expect(root).to.exist;
        const edit = TestUtils.scryRenderedComponentsWithType(root,
            EditorTemplate)[0]

        expect(edit).to.exist;
        expect(root.getValue().name).to.eql('Joe');
    });

    it('should create a form with a schema and value and error', function () {
        const value = {
            name: 'Joe'
        }, schema   = {
            schema: {
                name: 'Text'
            }
        }, errors   = {
            name: [{ message: 'Is lousy', type: 'GENERIC' }]
        };
        const root  = into(<Form value={value} schema={schema}
                                 errors={errors}/>);
        const edit  = TestUtils.scryRenderedComponentsWithType(root,
            EditorTemplate)[0]
        expect(edit.props.error).to.eql('Is lousy');
    });

    it('should create a form with a schema and value and triggered error',
        function () {
            const valueManager = ValueManager({}), schema = {
                schema: {
                    name: {
                        type      : 'Text',
                        validators: ['required']
                    }
                }
            }, errors                                     = {};

            const root  = into(<Form valueManager={valueManager} schema={schema}
                                     errors={errors}/>);
            const edit  = TestUtils.scryRenderedComponentsWithType(root,
                EditorTemplate)[0]
            const input = byTag(edit, 'input');
            //   Simulate.blur(input);
            expect(edit.props.error,
                'No value no trigger no error').to.not.exist;
            valueManager.validate();
            expect(edit.props.error)
                .to.eql('Required', 'No value no trigger no error');
        });

    it('should create a nested form with multiple errors', function () {
        const value = {}, schema = {
            schema: {
                name: {
                    type      : 'Text',
                    validators: ['email']
                },
                test: {
                    type     : 'Object',
                    subSchema: {
                        stuff: {
                            type      : 'Text',
                            validators: ['required']
                        },
                        more : {
                            type     : 'Object',
                            subSchema: {
                                andMore: {
                                    type      : 'Text',
                                    validators: ['required']
                                }
                            }
                        }
                    }
                }
            }
        }, errors   = {
            'name'             : [{ message: 'Error Not My Name' }],
            'test.stuff'       : [{ message: 'Error Not My stuff' }],
            'test.more.andMore': [{ message: 'Error And More' }]
        }
        const root  = into(<Form value={value} schema={schema}
                                 errors={errors}/>);
        //     expect(root.refs.name.state.errors[0].message).to.eql('Error
        // Not My Name');
        // expect(root.refs.test.refs.field.state.errors.name[0].message).to.eql('Error
        // Not My Name');

//        expect(root.refs.test.refs.field.refs.more.fstate.errors.name[0].message).to.eql('Error
// Not My Name');


        /*    var input = root.refs.name.refs.field.refs.input,
         field = root.refs.name;
         Simulate.blur(input);

         expect(field.state.errors.name).to.not.exist;*/

    });
    it('should create a nested form with when setErrors is called',
        function () {
            const msg1   = 'Error Not My Name',
                  msg2   = 'Error Not My stuff',
                  msg3   = 'Error And More',
                  value  = {},
                  schema = {
                      schema: {
                          name: {
                              type      : 'Text',
                              validators: ['email']
                          },
                          test: {
                              type     : 'Object',
                              subSchema: {
                                  stuff: {
                                      type      : 'Text',
                                      validators: ['required']
                                  },
                                  more : {
                                      type     : 'Object',
                                      subSchema: {
                                          andMore: {
                                              type      : 'Text',
                                              validators: ['required']
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  },
                  errors = {
                      'name'             : [{ message: msg1 }],
                      'test.stuff'       : [{ message: msg2 }],
                      'test.more.andMore': [{ message: msg3 }]
                  };

            const root = into(<Form value={value} schema={schema}
                                    errors={{}}/>);
            root.setErrors(errors);
            /*   expect(root.refs.name.state.errors[0].message).to.eql(msg1);
             var res = root.validate();
             expect(res.name[0].message).to.eql(msg1);
             expect(res['test.stuff'][0].message).to.eql(msg2);
             expect(res['test.more.andMore'][0].message).to.eql(msg3);

             Simulate.change(root.refs.test.refs.field.refs.stuff.refs.field.refs.input, {target: {value: null}})
             var res = root.validate();
             expect(res.name[0].message).to.eql(msg1);
             expect(res['test.stuff'][0].message).to.eql(msg2);
             expect(res['test.more.andMore'][0].message).to.eql(msg3);

             Simulate.change(root.refs.test.refs.field.refs.stuff.refs.field.refs.input, {target: {value: 'stuff'}});
             res = root.validate();
             expect(res['test.stuff']).to.not.exist;

             Simulate.change(root.refs.test.refs.field.refs.stuff.refs.field.refs.input, {target: {value: ''}});
             res = root.validate();
             expect(res['test.stuff'][0].message).to.eql('Required');*/

        });

    it('should submit a form', function () {
        let submitArgs;
        const schema = {
                  schema   : {
                      "test": "Text"
                  },
                  fieldsets: [{
                      fields : 'test',
                      buttons: ["submit"]
                  }]
              },
            value    = {},
            onSubmit = (e, ...args) => {
                e && e.preventDefault();

                submitArgs = args;
            };

        const root   = into(<Form value={value} schema={schema}
                                  onSubmit={onSubmit}/>);
        const button = byType(root, ButtonTemplate);
        expect(button, 'it should have rendered').to.exist;
        click(button);
        expect(submitArgs).to.exist;
    });

    it('should not submit a form with errors', function () {
        var schema             = {
            schema   : {
                "test": {
                    type        : "Text",
                    "validators": ["required"]
                }
            },
            fieldsets: [{
                fields : 'test',
                buttons: ["submit"]
            }]
        }, value, error, count = 0, onSubmit = (e, err, val, ...args) => {
            e && e.preventDefault();
            value = val;
            error = err;
            count++;
        };

        var root   = into(<Form value={{}} schema={schema}
                                onSubmit={onSubmit}/>);
        var button = byType(root, ButtonTemplate);
        expect(button,'it should have rendered').to.exist;
        click(button);
        expect(value).to.exist;
        expect(error).to.exist;
        expect(error.test).to.exist;
        expect(error.test[0].type).to.eql('required', 'Should have an error');
        expect(error.test.length).to.eql(1);
        click(button);
        expect(value).to.exist;
        expect(error).to.exist;
        expect(error.test).to.exist;
        expect(error.test[0].type).to.eql('required', 'Should have an error');
        expect(error.test.length).to.eql(1);
        expect(count).to.eql(2);
    });

    it('should validate checkbox on submit', function () {
        const valueManager = ValueManager({});
        const root         = into(<Form valueManager={valueManager} schema={{
            schema   : {
                c1: { type: 'Checkbox', validators: ['required'] }
            },
            fieldsets: [{
                buttons: [{
                    action: "submit",
                    label : "Submit"
                }],
                legend : "C1",
                fields : "c1"
            }]
        }}/>, true);
        expect(root).to.exist;
        let submit = byTag(root, 'button');
        click(submit);
        const err = byClass(root, 'error-block')[0];
        expect(err.innerHTML).to.eql('Required');
        valueManager.update('c1', true);
        expect(byClass(root, 'help-block')[0].innerHTML).to.eql('');

    });


    it('should re-render when the schema changes', function () {
        const schemas = [{ test: { type: 'Text' } }, { other: { type: 'Text' } }]

        class StateForm extends Component {
            state = { form: 0 };

            render() {
                return <Form schema={{ schema: schemas[this.state.form] }}/>
            }
        }

        const sform = into(<StateForm/>);
        const test  = byTag(sform, 'input');
        expect(test.name).to.eql('test');

        sform.setState({ form: 1 });

        const other = byTag(sform, 'input');
        expect(other.name).to.eql('other');
    })


});
