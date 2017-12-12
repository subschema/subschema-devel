import React from 'react';
import { newSubschemaContext } from 'subschema';
import {into} from '../support';
import {expect} from 'chai';

describe("subschema-plugin-project/samples/FieldSetConditional", function () {
    this.timeout(50000);
    it('should render', function (done) {
        const schema                         = {
            schema   : {
                phoneOrEmail: {
                    type   : 'Radio',
                    title  : false,
                    options: [{
                        label: "Phone",
                        val  : "phone"
                    }, { label: "Email", val: "email" }],
                },
                "phone"     : {
                    "type": "Text"
                },
                "canWePhone": "Checkbox",
                "canWeEmail": "Checkbox",
                "email"     : {
                    "type": "Text"
                }
            },
            fieldsets: [
                {
                    legend: "Would you prefer us contact you via?",
                    fields: "phoneOrEmail"
                },
                {
                    legend     : "Phone",
                    buttons    : ["Call Me"],
                    fields     : ["phone", "canWePhone"],
                    conditional: {
                        listen    : "phoneOrEmail",
                        operator  : "==",
                        value     : "phone",
                        transition: "rollUp"

                    }
                },
                {
                    legend     : "Email",
                    buttons    : ["Email Me"],
                    fields     : ["email", "canWeEmail"],
                    conditional: {
                        listen    : "phoneOrEmail",
                        operator  : "==",
                        value     : "email",
                        transition: "rollUp"
                    }
                }]
        };
        const { Form, loader, valueManager } = newSubschemaContext();
        const FieldSetTemplate               = loader.loadTemplate(
            'FieldSetTemplate');
        const form                           = into(<Form schema={schema}/>,
            true);
        expect(form.find(FieldSetTemplate)).to.have.length(1);
        valueManager.update('phoneOrEmail', 'phone');

        setTimeout(() => {
            expect(form.find(FieldSetTemplate)).to.have.length(1);
            done();
        }, 1000);
    });
});
