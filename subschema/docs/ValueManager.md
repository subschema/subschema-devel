
ValueManager is how state is stored in subschema.   It is based on a relatively simple event listener scheme. 

By default when you use a Subschema.Form a ValueManager is created, if you pass value into the form that becomes the initial value of the valueManager.


# API
The api is based on string paths.  Whenever a data path is updated, it fires the corresponding listeners.

## Constructor
ValueManager has a factory constructor. 
### No Argument Constructor.
ValueManager can be called with any arguments.

```js static
  import {ValueManager} from 'Subschema';

  const vm = ValueManager();
  //vm is a new instance of ValueManager, with no value or errors.

```

### Constructor with errors and value.
It can be initialized with values, and errors.
```js static
  import {ValueManager} from 'Subschema';

  const vm = ValueManager({test:1}, {test:[{message:'Is In Error'}]});
  //vm is a new instance of ValueManager, with a value of {test:1} and an error.
  

```


## ValueManager#addListener
addListener adds a listener to the ValueManager that fires whenever the corresponding path is changed.
It takes the following parameters

* path - A string or null to the path to listen on, null will listen to all.
* function - A function to call when the path changes.
* scope - A scope to call the function in.
* init - A boolean or function to call on initializing (adding to the ValueManager).  true- will fire the listener immediately upon adding to the ValueManager.  false- default will wait until first change. 

addListener returns an object with the following properties
* remove -> removes the value manager from the ValueManager.
* once -> will remove the listener after it has been called once.



### Listening to a path.
Example:
```js static
  const vm = ValueManager();
  
  const listener = vm.addListener('stuff', function(value, oldValue, path){
    console.log(value, path);
  }, null, false);

  vm.update('stuff', 2);
// will print 2, stuff to the console.

```

### Listening to all changes.
```js static
  const vm = ValueManager();
  
  const listener = vm.addListener(null, function(value, oldValue, path){
    console.log(value, path);
  }, null, false);

  vm.update('stuff', 2);
// will print 2, stuff to the console.
  vm.update('any', 2);
// will print 2, any to the console.

```
### Removing a listener
When addListener returns an object with a remove property.  When that function is called it removes the listener from the ValueManager.

```js static
 const vm = ValueManager();
  
  const remove = vm.addListener(null, function(value, oldValue, path){
    console.log(value, path);
  }, null, false).remove;
  //does not need to be in the scope of the returned object.
  remove();
```  
  
## Listening to nested paths.
ValueManager also allows you to listen to nested paths.  This is done via dots in string notation.  It works with arrays and nested objects.

```js static
 const vm = ValueManager();
 vm.addListener('path.to.stuff', function(value, oldValue, path){
  //will be triggered.
});
 vm.addListener('path.to', function(value, oldValue, path){
  //will be triggered.
});
 vm.addListener('path', function(value, oldValue, path){
  //will be triggered.
});
 vm.addListener(null, function(value, oldValue, path){
  //will be triggered.
});

 vm.addListener('notpath.to', function(value, oldValue, path){
  //will be *NOT*  be triggered.
});

 //will trigger the vm.
 vm.update('path.to.stuff', 1);

```


## ValueManager#getValue
Returns the current value of the value Manager.
```js static
  const vm = ValueManager({test:{stuff:1}});
  vm.update('test.stuff', 2);
  vm.update('other.than', false);
  vm.getValue();
/*
will return an object
{
  test:{
    stuff:2
  },
  other:{
    than:true
  }
}
*/
```

## ValueManager#update
Updates the value at a given path.  If no path is null, than it updates all listeners with the new value being the root.


## ValueManager#addErrorListener
addErrorListener works in the same way as addListener with the exception that it does not have hierarchy it just return key array pairs.  Where the key is the path to the error and the array is the array of errors.

## ValueManager#updateErrors
Takes a path, and error objects and updates the path.  Following same rules as update.

## ValueManager.getErrors()
Returns the current errors.

## ValueManager#addSubmitListener
Listens to submit events.  For nested forms it will respect the path of the submit and follow the same rules as the listener. Returns a listener object.

## ValueManager#addValidateListener
Listens to validation events. Returns a listener object.  This will trigger the validators at the corresponding paths.

## ValueManager#validate
Takes a path and triggers the listeners for said path.

## ValueManager#path
Returns the value at a given path.

## ValueManager#copy
Returns a copy of the valueManager.  

