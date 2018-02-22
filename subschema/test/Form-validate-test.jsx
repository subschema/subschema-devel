import React from "react";
import {expect} from 'chai';
import {renderToString} from "react-dom/server";
import {newSubschemaContext} from 'subschema';

describe('subschema-core/Form#validate', function () {
    it('should validate a form on init isomorphically', function () {
        this.timeout(50000);
        const {Form} = newSubschemaContext();
        const schema = {
            test: {
                type: 'Text',
                validators: ['required']

            }
        };
        const content = renderToString(<Form schema={{schema}} value={{}} validate={true}/>);
        expect(content).to.match(/Required/);
    });

    it('should not validate a form on init isomorphically', function () {
        this.timeout(50000);
        const {Form} = newSubschemaContext();
        const schema = {
            test: {
                type: 'Text',
                validators: ['required']

            }
        };
        const content = renderToString(<Form schema={{schema}} value={{}}/>);
        expect(content).not.to.match(/Required/);
    });

    it('should not validate a form on init isomorphically but passed an error', function () {
        this.timeout(50000);
        const schema = {
            test: {
                type: 'Text',
                validators: ['required']

            }
        };
        const {Form} = newSubschemaContext();
        const content = renderToString(<Form schema={{schema}} value={{}} errors={{test: [{message: 'Super'}]}}
                                             validate={true}/>);
        expect(content).not.to.match(/Required/);
        expect(content).to.match(/Super/);
    });

    it('should not validate a form on init isomorphically but passed an error without validate', function () {
        this.timeout(50000);
        const schema = {
            test: {
                type: 'Text',
                validators: ['required']

            }
        };
        const {Form} = newSubschemaContext();
        const content = renderToString(<Form schema={{schema}} value={{}} errors={{test: [{message: 'Super'}]}}/>);
        expect(content).not.to.match(/Required/);
        expect(content).to.match(/Super/);
    });


});
