Why Subschema
=============

Occassionally  I get the why Subschema, or what is Subschema question.
This is a brief document explaining why and to some extent what.

## First what is subschema?

Subschema allows for easy management of state and configuration of
React components.   In traditional React application, state is or 
should be managed in the top level component, or  a Store of some kind.
Basically Dependency Injection for React.

## The beginning (without Subschema)
When you first enter the react world and go to write a form, you will
probably start with something like...

```jsx
  //Traditional React Form - No store

  import React, {Component} from 'react';

  class App extends Component {
  
    render(){
       
       return  (<div>
           <h1>Please Sign Up</h1>
           <Form {...this.props}/>
       </div>)
    }
  }
  
  class Form extends Component {
    constructor(props, ...rest){
        super(props, ...rest);
        this.state = props;
    }
    //remember any time you set state from props, you *should* 
    // implement this.
    componentWillReceiveProps(props){
        this.setState(props);
    }    
    handlerFirstName =(e)=>{
        this.setState({firstName:e.target.value}):
    };
    handleEmail =(e)=>{
        this.setState({email:e.target.value}):
    };
    handleLastName = (e)=>{
        this.setState({lastName:e.target.value}):
    };
    handleContact = (e)=>{
       this.setState({contact:e.target.checked});
    };
    render(){
        return (<form {...this.props}>
           <Input label="First Name"  onChange={this.handleFirstName} value={this.state.firstName}/>
           <Input label="Last Name" onChange={this.handleLastName} value={this.state.lastName}/>
           <Input label="Email"   onChange={this.handleEmail} value={this.state.email}/>
           <Checkbox label="Contact"  onChange={this.handleContact} value={this.state.contact}/>
      </form>)
    }
    
  }
  class Input extends Component {
  
     render(){
      const {label, ...props} = this.props;
      return <label>{label}<input type="text" {...props} /></label>
     }
  }
 class Checkbox extends Component {
     //cause you want special styling.
     render(){
      const {label,id, value, ...props} = this.props;
      //yeah, you wanna true/false not on-> whatever.
      return <span><label htmlFor={id}>{label}</label><input id={id} type="checkbox" checked={value} {...props} /></span>
     }
  }

```

### With Subschema
This is a lot of code, and a lot of repetition and very little reuse. So
let's try again with Subschema.

```jsx

  import React, {Component} from 'react';
  import {Form} from 'Subschema';
  const schema = {
     schema:{
        firstName:'Text',
        lastName:'Text',
        email:'Text',
        contact:'Checkbox'
     }
  }

  class App extends Component {
  
    render(){
       
       return <Form schema={schema}/>
    }
  }

```

"That\'s nice" you say dismissively, but what if you want an ajax form submission.
Well, Subschema works both with and without client side javascript so,
(isomorphically) let's say we do have JavaScript.

```jsx

  import React, {Component} from 'react';
  import {Form} from 'Subschema';
  
  const schema = {
     firstName:'Text',
     lastName:'Text',
     email:'Text',
     contact:'Checkbox'
  };

  class App extends Component {
    state = {};
    handleResponse = ({value}) => {
      this.setState({value});
    };
    
    handleSubmit = (e, errors, value) => {
        //prevent the submit.
         e && e.preventDefault();
        fetch('/user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(value)
        }).then(this.handleResponse,error handler);
    };
    
    render(){
       
       return (<div>
                <h1>Please Sign Up</h1>
                <Form schema={\{schema\}} value={this.state.value} onSubmit={this.handleSubmit}/>
               </div>);
    }
  }

```

## Labels
`"Ahh"` you say `"but, I wanna have my own labels..."`

Easy just change the schema.
```jsx

//new schema
const schema = {
     firstName:{
        type:'Text',
         title:'First'
     },
     lastName:{
        type:'Text',
        title:'Last'
     },
     email:{
             type:'Text',
             title:'Email'
     },
     contact:{
        type:'Checkbox',
        title:'Are you sure?'
     }

}
//everything else is the same
...

```

## Validation
`"Not bad, but I need to validate before post"...`

You know what so do I, and pretty much everyone.  Subschema comes
with a range of built in validators, regex, required, match, number,email.

