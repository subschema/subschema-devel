import React from 'react';
import {
    byComponent, byComponents, byId, byTags, change, click, expect, findNode,
    into
} from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import Modal from 'subschema-example-modal';

describe('subschema-test-samples/Modal', function () {
    this.timeout(50000);
    it('should render', function () {
        //loader, schema, Subschema, React
        const { valueManager, loader, Form } = newSubschemaContext();
        const ModalTemplate                  = loader.loadTemplate(
            'ModalTemplate');

        const form = into(<Form schema={Modal.schema}
                                valueManager={valueManager}/>, true);


        let modal = form.find(ModalTemplate);
        expect(modal, 'modal should not show').to.have.length(0);

        valueManager.update('showAddressModal', true);

        form.update();

        modal = form.find(ModalTemplate);

        let buttons = byTags(modal, 'button');
        expect(buttons).to.have.length(3, 'should have 3 buttons')
        click(buttons.at(0));
        expect(valueManager.path('showAddressModal'))
            .to.eql(null, 'dismiss modal');

        valueManager.update('showAddressModal', true);
        form.update();
        modal    = byComponent(form, ModalTemplate);
        let addr = modal.find('input[id="address.street"]');
        change(addr, 'hello');
        buttons = byTags(modal, 'button');
        click(buttons.at(1));
        modal = form.find(ModalTemplate);
        expect(modal, 'hide').to.have.length(0);
        expect(valueManager.path('address'))
            .to.eql(null, 'should revert change on cancel');

        valueManager.update('showAddressModal', true);
        form.update();

        modal = form.find(ModalTemplate);
        addr  = modal.find('input[id="address.street"]');
        change(addr, 'hello2');
        buttons = byTags(modal, 'button');
        click(buttons.at(2));
        form.update();

        modal = form.find(ModalTemplate);
        expect(modal).to.have.length(1);
        //change to validate.
        change(form.find('input[id="address.zip"]'), '95130');
        click(byTags(modal, 'button').at(2));
        form.update();

        modal = form.find(ModalTemplate);
        expect(modal, 'hide').to.have.length(0);
        expect(valueManager.path('address.street'))
            .to.eql('hello2', 'should commit change on save');


        valueManager.update('showAddressModal', true);
        form.update();
        modal = byComponent(form, ModalTemplate);
        addr  = form.find('input[id="address.zip"]');
        change(addr, 'hello3');
        buttons = byTags(modal, 'button');
        click(buttons.at(1));
        form.update();

        modal = form.find(ModalTemplate);
        expect(modal, 'hide').to.have.length(0);
        expect(valueManager.path('address.street'))
            .to.eql('hello2', 'should revert change on cancel');

    });
});
