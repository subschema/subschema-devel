import React from 'react';
import Plugin, {
    DownloadButton, ProjectWizard, schema
} from 'subschema-plugin-playground';
import { change, click, expect, into } from 'subschema-test-support';
import { newSubschemaContext } from 'subschema';


const withTag = (node, tag) => node.find(tag);

//disables transitions so tests run faster (10x faster), by not waiting for
// transitions.
schema.template = {
    "template"        : "WizardTemplate",
    "transition"      : false,
    transitionForward : false,
    transitionBackward: false
};

describe.only('subschema-plugin-playground/project', function () {
    this.timeout(50000);

    let b;

    function sleep(time, value) {
        return new Promise(resolve => setTimeout(resolve, time, value));
    }


    const oOpen = DownloadButton.open;

    function test$open(blob, filename, callback) {
        b = blob;
        expect(blob).to.exist;
        expect(filename).to.exist;
        //   oOpen(blob, filename, callback);
    }

    const _ctx = newSubschemaContext();
    _ctx.loader.loaderType("Example");
    _ctx.loader.addLoader(Plugin);

    beforeEach(function () {
        DownloadButton.open = test$open;
        app && app.unmount();

    });
    let app;

    _ctx.loader.listExamples().slice(0,1).forEach(function ({ name: value }) {
        // ['Autocomplete'].forEach(value=>{
        it(`should change the option ${value}`, async function () {
            app = into(<ProjectWizard loader={_ctx.loader}/>, true);
            change(app.find('select'), value, app);

            click(app.find('button').at(0), app);

            click(app.find('button').at(1), app);

            const downloadBtn = app.find('button').at(1);

            expect(downloadBtn.text().trim()).to.eql('Preview');

            click(downloadBtn, app);

            await sleep(500);


            return new Promise((resolve, reject) => {
                const url     = URL.createObjectURL(b);
                const other   = window.open(url);
                let hasError  = false;
                other.onerror = function (e) {
                    console.log('errror for ', value, e);
                    console.trace(e);
                    hasError = e;
                    //     other.close();
                    reject(e);
                };

                other.addEventListener("DOMContentLoaded", (event) => {
                    if (!hasError) {
                        event.currentTarget.close();
                        resolve();
                    }
                }, false);
            });
        });
    });
});

