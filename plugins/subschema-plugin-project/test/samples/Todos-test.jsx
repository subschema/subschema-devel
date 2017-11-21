import React from 'react';
import {
    into,
    findNode,
    TestUtils,
    expect,
    filterProp,
    byClass,
    Simulate,
    click,
    byTag,
    byComponent,
    byComponents
} from 'subschema-test-support';
import {newSubschemaContext} from 'subschema';
import {Todos} from 'subschema-test-samples';


describe('subschema-test-samples/Todos', function () {
    this.timeout(50000);
    let ButtonTemplate, ListItemTemplate, CollectionCreateTemplate, Form, loader, Subschema;

    function controlBtn(task, action) {
        return filterProp(byComponents(task, ButtonTemplate), 'action', action)[0];
    }

    beforeEach(function () {
        Subschema = newSubschemaContext();
        loader = Subschema.loader;
        Form = Subschema.Form;
        ButtonTemplate = loader.loadTemplate('ButtonTemplate');
        ListItemTemplate = loader.loadTemplate('ListItemTemplate');
        CollectionCreateTemplate = loader.loadTemplate('CollectionCreateTemplate')
    });
    function add(root, c) {
        const allBtns = TestUtils.scryRenderedComponentsWithType(root, ButtonTemplate);
        const addBtn = findNode(allBtns[0]);

        click(addBtn);
        const create = byComponent(root, CollectionCreateTemplate);
        const input = byTag(create, 'input');
        Simulate.change(input, {target: {value: 'Hello, world ' + c}});
        const buttons = TestUtils.scryRenderedComponentsWithType(create, ButtonTemplate);
        expect(buttons[0],'buttons[0] does not exist').to.exist;
        const btn = findNode(filterProp(buttons, 'action', 'submit')[0]);
        Simulate.click(btn);

        const value = root.getValue();
        expect(value.tasks[c]).to.eql('Hello, world ' + c);
        const tasks = byComponents(root, ListItemTemplate);
        return tasks[c];
    }


    it('should render a list', function () {
        const root = into(<Form schema={Todos.schema}/>, true);
        const tasks = byComponents(root, ListItemTemplate);
        expect(tasks.length).to.eql(0);

    });
    it('should render a list with data', function () {
        const root = into(<Form schema={Todos.schema} value={Todos.data}/>, true);
        const tasks = byComponents(root, ListItemTemplate);
        expect(tasks.length).to.eql(3);
        const [first, second, last] = byComponents(root, ListItemTemplate);
        click(byClass(second, 'clickable')[0]);
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


        const addBtn = byClass(root, 'btn-add', 0)[0];

        expect(addBtn,'add btn should exit').to.exist;

        const [first, second, last] = byComponents(root, ListItemTemplate);

        expect(controlBtn(first, 'up')).to.not.exist;
        expect(controlBtn(first, 'down')).to.exist;
        expect(controlBtn(first, 'delete')).to.exist;


        expect(controlBtn(second, 'up')).to.exist;
        expect(controlBtn(second, 'down')).to.exist;
        expect(controlBtn(second, 'delete')).to.exist;

        expect(controlBtn(last, 'up')).to.exist;
        expect(controlBtn(last, 'delete')).to.exist;
        expect(controlBtn(last, 'down')).to.not.exist;


    });
});
