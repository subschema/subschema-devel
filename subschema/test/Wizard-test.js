import React from 'react';
import {
    byComponent, byComponents, byTags, change, check, click, expect, into,
} from 'subschema-test-support';
import {newSubschemaContext as newContext} from 'subschema';
import { WizardTemplate } from 'subschema-plugin-type-wizard';
import { Text } from 'subschema-plugin-type-text';

describe('subschema-component-wizard', function () {
    this.timeout(5000);


    it('should create a new form with a wizard and stuff', function (done) {
        const { Form, loader, valueManager } = newContext();

        function onSubmit(...args) {
            done();
        }

        const root   = into(<Form template="WizardTemplate" loader={loader}
                                  valueManager={valueManager}
                                  onSubmit={onSubmit} schema={{
            schema   : {
                c1: {
                    type      : 'Checkbox',
                    validators: ['required']
                },
                c2: {
                    type      : 'Checkbox',
                    validators: ['required']
                },
            },
            fieldsets: [{
                legend: "C1",
                fields: "c1"
            }, {
                legend: "C2",
                fields: "c2"
            }]
        }}/>, true);
        let template = byComponent(root, WizardTemplate);
        expect(template, 'should have the template').to.have.length(1);
        click(template.find('button'));
        check(template.find('input[type="checkbox"]'), true);
        click(template.find('button'));
        setTimeout(function () {
            check(root.find('input[type="checkbox"]'), true);
            click(root.find('button').at(0));
            done();
        }, 1000);
        //  click(byTags(template, 'button')[1]);
        //  click(byTag(template, 'input'));


    });
    it('should create a new form with a wizard and submit with error',
        function (done) {
            const { Form, valueManager } = newContext();

            function onSubmit(e, err, value) {
                done(err == null ? 'Did not get error' : null);
            }

            var root = into(<Form valueManager={valueManager}
                                  onSubmit={onSubmit} schema={{
                template : "WizardTemplate",
                schema   : {
                    c1: { type: 'Checkbox', validators: ['required'] },
                    c2: { type: 'Checkbox', validators: ['required'] },
                },
                fieldsets: [{
                    legend: "C1",
                    fields: "c1"
                }, {
                    legend: "C2",
                    fields: "c2"
                }]
            }}/>, true);
            done();
            /*  let template = byComponent(root, templates.WizardTemplate);
             expect(template).toExist('should have the template');
             click(byTag(template, 'button'));
             check(byTag(template, 'input'), true);
             click(byTag(template, 'button'));
             setTimeout(function () {
             const btns = byTags(template, 'button');
             click(btns[1]);

             }, 1000);*/
            //  click(byTags(template, 'button')[1]);
            //  click(byTag(template, 'input'));


        });
    it('should render multiple wizards', function (done) {
        const { Form, valueManager } = newContext();

        const root  = into(<Form valueManager={valueManager} schema={{

            schema: {
                wiz1: {
                    type     : "Object",
                    subSchema: {
                        schema   : {
                            w1step1: "Text",
                            w1step2: "Text",
                        },
                        template : "WizardTemplate",
                        fieldsets: [{
                            "legend": "Wiz1 Step1",
                            "fields": "w1step1"
                        }, {
                            "legend": "Wiz1 Step2",
                            "fields": "w1step2"
                        }]
                    }
                },
                wiz2: {
                    type     : "Object",
                    subSchema: {
                        schema   : {
                            w2step1: "Text",
                            w2step2: "Text",
                        },
                        template : "WizardTemplate",
                        fieldsets: [{
                            "legend": "Wiz2 Step1",
                            "fields": "w2step1"
                        }, {
                            "legend": "Wiz2 Step2",
                            "fields": "w2step2"
                        }]
                    }
                }
            }

        }}/>, true);
        let tmpls = root.find(WizardTemplate);
        expect(tmpls).to.have.length(2);

        change(tmpls.at(0).find(Text), 'hello t1');
        click(tmpls.at(0).find('button'));
        setTimeout(() => {
            const texts = root.find(WizardTemplate).at(0).find(Text);
            change(texts.at(0), 'hello t2');

            click( root.find(WizardTemplate).at(0).find('button').at(1));

            done();
        }, 1200);


    });
});
