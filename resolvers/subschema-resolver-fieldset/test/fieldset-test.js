import React, {Component} from 'react';
import {expect} from 'chai';
import PropTypes from 'subschema-prop-types';
import {intoWithContext, byComponent, findNode, change} from 'subschema-test-support';
import injectorFactory from 'subschema-injection/lib/injectorFactory';
const injector = injectorFactory();
import {fieldset} from 'subschema-resolver-fieldset';
import {normalizeFieldsets} from 'subschema-resolver-fieldset';

describe('resolvers/fieldset', function () {
    this.timeout(50000);
    const propTypes = {
        fieldsets: PropTypes.fieldset
    };

    injector.resolver(PropTypes.fieldset, fieldset);

    it('should normalize fieldsets', function () {
        class TargetTest extends Component {
            static propTypes = propTypes;

            render() {
                return <span>hello</span>
            }
        }
        const Injected = injector.inject(TargetTest);
        const inst = intoWithContext(<Injected fieldsets={[{
            fields: 'a,b',
            fieldsets: [{
                className: 'stuff'
            },
                {
                    fields: 'c,d'
                }
            ]
        }]}/>, {}, true);

        const et = byComponent(inst, TargetTest);

        expect(et.prop('fieldsets').fields).to.have.length(2);

    });
    it('should normalize fieldsets deep', function () {
        class TargetTest extends Component {
            static propTypes = propTypes;

            render() {
                return <span>hello</span>
            }
        }
        const Injected = injector.inject(TargetTest);
        const inst = intoWithContext(<Injected fieldsets={[{
            fieldsets: [{
                className: 'stuff',
                fields: 'a,b',
            },
                {
                    fields: 'c,d'
                },
                {
                    fieldsets: {
                        fields: 'e,f',
                        className: 'joe'
                    }
                }
            ]
        }]}/>, {}, true);

        const et = byComponent(inst, TargetTest);
        const fs = et.prop('fieldsets');
        expect(fs.fields).to.eql('abcdef'.split(''));
        expect(fs.fieldsets[0].fieldsets[0].className).to.eql('stuff');
    });
    //TODO - reenable.
    describe('should normalize fields and fieldsets', function () {
        it('should normilize fieldsets', function () {
            var inFieldsets = [{
                fields: ['a', 'b', 'c']
            }, {
                fields: ['d', 'e', 'f']
            }];
            var {fields} = normalizeFieldsets(inFieldsets, null, {fieldsets: []}, context);
            expect(fields).to.eql(['a', 'b', 'c', 'd', 'e', 'f']);
        });
        it('should normilize string fieldsets', function () {
            var inFieldsets = [{
                fields: 'a, b, c'
            }, 'd, e, f'
            ];
            var {fieldsets, fields} = normalizeFieldsets(inFieldsets, null, {}, context);
            expect(fields).to.eql(['a', 'b', 'c', 'd', 'e', 'f']);
            expect(fieldsets[0].fields).to.eql(['a', 'b', 'c']);
            expect(fieldsets[1].fields).to.eql(['d', 'e', 'f']);
        });

        it('should normalize nested fieldsets', function () {
            var inFieldsets = [{
                fieldsets: [
                    {fields: 'a'},
                    {fields: 'b'},
                    {fields: 'c'}]
            }, 'd, e, f'
            ];
            var {fieldsets, fields} = normalizeFieldsets(inFieldsets, null, {}, context);
            expect(fields).to.eql(['a', 'b', 'c', 'd', 'e', 'f']);
            expect(fieldsets[0].fieldsets[0].fields).to.eql(['a']);
            expect(fieldsets[0].fieldsets[1].fields).to.eql(['b']);
            expect(fieldsets[0].fieldsets[2].fields).to.eql(['c']);
        });
        it('should normalize nested fieldsets with fieldsets', function () {
            var inFieldsets = [{
                fieldsets: [
                    {fieldsets: [{fields: 'a'}]},
                    {fieldsets: [{fields: 'b'}]},
                    {fields: 'c'}]
            }, 'd, e, f'
            ];
            var {fieldsets, fields} = normalizeFieldsets(inFieldsets, null, {}, context);
            expect(fields).to.eql(['a', 'b', 'c', 'd', 'e', 'f']);
            expect(fieldsets[0].fieldsets[0].fieldsets[0].fields).to.eql(['a']);
            expect(fieldsets[0].fieldsets[1].fieldsets[0].fields).to.eql(['b']);
        });

    });
});
