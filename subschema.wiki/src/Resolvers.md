Resolvers
=========
Resolvers are a key component to understanding how Subschema works.   They add the magical properties to Components.  Below is the documentation for the built in resolvers, however you can write your own.

# Resolver API
The resolver api resolves PropTypes to resolver functions.  However due to the
way newer versions of React handle *propTypes you need to use subschema-prop-types*
rather than the React ones.   For non resolver mappings it will not matter.



## Registering a resolver.
You register a resolver by calling
```
 import {loader} from 'subschema';
 import PropTypes from 'subschema-prop-types';
 
//Note you do not use the React built in propTypes, you need a unique PropType instance
// so you can do this instead.
 const customPropType = PropTypes.oneOfType([PropTypes.string]);
 loader.addResolver(customPropType, resolver);
```

## Writing a resolver
Resolvers usually fall into 2 categories, "property" when you just want to munge the property
before passing it into the component, and "listener" when you want to listen to
an event and update the component when something happens.  

### A Property Resolver 
If you want to write a resolver that just massages (munges) the data being passed into the component
here is how

```jsx
import React, {Component} from 'react';
import {injector, PropTypes} from 'subschema';

function uppercase(Clazz, key) {
   //Note this needs to be called in the scope of the Clazz that is being inspected.
  
   this.property.call(Clazz, function uppercase$resolver(value, key, props, context){
     //This function will be called whenever the property configure changes.
     if (value){
        return value.toUpperCase();
     } 
   }); 
}
// create the custom PropType.
const upper = PropType.oneOfType([PropType.string]);

//register
loader.addResolver([upper, uppercase]);

//use it in a class

class CustomComponent extends Component {
  static propTypes = {
     label:upper;
  }
  render(){
     //this.props.label <- will be uppercase
  }
} 

```


### A Listener Resolver 
If you want a resolver that can update the components state via callback, 
you want a listener resolver.

Here is an example

```jsx
import React, {Component} from 'react';
import {injector, PropTypes} from 'subschema';


// create the custom PropType.
const countdown = PropType.oneOfType([PropType.number]);

//register
injector.resolver(countdown, function countdownResolver(Clazz, key) {
   //Note this needs to be called in the scope of the Clazz that is being inspected.
  
   this.listener.call(Clazz, function uppercase$resolver(value, key, props, context){
     let to;
     let count = value;
     to = setInterval(()=>{
         if (count < 0) {
            //only go to zero.
            clearInterval(to);
         }
         this.injected[key] = count--;
         // this is necessary because listeners don't always forceUpdate.
 
         this.mounted && this.forceUpdate();
     }, 1000);
     //this function will be called when the component is unmounted.  The return for a listener is an unregister function.
     return clearInterval.bind(null, to);
   }); 
});

//use it in a class

class Count extends Component {
  static propTypes = {
     count:countdown
  }
  static defaultProps = {
     count:5 //<- unless configured otherwise, it will start at 5.
  }
  render(){
     <div>{this.props.count}</div> <- will be change every second for 5 seconds.
  }
} 

```






# Built-in Resolvers
The built-in resolvers power most of what subschema does.  They can all be referenced by the corresponding PropTypes exported by Subschema;

## blurValidate
Validates on blur, if the component has changed value.
## changeValidate
Validates on every value change, useful, checkbox and select values.
## conditional
Handles Conditional properties.
## content
Normalizes content, and is a marker for content within components.
## dataType
If set it will make the prop.type the value of dataType on the component.  Useful for changing the input type of
the Text component.  Resolvers * are internal, and generally not safe or useful out side of subschema.

## domType
Will inject a DOM type into the component.

## error (listener)
Listens to errors at the resolved path.  The path is resolved either by the path of the field, or the string that is used
to configure.  The recieving component will only get the first error.

## errors (listener)
Listens to errors at the resolved path.  The path is resolved either by the path of the field, or the string that is used
to configure.  The recieving component will recieve all the errors for the specified path.

## errorEvent (property)
Fires the error listeners for the given path.  If not configured with a string it will fire on the current path of the field.

## expression (listener)
Takes a  string expression such as "hello, {name.first}" and updates the component when ever name.first changes, keeping the string in sync with the valueManager.

## *field (property)
Normalization for field injection, typically only used in subschema internals.

## fieldAttrs (property)
Gives the ability to pass arbitrary field attrs to components.  Extremly dangerous, but useful, for aria and other non defined pass through attributes.

## *fields  (property)
Normalizes fields, typically only used internally.

## *fieldset (property)
Normalizes fieldsets, typically only used internally.

## htmlFor (property)
Tries to resolve the for attribute on labels, looking at path to determine id.

## id (property)
Tries to resolve the id for components, looking at path to determine.

## injectClass (property)
Allows for a property to be injected by subschema.  Useful when you want a class injected
but not configured by subschema.

## injectedClass (property)
The wrapper injected class, useful for components that are recursive.

## *operator (property)
Resolves an operator, eventually checking the loader.

## options (property)
Normalize select style label,val objects.

## processor (property)
Injects a processor.

## *schema (property)
Normalizes a schema

## style (property)
Injects [icss](https://github.com/css-modules/icss) style into a component.   In addition for each class name in the style
object it adds a corresponding property postfixed with 'Class';

## submit (property)
Triggers submit listeners.

## targetEvent (property)
Passes e.target.value to the value manager for the resolved path of a Component.

## template (property)
Returns a resolved template.

## title (property)
Resolves the title of a component, by looking at the configuration and as a last resort titlizing path name.

## transition (property)
Returns a resolved transition.

## type (property)
Injects a type from the loader.

## typeClass (property)
Injects a className based on type.

## validate (property)
Injects a function that will validate the Component.

## value (listener)
Injects the current value in the valueManager to the component.

## valueEvent (property)
Injects a function that's first argument is the value to update the resolved path in the 
ValueManager.
