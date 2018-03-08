import React from 'react';
import { templates } from 'subschema-plugin-modal';
import {
    byComponent, change, check, click, expect, into
} from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import { ButtonTemplate } from 'subschema-plugin-template-button';
import { Checkbox } from 'subschema-plugin-type-checkbox';
import { Text } from 'subschema-plugin-type-text';

describe('subschema-component-modal', function () {
    this.timeout(50000);

    it.only('should render template with buttons that click', function () {
        //loader, schema, Subschema, React
        const { loader, Form } = newSubschemaContext();
        loader.addTemplate(templates);
        const form = into(<Form schema={{
            schema   : {
                test: 'Text'
            },
            fieldsets: [
                {
                    template: 'ModalTemplate',
                    legend  : 'hello',
                    fields  : ['test'],
                    buttons : ['close', 'cancel', 'submit']
                }
            ]
        }}/>, true);
        expect(form).to.exist;


    });

    it('should render template with buttons', function () {
        //loader, schema, Subschema, React
        const { loader, Form } = newSubschemaContext();
        loader.addTemplate(templates);
        const form = into(<Form schema={{
            schema   : {
                test: 'Text'
            },
            fieldsets: [
                {
                    template: 'ModalTemplate',
                    legend  : 'hello',
                    fields  : ['test'],
                    buttons : ['close', 'cancel', 'submit']
                }
            ]
        }}/>, true);
        expect(form).to.exist;
    });
    it('should render template with and submit validate', function () {
        //loader, schema, Subschema, React`
        const { loader, valueManager, Form, ValueManager } = newSubschemaContext();
        loader.addTemplate(templates);
        const onSubmit = (e, err, value) => {
            e && e.preventDefault();
        };
        const form     = into(<Form
            onSubmit={onSubmit} schema={{
            schema   : {
                test     : {
                    type      : 'Text',
                    validators: ['required']
                },
                showModal: {
                    type: 'Checkbox'
                }
            },
            fieldsets: [
                'showModal',
                {
                    template   : 'ModalTemplate',
                    conditional: {
                        listen   : 'showModal',
                        operation: 'truthy',
                        dismiss  : 'showModal'
                    },
                    legend     : 'hello',
                    fields     : ['test'],
                    buttons    : [{
                        label : 'Cancel',
                        name  : 'showModal',
                        value : false,
                        action: 'close'
                    }, {
                        label: 'Click Me',
                        name : 'showModal',

                        primary: true,
                        action : 'submit'
                    }]
                }
            ]
        }} loader={loader} valueManager={valueManager}/>, true);

        const checkbox = (checked = true) => check(form.find(Checkbox),
            checked);
        const cancel   = () => click(form.find(ButtonTemplate).at(0));
        const submit   = () => click(form.find(ButtonTemplate).at(1));
        const close    = () => click(form.find('.close'));
        const text     = (value) => change(byComponent(form, Text), value);
        const value    = (path, expected) => {
            const v = valueManager.path(path);
            if (expected != null) {
                return expect(v).to.eql(expected);
            }
            return expect(v).to.not.exist;

        };
        checkbox();
        submit();
        expect(valueManager.getErrors().test.length).to.eql(1);
        cancel();

        value('test', null);

        checkbox();

        text('goodbye');

        submit();

        value('test', 'goodbye');

        checkbox();

        text('goodbye world');


        value('test', 'goodbye world');

        cancel();

        value('test', 'goodbye');

        checkbox();

        text('goodbye world');

        close();

        value('test', 'goodbye');

        checkbox();

        text('gonna click it');

        //closes it tests unstash on destroy
        checkbox(false);

        value('test', 'goodbye');

    });
    it('should render template with and submit validate minimal',
        function () {
            //loader, schema, Subschema, React
            const { valueManager, loader, Form, ValueManager } = newSubschemaContext();
            loader.addTemplate(templates);
            const onSubmit = (e, err, value) => {
                e && e.preventDefault();
            };
            const form     = into(<Form
                onSubmit={onSubmit} schema={{
                schema   : {
                    test     : {
                        type      : 'Text',
                        validators: ['required']
                    },
                    showModal: {
                        type: 'Checkbox'
                    }
                },
                fieldsets: [
                    'showModal',
                    {
                        template   : 'ModalTemplate',
                        conditional: 'showModal',
                        legend     : 'hello',
                        fields     : ['test'],
                        buttons    : [{
                            label : 'Cancel',
                            name  : 'showModal',
                            value : false,
                            action: 'close'
                        }, {
                            label: 'Click Me',
                            name : 'showModal',

                            primary: true,
                            action : 'submit'
                        }]
                    }
                ]
            }} valueManager={valueManager} loader={loader}/>, true);


            const checkbox = (checked = true) => check(
                byComponent(form, Checkbox), checked);
            const cancel   = () => click(form.find(ButtonTemplate).at(0));
            const submit   = () => click(form.find(ButtonTemplate).at(1));
            const close    = () => click(form.find('.close'));
            const text     = (value) => change(form.find(Text), value);
            const value    = (path, expected) => {
                const v = valueManager.path(path);
                if (expected != null) {
                    return expect(v).to.eql(expected);
                }
                return expect(v).to.not.exist;

            };
            checkbox();
            submit();
            expect(valueManager.getErrors().test).to.have.length(1);

            cancel();

            value('test', null);

            checkbox();

            text('goodbye');

            submit();

            value('test', 'goodbye');

            checkbox();

            text('goodbye world');

            value('test', 'goodbye world');

            cancel();

            value('test', 'goodbye');

            checkbox();

            text('goodbye world');

            close();

            value('test', 'goodbye');

            checkbox();

            text('gonna click it');

            //closes it tests unstash on destroy
            checkbox(false);

            value('test', 'goodbye');

        });
    it('should render template with and submit very minimal',
        function () {
            //loader, schema, Subschema, React
            const { valueManager, loader, Form, ValueManager } = newSubschemaContext();
            loader.addTemplate(templates);
            const onSubmit = (e, err, value) => {
                e && e.preventDefault();
            };
            const form     = into(<Form onSubmit={onSubmit} schema={{
                schema   : {
                    test : {
                        type      : 'Text',
                        validators: ['required']
                    },
                    other: 'Text'
                },
                fieldsets: [
                    {
                        template   : 'ModalTemplate',
                        conditional: 'showModal',
                        fields     : ['test']
                    },
                    'other'
                ]
            }} loader={loader} valueManager={valueManager}/>, true);


            const checkbox = (checked = true) => {
                valueManager.update('showModal', checked);
                form.update();
            };

            const cancel = () => {
                click(form.find(ButtonTemplate).at(0));
                form.update();
            };
            const submit = () => {
                const btn = form.find(ButtonTemplate).at(1);
                click(btn);
                form.update();
            };
            const close  = () => {
                click(form.find('.close'));
                form.update();
            };
            const text   = (value) => {
                change(form.find(Text).at(0), value);
                form.update();
            };
            const value  = (path, expected) => {
                const v = valueManager.path(path);
                if (expected != null) {
                    return expect(v).to.eql(expected);
                }
                return expect(v).to.not.exist;

            };
            checkbox();
            submit();
            expect(valueManager.getErrors().test).to.have.length(1);

            cancel();

            value('test', null);

            checkbox();

            text('goodbye');

            submit();

            value('test', 'goodbye');

            checkbox();

            text('goodbye world');

            value('test', 'goodbye world');

            cancel();

            value('test', 'goodbye');

            checkbox();

            text('goodbye world');

            close();

            value('test', 'goodbye');

            checkbox();

            text('gonna click it');

            //closes it tests unstash on destroy
            checkbox(false);

            value('test', 'goodbye');

        });

    it('should render as a field template',
        function () {
            //loader, schema, Subschema, React
            const { valueManager, loader, Form, ValueManager } = newSubschemaContext();
            loader.addTemplate(templates);
            const onSubmit = (e, err, value) => {
                e && e.preventDefault();
            };
            const form     = into(<Form onSubmit={onSubmit} schema={{
                schema   : {
                    hello    : {
                        type       : 'Object',
                        template   : 'ModalTemplate',
                        conditional: 'showModal',
                        validators : ['required'],
                        title      : 'Hello From Title',
                        fields     : ['test'],
                        subSchema  : {
                            schema: {
                                test: {
                                    type      : 'Text',
                                    validators: ['required']
                                }
                            }
                        }
                    },
                    showModal: 'Checkbox'
                },
                fieldsets: [
                    'hello',
                    'showModal'
                ]
            }} valueManager={valueManager} loader={loader}/>, true);


            const checkbox = (checked = true) => {
                valueManager.update('showModal', checked);
                form.update();
            };

            const cancel = () => {
                click(form.find(ButtonTemplate).at(0));
                form.update();
            };
            const submit = () => {
                const btn = form.find(ButtonTemplate).at(1);
                click(btn);
                form.update();
            };
            const close  = () => {
                click(form.find('.close'));
                form.update();
            };
            const text   = (value) => {
                change(form.find(Text).at(0), value);
                form.update();
            };
            const value  = (path, expected) => {
                const v = valueManager.path(path);
                if (expected != null) {
                    return expect(v).to.eql(expected);
                }
                return expect(v).to.not.exist;

            };

            checkbox();
            submit();
            // expect(context.valueManager.getErrors()['hello.test'].length).to.eql(1);

            cancel();
            value('test', null);

            checkbox();

            text('goodbye');

            submit();

            value('hello.test', 'goodbye');

            checkbox();

            text('goodbye world');

            value('hello.test', 'goodbye world');

            cancel();

            value('hello.test', 'goodbye');

            checkbox();

            text('goodbye world');

            close();

            value('hello.test', 'goodbye');

            checkbox();

            text('gonna click it');

            //closes it tests unstash on destroy
            checkbox(false);

            value('hello.test', 'goodbye');

        });
});
