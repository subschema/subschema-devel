import React from 'react';
import {
    byClass, byComponent, byComponents, byTags, change, click, expect, into
} from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import Questionaire from 'subschema-example-questionaire';

describe('subschema-plugin-project/samples/Questionaire', function () {
    let loader,
        Form,
        Mixed,
        CollectionCreateTemplate,
        ListItemTemplate,
        Text,
        Radio,
        ButtonTemplate;

    beforeEach(function () {
        const Subschema          = newSubschemaContext();
        loader                   = Subschema.loader;
        Form                     = Subschema.Form;
        Mixed                    = loader.loadType('Mixed');
        ListItemTemplate         = loader.loadTemplate('ListItemTemplate');
        Text                     = loader.loadType('Text');
        Radio                    = loader.loadType('Radio');
        CollectionCreateTemplate =
            loader.loadTemplate('CollectionCreateTemplate');
        ButtonTemplate           = loader.loadTemplate('ButtonTemplate');
    });
    //These fail when run globally and pass when run locally.
    //Some sort of issue with react-dom finding the wrong node.
    it('should render a Mixed with data', function () {
        const form = into(<Form
            schema={Questionaire.schema}
            value={Questionaire.data}
        />, true);
        let mixed  = byComponent(form, Mixed);
        expect(byComponents(mixed, ListItemTemplate).length).to.eql(2);
        let addBtn = form.find('button.btn-add');
        click(addBtn);
        form.update();

        let createTemplate = form.find(CollectionCreateTemplate);
        let texts = byComponents(createTemplate, Text);
        change(texts.at(0), 'goodkey');
        change(texts.at(1), 'Bad');
        form.update();

        let radio = byTags(byComponent(createTemplate, Radio), 'input').at(1);
        click(radio);
        click(byComponents(createTemplate, ButtonTemplate).at(1));
        form.update();
        expect(byComponents(mixed, ListItemTemplate).length,
            `Expect 3 components`).to.eql(2);
    });
    it.skip('should render a Mixed without data', function () {
        const form = into(<Form
            schema={Questionaire.schema}
        />, true);
        expect(form).to.exist;
        let mixed = byComponent(form, Mixed);
        byComponents(mixed, ListItemTemplate, 0);
        let addBtn = byComponent(mixed, ButtonTemplate);
        click(addBtn);
        let createTemplate = byComponent(mixed, CollectionCreateTemplate);

        let texts = byComponents(createTemplate, Text);
        change(texts[0], 'goodkey');
        change(texts[1], 'Bad');
        let radio = byTags(byComponent(createTemplate, Radio), 'input')[1];
        click(radio);
        click(byComponents(createTemplate, ButtonTemplate)[1]);

        expect(byComponents(mixed, ListItemTemplate).length).to.eql(1);
    });
});
