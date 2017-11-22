import React from "react";
import { newSubschemaContext } from "subschema";
import {
    byTags, cleanUp, expect, into, Simulate
} from "subschema-test-support";


describe('Form/submit', function () {
    this.timeout(5000);
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

    it('should submit the form and have handler by name', function (done) {
        const schema       = {
            template : 'ObjectTemplate',
            schema   : {
                test : {
                    type: 'Text'

                },
                other: {
                    type: 'Text'

                }
            },
            fieldsets: [{
                template: 'FormTemplate',
                fields  : 'test',
                name    : 'form1'
            }, {
                template: 'FormTemplate',
                fields  : 'other',
                name    : 'form2'
            }]
        };
        const valueManager = ValueManager();
        valueManager.addSubmitListener(null, function (e, err, value, path) {
            e && e.preventDefault();
            expect(path).to.eql('form2');
            done();
        });

        const content = into(<Form schema={schema}
                                   valueManager={valueManager}/>, true);
        const forms   = content.find('form');
        expect(forms.length).to.eql(2, 'found 2 forms');
        expect(forms.at(0).prop('name')).to.eql('form1');
        expect(forms.at(1).prop('name')).to.eql('form2');
        forms.at(1).simulate('submit');

    });

    it('should submit the form and have that is nested', function (done) {
        const schema       = {
            template: 'ObjectTemplate',
            schema  : {

                test: {
                    type     : "Object",
                    template : 'FormTemplate',
                    subSchema: {
                        schema: {
                            me: 'Text'
                        }
                    }

                },
                you : {
                    type     : "Object",
                    template : 'FormTemplate',
                    subSchema: {
                        schema: {
                            that: 'Text'
                        }
                    }

                }
            }
        };
        const valueManager = ValueManager();
        const paths        = [];
        valueManager.addSubmitListener('you', function (e, err, value, path) {
            e && e.preventDefault();
            expect(path).to.eql('you');
            paths.push(path);
        });

        valueManager.addSubmitListener('test', function (e, err, value, path) {
            e && e.preventDefault();
            expect(path).to.eql('test');
            paths.push(path);
        });

        valueManager.addSubmitListener(null, function (e, err, value, path) {
            paths.push(path);
        });
        setTimeout(() => {
            expect(paths[0]).to.eql('you');
            expect(paths[1]).to.eql('you');
            expect(paths[2]).to.eql('test');
            expect(paths[3]).to.eql('test');
            expect(paths.length).to.eql(4);
            done();
        }, 200);
        const content = into(<Form schema={schema}
                                   valueManager={valueManager}/>, true);
        const forms   = byTags(content, 'form');
        expect(forms).to.have.length(2, 'found 2 forms');
        forms.at(1).simulate('submit');
        forms.at(0).simulate('submit');


    });


});
