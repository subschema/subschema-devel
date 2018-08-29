
Resolvers are a key component to understanding how Subschema works.   They add the magical properties to Components.  Below is the documentation for the built in resolvers, however you can write your own.

# Resolver API
The resolver api resolves PropTypes to resolver functions.  However due to the
way newer versions of React handle *propTypes you need to use subschema-prop-types*
rather than the React ones.   For non resolver mappings it will not matter.



## Registering a resolver.
You register a resolver by calling
```js static

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

```js static

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

```js static

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
```

Use in a component
```js static
import {countdown} from './countdown'

//use it in a class

class Count extends Component {
  static propTypes = {
     count:countdown
  }
  static defaultProps = {
     count:5 //<- unless configured otherwise, it will start at 5.
  }
  render(){
    return <div>{this.props.count}</div> //<- will be change every second for 5 seconds.
  }
} 

```
