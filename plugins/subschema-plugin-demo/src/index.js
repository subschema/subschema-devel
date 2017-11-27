import React from "react";

import _Example from "./Example";
import _DynamicSchema from "./DynamicSchema";
import _UpdateValue from "./UpdateValue";
import _NewProject from "./NewProject";
import _Doc from "./Doc";
import { loader as _loader } from "./loader-resolver";


export const DynamicSchema = _DynamicSchema;
export const Example       = _Example;
export const UpdateValue   = _UpdateValue;
export const NewProject    = _NewProject;
export const Doc           = _Doc;

export const resolvers = new Map([['loader', _loader]]);

export const types     = {

    Example,
    Doc,
    UpdateValue, DynamicSchema, NewProject
};
export const templates = {

    H3(props) {
        return <h3>{props.legend || props.children}</h3>
    }
};


export default ({ types, templates, resolvers });
