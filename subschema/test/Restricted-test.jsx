import React from 'react';
import { change, into } from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';
import {expect} from 'chai';


describe('subschema/Restricted', function () {

    it('should work within a Form', function () {
        const { Form, valueManager } = newSubschemaContext();
        const schema                 = {
            schema: {
                'test': {
                    type     : 'Restricted',
                    formatter: '###-##'
                }
            }
        };

        const form = into(<Form valueManager={valueManager}
                                schema={schema}/>);

        const restricted = form.find('input');

        change(restricted, '1');
        expect(valueManager.path('test')).to.eql('1',
            'should update value manager');
        change(restricted, '123');
        expect(valueManager.path('test')).to.eql('123-',
            'should update value manager');
        change(restricted, '123-4');
        expect(valueManager.path('test')).to.eql('123-4',
            'should update value manager');
    })
})
