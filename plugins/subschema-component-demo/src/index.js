import React from "react";

import _Example from "./Example.jsx";
import _DynamicSchema from "./DynamicSchema";
import _UpdateValue from "./UpdateValue.jsx";
import _NewProject from "./NewProject";
import _Doc from "./Doc";
import _loader from "./loader";
import PropTypes from './PropTypes';


export const DynamicSchema = _DynamicSchema;
export const Example       = _Example;
export const UpdateValue   = _UpdateValue;
export const NewProject    = _NewProject;
export const Doc           = _Doc;

export const resolvers = new Map([[PropTypes.loader, _loader]]);

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
