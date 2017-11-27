import React from "react";
import { render } from "react-dom";
import { loader, ValueManager } from "subschema";
import Index from "./IndexPage.jsx";
import schema from "./schema.json";
import createHistory from "history/createHashHistory";
import { DynamicSchema } from "subschema-plugin-demo";
import docs from "subschema.wiki";
import {NavigationForm} from 'subschema-plugin-navigation';
import "subschema-transitions/lib/style.css";
//import "./sample.lessp";
const history = createHistory({
    hashType: 'slash' // Google's legacy AJAX URL format

});
loader.addType({ Index });
loader.loaderType('Example');
loader.loaderType('Doc');
loader.addDocs(docs);

const valueManager = ValueManager({
    samples         : loader.listExamples().map(v => {
        if (v.value && !v.value.name) {
            v.value.name = v.name;
        }
        return v.name

    }),
    docs            : loader.listDocs().filter(v => v.name !== 'Home').map(
        v => ({ name: v.name, label: v.name.replace(/_/g, ' ') })),
    subschemaVersion: process.env.SUBSCHEMA_VERSION,
    schema
});

const handleSubmit = (e, error, value) => {
    e && e.preventDefault();

    valueManager.update('submit', { error, value })
};

render(<NavigationForm valueManager={valueManager} history={history}
                       schema={"schema"}
                       ObjectType={DynamicSchema}
                       loader={loader}
                       onSubmit={handleSubmit}
                       template="FieldSetTemplate"/>,
    document.getElementById('content'));
