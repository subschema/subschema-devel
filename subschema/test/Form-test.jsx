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

            expect(edit.props.error).toNotExist();

            /*
             Simulate.change(input, {target: {value: 'dude@g'}});
             expect(field.state.errors.name).toNotExist();
             */

            Simulate.change(input, { target: { value: 'dude@g.com' } });

            expect(edit.props.error).toNotExist();

            Simulate.change(input, { target: { value: 'dude@g' } });
            expect(edit.props.error).toExist();
            Simulate.change(input, { target: { value: 'dude@g.com' } });

            expect(edit.props.error).toNotExist();


            Simulate.change(input, { target: { value: 'dude@g' } });

            expect(edit.props.error).toExist();

            Simulate.blur(input);
            expect(edit.props.error).toExist();

            Simulate.change(input, { target: { value: 'dude@go.com' } });
            expect(edit.props.error).toNotExist();

            Simulate.change(input, { target: { value: 'dude@g' } });
            expect(edit.props.error).toExist();

            Simulate.change(input, { target: { value: '' } });
            expect(edit.props.error).toNotExist();
            done();
        });
    //This should give a warning. and it does, but it makes debuuging harder so
    // let's skip it and leave it for documentation sake.
    it.skip('should create a form', function () {

        const root = into(<Form/>);
        expect(root).toExist();
    });
    it('should create a form with a schema', function () {

        const root = into(<Form schema={{
            schema: {
                name: 'Text'
            }
        }}/>);

        expect(root).toExist();
        const edit = TestUtils.scryRenderedComponentsWithType(root,
            EditorTemplate)[0]
        expect(edit).toExist();
    });
    it('should create a form with a schema and value', function () {

        const root = into(<Form value={{ name: 'Joe' }} schema={{
            schema: {
                name: 'Text'
            }
        }}/>);

        expect(root).toExist();
        const edit = TestUtils.scryRenderedComponentsWithType(root,
            EditorTemplate)[0]

        expect(edit).toExist();
        expect(root.getValue().name).toEqual('Joe');
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
        expect(edit.props.error).toEqual('Is lousy');
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
            expect(edit.props.error).toNotExist('No value no trigger no error');
            valueManager.validate();
            expect(edit.props.error)
                .toEqual('Required', 'No value no trigger no error');
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
        //     expect(root.refs.name.state.errors[0].message).toEqual('Error
        // Not My Name');
        // expect(root.refs.test.refs.field.state.errors.name[0].message).toEqual('Error
        // Not My Name');

//        expect(root.refs.test.refs.field.refs.more.fstate.errors.name[0].message).toEqual('Error
// Not My Name');


        /*    var input = root.refs.name.refs.field.refs.input,
         field = root.refs.name;
         Simulate.blur(input);

         expect(field.state.errors.name).toNotExist();*/

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
            /*   expect(root.refs.name.state.errors[0].message).toEqual(msg1);
             var res = root.validate();
             expect(res.name[0].message).toEqual(msg1);
             expect(res['test.stuff'][0].message).toEqual(msg2);
             expect(res['test.more.andMore'][0].message).toEqual(msg3);

             Simulate.change(root.refs.test.refs.field.refs.stuff.refs.field.refs.input, {target: {value: null}})
             var res = root.validate();
             expect(res.name[0].message).toEqual(msg1);
             expect(res['test.stuff'][0].message).toEqual(msg2);
             expect(res['test.more.andMore'][0].message).toEqual(msg3);

             Simulate.change(root.refs.test.refs.field.refs.stuff.refs.field.refs.input, {target: {value: 'stuff'}});
             res = root.validate();
             expect(res['test.stuff']).toNotExist();

             Simulate.change(root.refs.test.refs.field.refs.stuff.refs.field.refs.input, {target: {value: ''}});
             res = root.validate();
             expect(res['test.stuff'][0].message).toEqual('Required');*/

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
        expect(button).toExist('it should have rendered');
        click(button);
        expect(submitArgs).toExist();
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
        expect(button).toExist('it should have rendered');
        click(button);
        expect(value).toExist();
        expect(error).toExist();
        expect(error.test).toExist();
        expect(error.test[0].type).toBe('required', 'Should have an error');
        expect(error.test.length).toBe(1);
        click(button);
        expect(value).toExist();
        expect(error).toExist();
        expect(error.test).toExist();
        expect(error.test[0].type).toBe('required', 'Should have an error');
        expect(error.test.length).toBe(1);
        expect(count).toBe(2);
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
        expect(root).toExist();
        let submit = byTag(root, 'button');
        click(submit);
        const err = byClass(root, 'error-block')[0];
        expect(err.innerHTML).toBe('Required');
        valueManager.update('c1', true);
        expect(byClass(root, 'help-block')[0].innerHTML).toBe('');

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
        expect(test.name).toBe('test');

        sform.setState({ form: 1 });

        const other = byTag(sform, 'input');
        expect(other.name).toBe('other');
    })


});
