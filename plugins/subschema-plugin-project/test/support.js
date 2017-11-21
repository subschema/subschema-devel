import React, { Component } from 'react';
import samples from 'subschema-test-samples';
import { newSubschemaContext } from 'subschema';
import { compile, source } from 'subschema-project';
import { into as _into } from 'subschema-test-support';
import { expect } from 'chai';

export const into = _into;

export function execMock(gen) {
    const exports = {};

    new Function(['exports', 'require'], gen.code)(exports,
        newSubschemaContext().importer);
    return exports.default;
}

const noop = function () {

};

export function setupFunc(sample, Subschema = newSubschemaContext()) {
    if (!(sample && sample.setupTxt)) {
        //empty
        return noop;
    }

    const gen = compile(
        source({ useData: false, useErrors: false, sample }, null));

    return (new Function(
        ['require', 'loader', 'schema', 'Subschema', 'React', 'valueManager'],
        `${gen.code}  
        return {schema:schema, loader:loader, valueManager:valueManager}`
    ))(Subschema.importer, Subschema.loader, sample.schema, Subschema, React,
        Subschema.valueManager);

}


export function renderPage(sample, verify) {
    const Subschema                      = newSubschemaContext();
    const { loader, Form, ValueManager } = Subschema;
    const ds                             = setupData(sample),
          src                            = compile(source(ds)).code;

    const f       = new Function(['render', 'require', 'document'], src);
    let didRender = false;
    f(function (node) {
        didRender = true;
        verify(node);
    }, Subschema.importer, {
        getElementById(id) {
            expect(id).to
                      .eql('content', 'document.getElementById was "content"');
        }
    });
    expect(didRender).to.eql(true, 'Should have called the render method');
}

export async function testEachSample(fn, samplesKeys = Object.keys(samples)) {
    samplesKeys =
        Array.isArray(samplesKeys) ? samplesKeys : samplesKeys == null ? []
            : [samplesKeys];
    samplesKeys.forEach(async function (sample) {
        await fn(setupData(samples[sample]), sample);
    });
}

export function setupData(sample) {
    return {
        schema : {},
        title  : 'Hello',
        demo   : 'what',
        jsName : 'uhhu',
        project: {
            name: 'hello'
        },
        sample
    }
}

export default {
    into,
    renderPage,
    testEachSample,
    execMock,
    setupData
}
