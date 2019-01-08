import React from 'react';
import 'subschema-styles-bootstrap/lib/style.css';
import {
    byClass, byComponents, byName, change, cleanUp, click, expect, filterProp,
    findNode, into, submit
} from 'subschema-test-support';

import { ButtonTemplate } from 'subschema-plugin-template-button';
import { EditorTemplate } from 'subschema-plugin-template-editor';
import {
    CollectionCreateTemplate, ListItemTemplate
} from 'subschema-plugin-list';
import { Text } from 'subschema-plugin-type-text';

import { newSubschemaContext } from 'subschema';


function controlBtn(task, action) {
    return filterProp(byComponents(task, ButtonTemplate), 'action', action)[0];
}

function newContext() {
    const ctx = newSubschemaContext();
    return ctx;
}

const debug = true;
describe.only('subschema-plugin-list/List', function () {

    this.timeout(50000);

    afterEach(cleanUp);

    function add(root, c) {
        const allBtns = root.find(ButtonTemplate);
        const addBtn  = allBtns.at(0);
        click(addBtn, root);
        const create = root.find(CollectionCreateTemplate);
        const input  = create.find(Text);
        change(input, `Hello, world ${c}`, root);
        const buttons = root.find(CollectionCreateTemplate)
                            .find(ButtonTemplate);
        expect(buttons).to.have.length(2);
        const btn = buttons.find('[action="submit"]').at(0);
        click(btn, root);
        const value = root.instance().getValue();
        expect(value.tasks, 'tasks should exist').to.exist;
        expect(value.tasks[c], `tasks[${c}] should equal`)
            .to.eql(`Hello, world ${c}`);
        const tasks = root.find(ListItemTemplate);
        return tasks.at(c);
    }

    function edit(root, c) {
        const tasks = root.find(ListItemTemplate);
        const item  = tasks.find('.clickable').at(0);
        click(item, root);
        const createTemplate = root.find(CollectionCreateTemplate);

        const input = byName(createTemplate, `@edit@tasks.value`).at(0);

        change(input, `Hello, world ${c}`, root);
        const btns = root.find(CollectionCreateTemplate)
                         .find('[action="submit"]');
        const btn  = btns.at(0);
        submit(btn, {}, root);
        expect(root.find('[name="@edit@tasks.value"]').at(0).prop('value')).to
                                                                           .eql('Hello, world '
                                                                                + c);
        return root.find(ListItemTemplate).at(c);
    }


    it.only('should render a list with data without canAdd', function () {
        const { Form, valueManager } = newContext();
        const schema                 = {
            schema: {
                tasks: {
                    type      : 'List',
                    title     : this.test.title,
                    itemType  : 'Text',
                    canEdit   : true,
                    canReorder: true,
                    canDelete : true
                }
            }
        };
        const data                   = {
            tasks: [
                'one',
                'two',
                'three'
            ]
        };
        valueManager.setValue(data);
        const root   = into(<Form schema={schema} key='form3'
                                  valueManager={valueManager}/>,
            debug);
        const tasks  = byComponents(root,
            ListItemTemplate);
        const addBtn = root.find('.btn-add').at(0);

        expect(addBtn, 'add button does not exist').to.have.length(0);
        expect(tasks, 'expected tasks').to.have.length(3);

        const span = root.find(ListItemTemplate).find('.clickable').at(0);
        click(span, root);

        const input = root.find(CollectionCreateTemplate)
                          .find('[name="@edit@tasks.value"]').at(0);
        expect(findNode(input).value).to.eql('one', 'value should be one');

    });
    it('should render a list with data is not editable', function () {
        const { Form, valueManager } = newContext();

        const schema = {
            schema: {
                tasks: {
                    title   : this.test.title,
                    type    : 'List',
                    itemType: 'Text'
                }
            }
        }, data      = {
            tasks: [
                'one',
                'two',
                'three'
            ]
        };
        let root     = into(<Form key='form0' schema={schema}
                                  value={data}/>, debug);
        const addBtn = byClass(root, 'btn-add')[0];

        expect(addBtn).to.not.exist;
        const tasks = byComponents(root, ListItemTemplate);
        expect(tasks.length).to.eql(3);
        tasks.forEach(function (task) {
            expect(controlBtn(task, 'up')).to.not.exist;
            expect(controlBtn(task, 'down')).to.not.exist;
            expect(controlBtn(task, 'delete')).to.not.exist;
        });
        root = null;
    });
    /**
     * TODO - Figure out why this fails when it is not the only test run.
     *
     */
    it.skip('should render a list without data and add values', function () {
        const { Form, valueManager } = newContext();
        const schema                 = {
            schema: {
                tasks: {
                    type      : 'List',
                    title     : this.test.title,
                    itemType  : 'Text',
                    canAdd    : true,
                    canEdit   : true,
                    canReorder: true,
                    canDelete : true
                }
            }
        };

        let root    = into(<Form key='form1' schema={schema}
                                 valueManager={valueManager}/>,
            debug);
        const tasks = byComponents(root, ListItemTemplate);
        expect(tasks).to.have.length(0);


        const a0 = add(root, 0);
        byClass(a0, 'btn-up');
        byClass(a0, 'btn-delete');
        byClass(a0, 'btn-down');

        /*
         var a1 = add(root, 1);
         expect(byClass(a1, 'btn-up')[0]).to.exist;
         expect(byClass(a1, 'btn-delete')[0]).to.exist;
         expect(byClass(a1, 'btn-down')[0]).to.not.exist;

         var a2 = add(root, 2);
         expect(byClass(a2, 'btn-up')[0]).to.exist;
         expect(byClass(a0, 'btn-delete')[0]).to.exist;
         expect(byClass(a2, 'btn-down')[0]).to.not.exist;
         expect(byClass(a1, 'btn-down')[0]).to.exist;


         click(byClass(a0, 'btn-delete')[0]);
         expect(root.getValue().tasks.length).toEqual(2);

         click(byClass(a1, 'btn-delete')[0]);
         expect(root.getValue().tasks.length).toEqual(1);

         click(byClass(a2, 'btn-delete')[0]);
         expect(root.getValue().tasks.length).toEqual(0);*/

        root = null;
    });
    it('should edit a value', function () {
        const { Form, valueManager } = newContext();

        const schema = {
            schema: {
                tasks: {
                    type      : 'List',
                    title     : this.test.title,
                    itemType  : 'Text',
                    canAdd    : true,
                    canEdit   : true,
                    canReorder: true,
                    canDelete : true
                }
            }
        }, data      = {
            tasks: ['Hello, world 0']
        };
        valueManager.setValue(data);
        const root = into(<Form key='editAValue' schema={schema}
                                valueManager={valueManager}/>,
            debug);
        edit(root, 0);
    });
    it('should render edit a value with an error', function () {
        const { Form } = newContext();

        const schema = {
            schema: {
                tasks: {
                    type      : 'List',
                    title     : this.test.title,
                    itemType  : 'Text',
                    canAdd    : true,
                    canEdit   : true,
                    canReorder: true,
                    canDelete : true
                }
            }
        }, data      = {
            tasks: ['one', 'two']
        }, errors    = {
            'tasks.1': [{ message: 'Can not be 2' }]
        };
        const root   = into(<Form key='form4' schema={schema} value={data}
                                  errors={errors}/>,
            debug);
        const found  = root.find(EditorTemplate);
        expect(found.at(0).prop('error')).to.eql('Can not be 2');
    });
});