Here's what would change.


```jsx

//schema with validators
const schema = {
     firstName:{
        type:'Text',
        title:'First',
        validators:"required"
     },
    lastName:{
        type:'Text',
        title:'Last',
        validators:"required"
    },
    email:{
        type:'Text',
        title:'Middle',
        validators:["required", "email"]
    },
  
    contact:{
        type:'Checkbox',
        title:'Are you sure?',
        validators:[{ 
            type:"required", 
            //You want a custom error message, no problem.
            "message":"You must agree to be contacted"
        }]
    }

}

```
### Custom Validators
You may have a need for a validator that does come with Subschema.  No problem..

```js
  
loader.addValidator('moreThan2', (options)=>{
   const {message} = options || {message:'Custom default message'};
   return (val, valueManager)=>{
      return parseInt(val, 10) > 2 ? {
            message
      } : 
     //Return null on success.
     null;
   }
});


schema = {
  schema:{
    example:{
       type:'Text',

       validators:['required', 
       //you could just put a string moreThan2, but this shows how it can be configured with a custom message.
       {type:'moreThan2', message:'This really ought to be more than 2'}]
    }
  }

}

```



## External Components
`"That's all neat, but seriously I have all these awesome react components
that I want to use."` -says you.

Ah, yes, and this is important, perhaps most important.

So Subschema uses a "loader" to load types such as "Text" and "Checkbox",
you can add types to this loader and refer to them in your schema.

