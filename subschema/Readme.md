# Subschema [![Build Status](https://travis-ci.org/subschema/subschema.svg?branch=master)](https://travis-ci.org/subschema/subschema)

Create forms by  declaring the schema in JSON.  Has validation,
data update, support for server side errors, and a bunch of input types.  Easily change all your
form field layouts.

The schema is borrowed
from [backbone-forms](https://github.com/powmedia/backbone-forms).


### Example
You can see examples at [subschema.github.io/subschema](http://subschema.github.io/subschema/)



### Install

```sh
 $ npm install subschema

```
### Usage
You can use the [demo](https://subschema.github.io/subschema) to generate a skeleton
project with webpack, karma and more for getting started.

```js static
import React, {Component] from 'react';
import {Form} from 'subschema';
```

### Example
You provide the schema and subschema renders it.  Keeping the values,
and errors in check. 


```js showCode
<Form action='/submit/path'
      method='POST'
      schema={{
                  schema   : {
                      title   : { type: 'Select', options: ['Mr', 'Mrs', 'Ms'] },
                      name    : 'Text',
                      email   : { validators: ['required', 'email'] },
                      birthday: 'Date',
                      password: 'Password',
                      address : {
                          type     : 'Object',
                          subSchema: {
                              'street': {
                                  type      : 'Text',
                                  validators: ['required']
                              },
                              city    : 'Text',
                              zip     : {
                                  type      : 'Text',
                                  validators: ['required', /\d{5}(-\d{4})?/]
                              }
                          }
                      },
                      notes   : { type: 'List', itemType: 'Text' }
                  },
                  fieldsets: [
                      { legend: 'Name', fields: ['title', 'email', 'name', 'password'] },
                      {
                          legend: 'Address',
                          fields: ['address.street', 'address.city', 'address.zip']
                      }
                  ]

              }
}/>


```
## Loaders
Subschema allows for new types, validators, templates and even schemas to be registered with loaders.   To add your own 
of any of these call the corresponding add method.

See the [example](http://subschema.github.io/subschema/#/Loader)


## Schema Loader
Sometimes it is useful to reuse an exisiting schema.   We got you covered, just register your schema
and reference it as a string in anywhere an object  takes a subSchema or a schema.


Example:
This example uses 2 registered schemas, one used by the List type the other used by the form type.

```js showCode
        loader.addSchema({
            Address: {
                address: 'Text',
                city: 'Text',
                state: {
                    type: 'Select',
                    options: ['CA', 'FL', 'VA', 'IL']
                },
                zipCode: {
                    type: 'Text',
                    dataType: 'number'
                }
            },
            Contact: {
                schema: {
                    name: 'Text',
                    primary: {
                        type: 'Object',
                        subSchema: 'Address'
                    },
                    otherAddresses: {
                        canEdit: true,
                        canReorder: true,
                        canDelete: true,
                        canAdd: true,
                        type: 'List',
                        labelKey: 'address',
                        itemType: {
                            type: 'Object',
                            subSchema: 'Address'
                        }
                    }
                },
                fields: ['name', 'primary', 'otherAddresses']
            }
        });
<Form schema="Contact" loader={loader}/>
```

## Events
Events can be registered via the ValueManager.  You can subscribe to a path, a part of a path or all events of a
type. 


Example:

```js showCode
const ValueManager = require('subschema-valuemanager').default;
var values = {}, errors ={};
var vm = ValueManager(values,errors);
  //listen to all events
vm.addListener(null, function(newValue, oldValue, path){
        console.log('newValue',newValue, 'oldValue', oldValue, 'path', path);
});
vm.addListener('name', function(newValue, oldValue, path){
   //get all the values.  just for documentation sake.
   var value = vm.getValue();
});
vm.addErrorListener('name', function(e){
    console.log('error with name',e);
});

class App extends React.Component {
    handleSubmit(newValue, oldValue, property, path){
        alert('submit was called');
    }
    render(){
        return <Form schema={{schema:{name:{type:'Text',validators:['required']}}}} onSubmit={this.handleSubmit} valueManager={vm}/>
    }
};
<App/>
  
```

If you need to listen to a particular path use the PropType.


```js showCode
const PropTypes = require('subschema-prop-types').default;
class ListenToIt extends React.PureComponent {
      render(){
        return <span>Hi, {this.props.value}</span>
      }
}
ListenToIt.propTypes = {
       value:PropTypes.value
};

loader.addType({ListenToIt});


<Form schema={{
  schema:{
      name:'Text',
      listenTo:{
         type:'ListenToIt',
         value:'name',
         help:'As you type into the text field you should see it here'
      }
  }

}} loader={loader}/>

```



# Custom Types
You can add new types by adding them to the loader. You can use the default loader
at Subschema.loader or create a new loader from a loader factory.

```js static
  import {loaderFactory, DefaultLoader} from 'subschema';
  const yourLoader = loaderFactory();
  //you may want to have the default loader for the templates and types.
  yourLoader.addLoader(DefaultLoader);

  yourloader.addType(...)
  
  
  ...
  class YourApp extends Component {
  render()
  <Form loader={yourloader} ...
}
```



```js static

  loader.addType('YourType', YourType);
```
Example:



```js showCode
const {Select} = require('subschema-plugin-type-select');
const {Checkbox} = require('subschema-plugin-type-checkbox');

class CheckboxSelect extends React.Component {
       
                   constructor(...rest) {
                       super(...rest);
                       //init state
                       this.state = {disabled: false};
                   }
       
                   render() {
                       const {className, ...props} = this.props;
                       return <div className={className}>
                           <Checkbox onChange={(e)=>this.setState({disabled: !e})} checked={!this.state.disabled}/>
                           <Select {...props} disabled={this.state.disabled}/>
                           {this.state.disabled ? 'disabled' :'enabled'}
                       </div>
                   }
}
//allows for injection of the Select properties.
CheckboxSelect.propTypes =   Select.propTypes;
loader.addType('CheckboxSelect',CheckboxSelect);

<Form loader={loader} schema={{
            schema: {
                'test': {
                    type: 'CheckboxSelect',
                    options: 'first,second,third'
                }
            }}}/>

```



### Types
Subschema comes with a few built in types. You can create your own types as described elsewhere in the document.


## <a name="templates"></a>Templates
Templates are the decoration around form elements.   Templates handle the display of error messages, or the actual type themself.  Anywhere a property is described as a Template, the loader will try to resolve the corresponding string to the template.



## Validators
Validators are registered on a field as an array of strings or with configuration.
```js static
  
  loader.addValidator('super', function(options){
    return function super$validator(value, valueManager){
        if (value !== 'super'){
            return {
                message:options.message || 'Not super?',
                type:'ERROR'
            }
        }
    }
  });

  var schema = {
     schema:{
        'validateme':{
           type:'Text',
           validators:['required', 'super']
        },
        'superv':{
          type:'Text',
          validators:[{type:'super', message:'This is not super'}]
        }
     }
    fields:['validateme', 'superv']  
  }

```

## Templates
Templates are used in field definitions, fieldsets and other places.   A template
is generally not very smart, and will be passed children.    If something needs to be
smart then, it should be a Type.   

Types by default will be wrapped an EditorTemplate.   You can install a new 
EditorTemplate in the loader to change the default template for all fields.

```js static
  loader.addTemplate('EditorTemplate', //YourTemplate)

```

Or you can identify a template per field.   If template is false than no template is used
by the children are rendered.

```js static
var schema = {
      schema:{
       'myfield':{
         type:'Text',
         template:'sometemplate'
      },
      'myotherfield':{
         type:'Text',
         template:{
             template:'otherTemplate',
             className:'stuff'
         }
      },
   },
   fieldsets:[{
         legend:'Stuff',
         fields:'myfield',
         template:{
            //using content instead of a registered template.
            content:[ 'hello', {
                 children:true
            }],
            //make it conditional on myotherfield equal 'is cool'
            conditional:{
               path:'myotherfield',
               value:'is cool',
               operator:'=='
            }
         }
      }, {
        fields:'myotherfield'
      }]
   
   }
}



```

## Fieldsets
Fieldsets wrap sets of fields.   This allows for grouping of elements.  By Default the FieldSetTemplate template
is used, and if a different FieldSetTemplate is defined in a  loader that will be used.  FieldSet's can now take any
other property defined in their template.    

Fieldsets can be nested within each other allowing for fine grained grouping of types.

```js static
  var schema = {
     schema:{
       firstName:'Text',
       lastName:'Text',
       description:'Text'
     },
     fieldsets:[{
        fieldsets:[{
          fields:'firstName, lastName'
        },
        {
         fields:['description']       
        }        
     }]
  
  }  

```

## Custom Types
Subschema allows for custom types to be created.   Types are injected with the declared propTypes and defaultProps.  
The most magical bit is the onChange prop is different depending if it is PropTypes.valueEvent or PropTypes.targetEvent.
If it is a valueEvent than subschema just passes the value down to the ValueManager if it is a targetEvent, it passes
e.target.value to the valueManager.   This allows for a very simple api to create new types.

Types get passed value along with any other properties descriped in the static propTypes.  Types no longer have to 
implement anything, other than React.Component.   State is managed by the editor.


## Expression Properties
Occasionally it would be nice to bind the value of a property to the value manager.   We got you covered.  To make a 
property of a custom component you can use the substitution language used in the Content object.  As of now, none of the
default components take the expression syntax.   This may change in the future.  It would pretty easy to extend the 
propTypes on existing components to make thier values dynamic.

Example:
```js static
   
   class Anchor extends React.Component {
     static propTypes = {
       //by making this propType an expression it will evaluate it dynamically.
       href:PropTypes.expression,
       label:PropTypes.string
     };
     static defaultProps = {
       href:'/somewhere/{..page}'
     }
     render(){
       return <a href={this.props.href}>{this.props.label}</a>
     }
   }
```
  
Now the {..page} will be substituted with the page value in the valueManager. You can of course override the 
default prop in the schema. Note the .. makes it look up a level for the value.  No dots means look in the 
current path + name, a single dot, is the current path.  This is follows the listener conventions elsewhere.

Example Usage:
```js static
  
    var schema = {
    
       schema:{
          selectPage:{
            type:'Select',
            options:'Page1, Page2, Page3'
          },
          link1:{
            type:'Anchor',
            label:'Go To Page',
            href:'/{..selectPage}/index.html'
          }
       },
       fields:"selectPage, link1"
    }

   <Form schema={schema}/>  
```  
   
Now when a user changes the selectPage, then the Anchor (link1} will reflect said change.
  
The default substitution engine can be changed by setting expressionEngine on Editor
```js static
  import {Editor} from "Subschema";
  
  Editor.expressionEngine = function() {
     return {
        format(string){
        listen:[]//array of paths to listen to.
     }
   }
  
  
```  

See the [example](https://subschema.github.io/subschema/#/Expression)

## Listener Properties
Sometimes you need a property to be dependent on a value in the value manager.  To do that use the listener propType. 
The property then will be in sync with the value in the value manager.   The value of the property in the configuration
should be the path to the value that you are interested in.  PropTypes.error will listen to the first error for the path
and PropTypes.errors will get all props for the path.


```js static

var {PropTypes, loader, types} = Subschema;
var {Select} = types;

//copy propTypes (don't ref it will break Select)
var {options, ...copyPropTypes} = Select.propTypes;
copyPropTypes.options = PropTypes.listener;

class SelectListen extends React.Component {
    static propTypes = copyPropTypes;

    render() {
        return <Select {...this.props}/>
    }
}
loader.addType('SelectListen', SelectListen);

schema = {
     schema: {
              myDefault: {
                  type: 'SelectListen',
                  options: 'favorites'
              },
              favorites: {
                  type: 'List',
                  canAdd: true,
                  canEdit: true,
                  canReorder: true,
                  canDelete: true,
                  labelKey:'label',
                  itemType: {
                      type: 'Object',
                      subSchema: {
                          val: 'Text',
                          label: 'Text'
                      }
                  }
              }
          },
          fields: "myDefault, favorites"

}
//Now the options in myDefault are linked to the values in myFavorites.
```

 
