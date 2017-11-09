import React from 'react';
import {
    byComponent, byComponents, byTags, change, click, expect, findNode, into,
    TestUtils
} from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import { Modal } from 'subschema-test-samples';

function byId(node, id) {
    const all = TestUtils.findAllInRenderedTree(node, (inst) => {
        //apparently text nodes, are not correctly identified.
        if (inst == null || inst instanceof Text) {
            return false;
        }
        const inode = findNode(inst);
        if (inode == null) {
            return false;
        }
        return inode.id === id;
    });
    return all[0];
}

describe('subschema-test-samples/Modal', function () {
    this.timeout(50000);
    it('should render', function () {
        //loader, schema, Subschema, React
        const { valueManager, loader, Form } = newSubschemaContext();
        const ModalTemplate                  = loader.loadTemplate(
            'ModalTemplate');

        const form = into(<Form schema={Modal.schema}
                                valueManager={valueManager}/>, true);


        let modal = byComponents(form, ModalTemplate)[0];
        expect(modal,'modal should not show').to.not.exist;
        valueManager.update('showAddressModal', true);
        modal = byComponent(form, ModalTemplate);

        let buttons = byTags(modal, 'button');
        expect(buttons.length).to.eql(3, 'should have 3 buttons');
        click(buttons[0]);
        expect(valueManager.path('showAddressModal'))
            .to.eql(null, 'dismiss modal');

        valueManager.update('showAddressModal', true);
        modal    = byComponent(form, ModalTemplate);
        let addr = byId(modal, 'address.street');
        change(addr, 'hello');
        buttons = byTags(modal, 'button');
        click(buttons[1]);
        modal = byComponents(form, ModalTemplate)[0];
        expect(modal,'hide').to.not.exist;
        expect(valueManager.path('address'))
            .to.eql(null, 'should revert change on cancel');

        valueManager.update('showAddressModal', true);
        modal = byComponent(form, ModalTemplate);
        addr  = byId(modal, 'address.street');
        change(addr, 'hello2');
        buttons = byTags(modal, 'button');
        click(buttons[2]);
        modal = byComponents(form, ModalTemplate)[0];
        expect(modal).to.exist;
        //change to validate.
        change(byId(form, 'address.zip'), '95130');
        click(byTags(modal, 'button')[2]);


        modal = byComponents(form, ModalTemplate)[0];
        expect(modal,'hide').to.not.exist;
        expect(valueManager.path('address.street'))
            .to.eql('hello2', 'should commit change on save');


        valueManager.update('showAddressModal', true);
        modal = byComponent(form, ModalTemplate);
        addr  = byId(modal, 'address.street');
        change(addr, 'hello3');
        buttons = byTags(modal, 'button');
        click(buttons[1]);
        modal = byComponents(form, ModalTemplate)[0];
        expect(modal,'hide').to.not.exist;
        expect(valueManager.path('address.street'))
            .to.eql('hello2', 'should revert change on cancel');

    });
});