Say you wanted to use [react-maskedinput](https://github.com/insin/react-maskedinput)
hey so do I.  So let's do it.

First install (hint $ npm install react-maskedinput --save)


```jsx

import {loader, Form} from 'Subschema';
import React, {Component} from 'react';
import MaskedInput from 'react-maskedinput';


loader.addType('MaskedInput', MaskedInput);

const schema = {
     firstName:'Text',
     lastName:'Text',
     email:'Text',
     phone:{
        //This is MaskedInput 
        type:"MaskedInput",
        mask:"1 (444) 111-1111"
     },
     contact:'Checkbox'
}

class App extends Component {
  
    render(){
       //technically loader is optional, and this would work, but
       // you are better off passing it.
       return <Form schema={\{schema\}} loader={loader}/>
    }
  }

```

For a complete project see [this](http://subschema.github.io/subschema-external-component-example/).

`"Yeah, sure, you MaskedInput must support Subschema"` --
Nope, but it follows the subschema `Type` convention, which conveniently
enough is the React convention.  So it works. 

## Custom Components
Will all React components work this easily?  

No, probably not, but here is how you can write your
own (or adapt one to yours).


```jsx
import React, {Component} from 'react';
import {PropTypes} from 'Subschema';
class SwitchButton extends Component {

    static propTypes = {
        //This tells subschema to not process e.target.value, but just take the value.
        onChange: PropTypes.valueEvent,
        //Normal React.PropTypes
        onText: React.PropTypes.string,
        offText: React.PropTypes.string
    };

    static defaultProps = {
        onText: "ON",
        offText: "OFF"
    };

    //In case you have "special" value handling.
    isChecked(value) {
        return value === true || value === 1 || value === 'on';
    }

    //This is bound to the object instance
    handleClick = (e)=> {
        //This updates the valueManager
        this.props.onChange(this.isChecked(this.props.value) ? '' : 'on');
    };

    render() {
        var props = this.props;
        var isChecked = this.isChecked(props.value);

        //you prolly won't do it this way, but use classes instead, but the demo platform
        // has its limitations.
        var container = extend({}, styles.container, isChecked ? styles.on : styles.off);
        var button = extend({}, styles.button, isChecked ? styles.buttonOn : styles.buttonOff);

        return <div className={props.className} style={styles.fieldContainer}>
            <div style={container} onClick={this.handleClick}>
                <input name={props.name} type="hidden" value={this.props.value}/>
                {isChecked === true ? props.onText : props.offText}
                <span style={button}/>
            </div>
        </div>
    }

}

```

And then add it to your loader

```jsx

import SwitchButton from './SwitchButon';

...
loader.addType({SwitchButton});

//now you can use type:'SwitchButton' in your schema just like
Text, or Checkbox.
```

## Nested Objects
`"Uh-Huh, but what about nested structures"`

I know not all objects are key value pairs, no worries, Subscshema has a
type Object, that can handle nested structures, [List](http://subschema.github.io/subschema/#/Todos) for arrays, 
and [Mixed](http://subschema.github.io/subschema/#/Questionaire) 
for well Objects where the keys are dynamic.

```js
...
const schema = {
    /**
    
     Maybe you  want the three parts of a name in an object.
     this will output
     name:{
       first:"Joe",
       last:"Doe",
       middle:"Nope"
     }
    **/

   "name":{
      type:'Object',
      subSchema:{
         schema:{
           first:'Text',
           middle:'Text',
           last:'Text'
         }
      }
   },
   
   /**
   Perhaps you have a list of objects.
   **/
   "addresses":{
         "type": "List",
         //can you add to the list?
         "canAdd": true,
         //can you edit an item?
         "canEdit": true,
         //can the list be reordered?
         "canReorder": true,
         //can they delete
         "canDelete": true,
         //Is there a field to use as a label
         "labelKey": "street",
         "itemType": {
           "type": "Object",
           "subSchema": {
                "street":"Text",
                "city":"Text",
                "state":"CA,VA,...DC",
                "zip":"Text"
           }
         }
   }

}



```

## Custom Templates
`"Yeah, and what if I don't like how your labels are dom'd out?"`

I get it sometimes you want more or different layout. All fields can
have a template defined.

```js
class CustomTemplate extends Component {

    render(){
       return (<div>
       <h1>Hello</h1>
       {this.props.children}
       </div>)
    }
}

```

## How Does Subschema Work?
Subschema works by looking at the propTypes and defaultProps of the class being
wired in.   If a PropType matches a resolver it uses the resolver to
add special behaviour to the propType.    If there isn't a matching resolver it
just passes the value to the component.   If you try to pass a property that is
not in the defaultProps or propTypes of an object it won't be passed.   This is 
by design.    




## Loaders
Resolvers often use the loader to actually load the type.   Loaders just return
a class (or function) based on key name.    The only real magic of loaders is
that they can be nested, that is you can add a loader to a loader. And the last
key, value pair added is the one that will be returned.   Allowing for easy 
overridding of defaults.  

```jsx

import React, {Component} from 'react';
import {loaderFactory, PropTypes} from 'Subcshema';

class SimpleType extends Component {
  static propTypes = {
    name:PropTypes.string
  }
  render(){
    return <input {...this.props} />
  }
} 
class SimpleType2 extends Component {
  static propTypes = {
    name:PropTypes.string
  }
  render(){
    return <input {...this.props} />
  }
} 

const loader1 = loaderFactory();
loader1.addType({Simple:SimpleType});

const loader2 = loaderFactory();
loader2.addType('Simple',SimpleType2);

//loader2 will be the highest order.
const loader3 = loaderFactory([loader2,loader1]);

//Will Return SimpleType2
loader3.loadType('Simple') 

``` 

Built into loader are 'Operator', 'Template', 'Processor', 'Type', 'Schema', 'Validator', 'Style', 'Transition'.

You can define your own "loader type".

```js
  const loader = loaderFactory();
  loader.loaderType('Something');
  loader.addSomething(....)
```

 
 








"Sure, you say I can just write a component, but I don't want to"

Well I get it, Subschema comes with about a dozen different components
including List for array data and Mixed for data objects.  






While this solves the state issue to some extent, it does not solve the
configuration problem.   That is how are the components wired together.
Sure you can write components that depend on components, but this very
static. Subschema solves for this by rendering a "schema".  This schema
is relatively simple, but is extendable by "resolvers" and the components
themselves.   


It is implemented a a dependency injection system, 
based on Types, Templates and resolvers.    

Subschema is fundamentally a dependency injection framework for React. It
pretends to be a form layout system, but this just one application.  It
works by reading the propTypes and defaultProps on React components and
finding corresponding "resolvers" for said propType.  If no resolver
matches the propType than it passes the value along.  If a defaultProp
exists without a propType, than it can be configured, but basically as
a plain prop. 
