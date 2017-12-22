import React from 'react';
import {
    DownloadButton, SubschemaPlayground
} from 'subschema-plugin-playground';
import { expect, into } from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';


describe('subschema-plugin-playground/playground', function () {
    let ctx;
    let loader;
    let injector;
    let Form;
    const _loader = newSubschemaContext().loader;
    _loader.loaderType('Example');


    beforeEach(() => {
        ctx      = newSubschemaContext();
        loader   = ctx.loader;
        injector = ctx.injector;
        Form     = ctx.Form;

    });
    _loader.listExamples().forEach(function ({ name: key }) {
        it(`should load into playground playground/${key}`,
            function () {
                const sample = _loader.loadExample(key);

                const InjectedSubschemaPlayground = injector.inject(
                    SubschemaPlayground);

                const sp = into(
                    <Form template='ObjectTemplate'
                          injector={injector}
                          loader={loader}
                          schema={{}}><InjectedSubschemaPlayground {...sample} /></Form>,
                    true);

                expect(sp.find(SubschemaPlayground),
                    `Subschema Playground should exist ${key}`).to.have
                                                               .length(1);
            });
    });
});
