import React from 'react';
import {
    byClass, byComponent, byComponents, byTag, change, click, expect,
    filterProp, findNode, into, Simulate, TestUtils,
} from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import Todos from 'subschema-example-todos';


describe('subschema-plugin-project/samples/Todos', function () {
    this.timeout(50000);
    let ButtonTemplate, ListItemTemplate, CollectionCreateTemplate, Form,
        loader, Subschema;

    function controlBtn(task, action) {
        return task.find(`button[action="${action}"]`);
    }

    beforeEach(function () {
        Subschema                = newSubschemaContext();
        loader                   = Subschema.loader;
        Form                     = Subschema.Form;
        ButtonTemplate           = loader.loadTemplate('ButtonTemplate');
        ListItemTemplate         = loader.loadTemplate('ListItemTemplate');
        CollectionCreateTemplate =
            loader.loadTemplate('CollectionCreateTemplate')
    });

    it('should render a list', function () {
        const root  = into(<Form schema={Todos.schema}/>, true);
        const tasks = byComponents(root, ListItemTemplate);
        expect(tasks).to.have.length(0);

    });
    it('should render a list with data', function () {
        const root  = into(<Form schema={Todos.schema} value={Todos.data}/>,
            true);
        const tasks = byComponents(root, ListItemTemplate);
        expect(tasks).to.have.length(3);
        const second = byComponents(root, ListItemTemplate).at(2);
        click(byClass(second, 'clickable').at(0));
    });

    it('should render a list with data the canAdd', function () {
        const data = {
            tasks: [
                'one',
                'two',
                'three'
            ]
        };
        const root = into(<Form schema={Todos.schema} value={data}/>, true);


        const addBtn = root.find('button.btn-add');

        expect(addBtn, 'add btn should exit').to.have.length(1);

        const items = byComponents(root, ListItemTemplate);
        expect(items).to.have.length(3);
        const first = items.at(0), second = items.at(1), last = items.at(2);

        expect(controlBtn(first, 'up')).to.have.length(0);
        expect(controlBtn(first, 'down')).to.have.length(1);
        expect(controlBtn(first, 'delete')).to.have.length(1);


        expect(controlBtn(second, 'up')).to.have.length(1);
        expect(controlBtn(second, 'down')).to.have.length(1);
        expect(controlBtn(second, 'delete')).to.have.length(1);

        expect(controlBtn(last, 'up')).to.have.length(1);
        expect(controlBtn(last, 'delete')).to.have.length(1);
        expect(controlBtn(last, 'down')).to.have.length(0);


    });
});
