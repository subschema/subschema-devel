"use strict";
/**
 * Sanity test to ensure everything will work/render server side.
 *
 * One day sample tests will be moved to subschema-test-support and somehow testable
 * server/client.  Until then....
 */
require('source-map-support').install();
const React = require('react');
const ReactServer = require('react-dom/server');
const expect = require('expect');
const {samples} = require('../samples');
const setupFunc = require('../support').setupFunc;

describe('subschema-plugin-project/server', function () {
    ['First', 'Second'].forEach(function (key) {
        describe(key + ' Run', function () {
            const subschema = require('../dist/subschema-server.js');
            const newSubschemaContext = subschema.newSubschemaContext;

            Object.keys(samples).forEach(function (key) {
                const sample = samples[key];
                it(`render sample ${key} with data`, function () {
                    const Subschema = newSubschemaContext();
                    const ValueManager = Subschema.ValueManager;
                    const Form = Subschema.Form;
                    const loader = Subschema.loader;
                    const valueManager = ValueManager(sample.data);
                    setupFunc(sample)(Subschema.importer, sample.schema);
                    const form = ReactServer.renderToString(React.createElement(Form, {
                        schema: sample.schema,
                        loader: loader,
                        valueManager: valueManager
                    }));
                    expect(form,`form should exist for ${key}`).to.exist;
                    expect(form).to.match(/^</);
                    expect(form).to.match(/>$/);

                });
            });
        })
    });
});

