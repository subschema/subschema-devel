import React from 'react';

import {
    byTags, expect, Form, into, Simulate, TestUtils, ValueManager, change
} from 'subschema-test-support';
import {newSubschemaContext} from 'subschema';
import { Checkboxes } from 'subschema-plugin-type-checkboxes';

describe('subschema/Checkboxes', function () {
    this.timeout(50000);
    it('should create checkboxes', function () {
        const {
                  Form,
                  valueManager
              } = newSubschemaContext();

        const root       = into(<Form valueManager={valueManager} schema={{
            schema: {
                group1: {
                    options: ['one', 'two', 'three'],
                    type   : 'Checkboxes'
                }

            }
        }}/>, true);
        const checkboxes = root.find('input[type="checkbox"]');

        expect(checkboxes.length).to.eql(3);
        const cb0 = checkboxes.at(0);
        cb0.simulate('change', {
            target: {
                checked: true,
                value  : 'one'
            }
        });
        expect(valueManager.path('group1.0')).to.eql('one');

    });

    it('should create checkboxes in groups', function () {
        const {
                  valueManager,
                  Form
              } = newSubschemaContext();

        var root         = into(<Form valueManager={valueManager} schema={{
            schema: {
                groupsOfGroups: {
                    title  : 'Group of Groups',
                    options: [
                        {
                            group: 'North America', options: [
                                { val: 'ca', label: 'Canada' },
                                { val: 'us', label: 'United States' }
                            ]
                        },
                        {
                            group: 'Europe', options: [
                                { val: 'es', label: 'Spain' },
                                { val: 'fr', label: 'France' },
                                { val: 'uk', label: 'United Kingdom' }
                            ]
                        }
                    ],
                    type   : 'Checkboxes'
                }


            }
        }}/>, true);
        const checkboxes = byTags(root, 'input');
        expect(checkboxes).to.have.length(5)
        expect(byTags(root, 'legend')).to.have.length(2);
    });


});
