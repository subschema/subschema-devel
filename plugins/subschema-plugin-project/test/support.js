import React                 from 'react';
import Loader                from 'subschema-plugin-autoloader';
import {newSubschemaContext} from 'subschema';
import {compile, source}     from 'subschema-plugin-project';
import {expect}              from 'chai';
import {mount}               from 'enzyme';

export const samples = Loader.listExamples().reduce((ret, {name, value}) => {
    ret[name] = value;
    return ret;
}, {});


export const into = (node, attachTo) => {
    if (attachTo === true) {
        attachTo = document.createElement('div');
        document.body.appendChild(attachTo);
        return mount(node, {attachTo});
    }
    return mount(node, attachTo);
};

export function execMock(gen) {
    const exports = {};

    new Function(['exports', 'require'], gen.code)(exports,
        newSubschemaContext().importer);
    return exports.default;
}

const noop = function () {

};

export function setupFunc(sample, Subschema = newSubschemaContext(), module) {
    if (!(sample && sample.setupTxt)) {
        //empty
        return noop;
    }

    const gen = compile(source({useData: false, useErrors: false, sample}, null));

    const funcBody = `${gen.code}  
        return {schema:schema, loader:loader, valueManager:valueManager}`

    try {
        const newFunc = new Function(['require', 'loader', 'schema', 'Subschema', 'React', 'valueManager'], funcBody);
        const ret     = newFunc(Subschema.importer, Subschema.loader, sample.schema,
            Subschema,
            React,
            Subschema.valueManager);
        if (ret.loader !== Subschema.loader) {
            Subschema.loader.addLoader(ret.loader);
            ret.loader = Subschema.loader;
        }
        return ret;
    } catch (e) {
        console.warn('func failed', e);
        throw e;
    }
}


export function renderPage(sample, verify) {
    const Subschema                    = newSubschemaContext();
    const {loader, Form, ValueManager} = Subschema;
    const ds                           = setupData(sample),
          src                          = compile(source(ds)).code;

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
