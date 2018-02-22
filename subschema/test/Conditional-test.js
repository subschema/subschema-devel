import React from 'react';
import {
    byType, byTypes, expect, into, intoWithContext, notByType, select
} from 'subschema-test-support';
import PropTypes from 'subschema-prop-types';
import { Conditional as _Conditional } from 'subschema-plugin-conditional';
import { newSubschemaContext } from 'subschema';
import { Select } from 'subschema-plugin-type-select';

class Hello extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}

describe('components/Conditional', function () {
    let Conditional;
    let loader;
    let injector;
    let Form;
    let context;
    let valueManager;
    let ValueManager;

    beforeEach(function () {
        const {
                  ValueManager: ValueManager_,
                  Form        : Form_,
                  ...context_
              }      = newSubschemaContext();
        context      = context_;
        loader       = context.loader;
        injector     = context.injector;
        valueManager = context.valueManager;
        Form         = Form_;
        ValueManager = ValueManager_;
        Conditional  =
            injector.inject(_Conditional);
        loader.addTemplate({
            Hello
        });
    });

    const schema = {
        'menu'     : {
            type   : 'Radio',
            options: ['this', 'that', 'other']
        },
        'otherMenu': {
            type   : 'Radio',
            options: ['this', 'that', 'other']
        },
        'this'     : {
            type       : 'Text',
            conditional: 'menuConditional'
        },
        'that'     : {
            type       : 'Text',
            template   : 'FloatingLabel',
            conditional: {
                operator: !/stuf(f)/,
                value   : 'other',
                listen  : 'otherMenu'
            }
        }


    };
    it('should render conditional with regex', function () {
        const cond = intoWithContext(<Conditional template='Hello'
                                                  animate={false} path='hot'
                                                  operator={/stuff/}/>,
            { valueManager, loader, injector },
            false);
        notByType(cond, Hello);
        valueManager.update('hot', 'stuff');
        cond.update();
        byType(cond, Hello);
        valueManager.update('hot', 'cold');
        cond.update();
        notByType(cond, Hello);

    });
    it('should render conditional with negated regex', function () {
        const vm   = valueManager;
        const cond = intoWithContext(<Conditional template='Hello'
                                                  animate={false} path='hot'
                                                  operator={'!/stuff/i'}/>,
            { valueManager, loader, injector }, false, PropTypes.contextTypes);
        byType(cond, Hello);
        vm.update('hot', 'stuff');
        cond.update();
        notByType(cond, Hello);
        vm.update('hot', 'ColDd');
        cond.update();
        byType(cond, Hello);

    });

    it('should render conditional with str regex', function () {
        const cond = intoWithContext(<Conditional template={Hello}
                                                  animate={false}
                                                  path='hot'
                                                  operator='/stuff/i'
        />, context, false);
        notByType(cond, Hello);
        valueManager.update('hot', 'stuff');
        cond.update();
        byType(cond, Hello);
        valueManager.update('hot', 'ColDd');
        cond.update();
        notByType(cond, Hello);

    });

    it('should render conditional with null', function () {
        const cond = intoWithContext(<Conditional template={'Hello'}
                                                  animate={false} path='hot'
        />, context, false);
        notByType(cond, Hello);
        valueManager.update('hot', 'stuff');
        cond.update();

        byType(cond, Hello);
        valueManager.update('hot', null);
        cond.update();

        notByType(cond, Hello);

    });
    it('should render children or not', function () {
        const cond = intoWithContext(<Conditional animate={false} path='hot'
        ><Hello/></Conditional>, context, false);

        notByType(cond, Hello);
        valueManager.update('hot', 'stuff');
        cond.update();
        byType(cond, Hello);

        valueManager.update('hot', null);
        cond.update();
        notByType(cond, Hello);

    });

    describe('ModelAndMake', function () {
        const schema = {
            "schema"   : {
                "make" : {
                    "title"      : "Make",
                    "type"       : "Select",
                    "placeholder": "Select a make",
                    "options"    : [{
                        "label": "AMC",
                        "val"  : "amc"
                    }, { "label": "Buick", "val": "buick" }]
                },
                "model": {
                    "title"      : "Model",
                    "type"       : "Select",
                    "placeholder": "Select a make first",
                    "conditional": { "listen": "make", "operator": "falsey" }
                },
                "amc"  : {
                    "title"      : "Model of AMC",
                    "conditional": {
                        "listen"  : "make",
                        "value"   : "amc",
                        "operator": "===",
                        path      : "model"
                    },
                    "type"       : "Select",
                    "placeholder": "Select a model of AMC",
                    "options"    : ["AMX", "Concord", "Eagle", "Gremlin", "Matador", "Pacer"]
                },
                "buick": {
                    "title"      : "Model of Buick",
                    "conditional": {
                        "listen"  : "make",
                        "value"   : "buick",
                        "operator": "===",
                        path      : "model"
                    },
                    "type"       : "Select",
                    "placeholder": "Select a model of Buick",
                    "options"    : ["LeMans", "Skylark"]
                }

            },
            "fieldsets": [{
                "legend": "Make And Model Linked Selects",
                "fields": ["make", "model", "amc", "buick"]
            }]
        };
        it('should render make and model', function () {
            const form    = into(<Form schema={schema}/>, true);
            const selects = byTypes(form, Select);

            expect(selects).to.have.length(2, 'Should have 2 selects');
            select(selects.at(0), 2);
            /*
             var selects = byTypes(form, Select);
             select(selects[1], 1);
             expect(selects[1].props.placeholder).toBe('Select a model of AMC', 'should update placeholder');


             expect(valueManager.path('model')).toBe('AMX', 'should update the model');*/


        })
    })
});

