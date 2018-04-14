import React from 'react';
import { loader, ValueManager } from 'subschema';
import Index from './IndexPage.jsx';
import schema from './schema.json';
import createHistory from 'history/createHashHistory';
import { DynamicSchema } from 'subschema-plugin-demo';
import { NavigationForm } from 'subschema-plugin-navigation';
import 'subschema-transitions/lib/style.css';
//import "./sample.lessp";
const history = createHistory({
    basename: '',
    hashType: 'slash' // Google's legacy AJAX URL format

});
loader.addType({ Index });
loader.loaderType('Example');
loader.loaderType('Doc');
const typeToOption = ({ name: label }) => ({
    label,
    val: label
});

const docs    = loader.listDocs().map(({ name: val }) => ({
    val,
    label: val.replace(/_/g, ' ')
}));
const samples = loader.listExamples().map(typeToOption);

const valueManager = ValueManager({
    samples,
    docs,
    subschemaVersion: process.env.SUBSCHEMA_VERSION,
    schema
});

const handleSubmit = (e, error, value) => {
    e && e.preventDefault();

    valueManager.update('submit', { error, value })
};

export default function App() {
    return (<NavigationForm valueManager={valueManager} history={history}
                            schema={'schema'}
                            ObjectType={DynamicSchema}
                            loader={loader}
                            onSubmit={handleSubmit}
                            template="FieldSetTemplate"/>);
}
