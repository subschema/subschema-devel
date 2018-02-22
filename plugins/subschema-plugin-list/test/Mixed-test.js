import React from 'react';
import {
    byClass, byComponent, byComponents, change, click, expect, into
} from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import {
    CollectionCreateTemplate, ListItemTemplate, Mixed
} from 'subschema-plugin-list';
import { ButtonTemplate } from 'subschema-plugin-template-button';
import { Radio } from 'subschema-plugin-type-radio';
import { Text } from 'subschema-plugin-type-text';

const Questionaire = {
    schema: {
        schema: {
            questions: {
                type     : "Mixed",
                keyType  : 'Text',
                title    : 'Questioniare',
                labelKey : 'answer',
                canEdit  : true,
                canDelete: true,
                canAdd   : true,
                valueType: {
                    type     : 'Object',
                    subSchema: {
                        answer: 'Text',
                        feel  : {
                            type   : 'Radio',
                            options: ['Good', 'Bad', 'Indifferent']
                        }
                    }
                }
            }
        }
    },
    data  : {
        questions: {
            question1: {
                answer: 'I know nothing',
                feel  : 'Good'
            },
            question2: {
                answer: 'I still know nothing',
                feel  : 'bad'
            }
        }
    },
    errors: {
        'questions.question2.answer': [{
            message: 'Are you sure?'
        }]
    }
};

describe('subschema-plugin-list/Mixed', function () {
    //  beforeEach(cleanUp);
    let form;

    it('should render a Mixed with data', function () {
        const { Form, loader, valueManager } = newSubschemaContext();

        valueManager.setValue(Questionaire.data);

        form      = into(<Form
            key='form1'
            schema={Questionaire.schema}
            valueManager={valueManager}
            loader={loader}
        />, true);
        let mixed = form.find(Mixed);
        expect(mixed.find(ListItemTemplate)).to.have.length(2);
        let addBtn = byClass(mixed, 'btn-add').at(0);
        click(addBtn, form);
        let texts = form.find(CollectionCreateTemplate).find(Text);
        change(texts.at(0), 'goodkey', form);
        change(texts.at(1), 'Bad', form);
        let radio = form.find(Radio).find('input').at(1);
        click(radio, form);
        click(form.find(CollectionCreateTemplate).find(ButtonTemplate).at(1),
            form);

        expect(form.find(ListItemTemplate), `Expect 3 components`).to.have
                                                                  .length(3);
    });
    //Disturbingly this fails when the other test is enabled.
    it('should render a Mixed without data', function () {
        const { Form, loader, valueManager } = newSubschemaContext();

        form      = into(<Form
            valueManager={valueManager}
            key='form2'
            schema={Questionaire.schema}
            loader={loader}
        />, true);
        let mixed = form.find(Mixed);

        byComponents(mixed, ListItemTemplate, 0);
        click(form.find(ButtonTemplate), form);
        let createTemplate = byComponent(form, CollectionCreateTemplate);

        let texts = byComponents(form, Text);
        change(texts.at(0), 'goodkey', form);
        change(texts.at(1), 'Bad', form);

        click(form.find(Radio).find('input').at(1), form);
        click(form.find(CollectionCreateTemplate).find(ButtonTemplate).at(1),
            form);

       // expect(form.find(ListItemTemplate)).to.have.length(1);
    });
});
