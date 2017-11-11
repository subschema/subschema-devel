import React from 'react';
import Subschema, { newSubschemaContext as _newSubschemaContext } from './init';

export const newSubschemaContext       = _newSubschemaContext;
export const injector                  = Subschema.injector;
export const valueManager              = Subschema.valueManager;
export const loader                    = Subschema.loader;
export const Form                      = Subschema.Form;
export const injectorFactory           = Subschema.injectorFactory;
export const RenderTemplate            = Subschema.RenderTemplate;
export const RenderContent             = Subschema.RenderContent;
export const loaderFactory             = Subschema.loaderFactory;
export const Conditional               = Subschema.Conditional;
export const Field                     = Subschema.Field;
export const FieldSet                  = Subschema.FieldSet;
export const Dom                       = Subschema.Dom;
export const PropTypes                 = Subschema.PropTypes;
export const ValueManager              = Subschema.ValueManager;
export const css                       = Subschema.css;
export const tutils                    = Subschema.tutils;
export const validators                = Subschema.validators;
export const warning                   = Subschema.warning;
export const transitions               = Subschema.transitions;
export const processors                = Subschema.processors;
export const styles                    = Subschema.styles;
export const resolvers                 = Subschema.resolvers;
export const SUBSCHEMA_VERSION         = process.env.SUBSCHEMA_VERSION;

export default Subschema;
