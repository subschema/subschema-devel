
The schema for subschema was originally based on the schema used by [backbone forms](https://github.com/powmedia/backbone-forms),  while still being mostly compatible it has diverged. 

Schemas have 2 sections, the first section "schema", defines fields. The second defines fieldsets.

## Injection - 
Subschema magic happens through propType injection.  The rules are pretty simple.

Example Component:

```js static
import React, {Component} from 'react';
import ReactPropTypes from 'prop-types';
import PropTypes from 'subschema-prop-types';

export default class Example extends Component {
    //Analogous to propTypes:
    //These allow for components to have 
    // extended functionality with subschema, 
    // without breaking existing propTypes.
    static injectedPropTypes = {
        express:PropTypes.expression
    };
    //Analogous to defaultProps.
    static injectedProps = {
        value:'a world'  ,
        express:'{path} to enlightment'
    };
    //Or you can just put them here.
    static propTypes = {
        hey:ReactPropTypes.string,
        there:PropTypes.value
          
    };
    static defaultProps = {
        its:'default value'
    };
    
}



```
 
 
 * If a injectedProp exists on a target omponent and matches against a "resolver", pass to the resolver for injection.
 * If a injectedProp exists on a target component and does not match a resolver, than pass directly.
 * If a propType exists on a target component and matches against a "resolver", pass to the resolver for injection.
 * If a propType exists on a target component and does not match a resolver, than pass directly.
 * If a defaultProp exists on a target component, pass the property.
 * If no match, than don't pass it to target component.


These rules hold true for all components injected by Subschema.

## Field
A field in subschema defines a type and optionally a template, validator for the field.
```js static
schema:{
[path]:{ //<-- the path is what the data will be named.
    //required
    type:'Text', //<- This is the "Type" it can be an object with {type:'Text'} also if there are configurations,
               //that conflict with the definition of a field.
    //optional
    template:'EditorTemplate', //<-- This is the "Field" template, usually handles errors and wraps a type. it can be an object if
                //something needs to be configured sepeartely.
               //{
               // template:'EditorTemplate'
               //}
               //false - and no template will be used.
    //optional
    validators:['required'] //<!-- this is usually an array of registered validators, you can however pass options,
               //[{type:'required', message:'Your Custom Message'}]
    //optional
    conditional:{listen:'<path>', dismiss:'<path>', operator:'truthy'} //<-- this allows for a field to be conditionally displaed          
    
    //all other props are passed to the type and the template class's.  If the name matches an entry
    // in Component.propTypes or Component.defaultProps it will be passed in.          
    ...rest           

}           
}

```

## FieldSet
A fieldset is a set of fields, the can be nested indefinitely.   They are meant to describe how you want subschema to layout
your fields.

```js static
 fieldsets:[{
    fields:Paths, //<-- fields are a comma delimited string or array of string set of fields matching the paths 
                 //described in the schema section
    template:Template,//<-- a string name of the template used to wrap fields
    conditional:Conditional,// <-- weather to show it or not
      //all other props are passed to the type and the template class's.  If the name matches an entry
      // in Component.propTypes or Component.defaultProps it will be passed in to template.          
    fieldsets:[FieldSet],//<-- recursively define fieldsets.
    ...rest
 }]

```

## Template
A template is a component that accepts Fields (children) and renders them.  They are injected and can have other behaviour.
FieldSet Templates do not have a "path".
 * {string} name of a template from the loader.
 * {object} with the property template, that is loaded, extra properties are passed to said template.

## Field
A field is a type in the schema, they have a "Path", and optionally a template.  Can be a string or an object with
a string type field.
 * {string} name of a type from the loader.
 * {object} with a field type, the rest of the fields are passed into the Type (if allowed by proptypes/defaultProps)

Basic Example Schema:

```js static
{
  schema:{
    //If a string is given as the value to a schema key, than it is treated as {type:<string>} or in this case
    // {type:"Text"}
    firstName:"Text"
  }
}


```
Example with fieldsets.
```js static

{
  schema:{
    "firstName":"Text",
    "lastName":{
       //long form type declaration so we can have validators
       "type":"Text",
       //This adds a required validator with a custom message
       "validators":[{"type":"required", message:"Last Name is required"}]
    },
    "age":"Number"
 },
 fieldsets:[{
   "legend":"Name",
   //if you wanted firstName, lastName in the same grouping.
   "fields":"firstName,lastName"
  },
  {
   "legend":"Age",
   "fields":"age"
 }]
}
```



