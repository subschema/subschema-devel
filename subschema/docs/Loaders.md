Loaders are how subschema resolves types, templates, operators, processors and other configurable classes.   The are instantiated from the loaderFactory.  Loaders are nestable with a last in first out design.   That is the last object registered the first one that will be returned.

By default subschema has a preconfigured loader that has DefaultLoader already registered.  And unless a different one is passed into *Form* than it will be the one that is used.

Example:
```js static

 import {loaderFactory, loader} from 'subschema';

 const newLoader = loaderFactory();
 loader.addLoader(newLoader);
 
 const schema = {schema:{test:'Text'}};
 
 <Form schema={schema} loader={newLoader}/>
```

## LoaderFactory Api
To create a new loader, you can call loaderFactory.  loaderFactory takes an array of loaders as the first argument and returns a loader object.

The default Subschema loader is equivalent to:
```js static

 import {loaderFactory, DefaultLoader} from 'subschema';

 const loader = loaderFactory([DefaultLoader]);

```

By default a loader has the following kinds.
* Type - For injection of types, "Types" do not recieve children.
* Template - Templates are similar to types but do recieve children.
* Validator - factories for validators.
* Schema - Allow resolution of schema based on a string name.
* Operator - Allow for custom operators used in conditional.
* Processor - Allow for custom processors used in Autocomplete and others.
* Style - Allow for injection of stylesheet modules.
* Transition - Allow for injection of transition modules.


For each Kind of loader, the following methods exist
* loaderFactory#add```Kind``` - takes a string and an Kind or an object with keys and Kinds
* loaderFactory#list```Kind```s - Lists the installed kinds.
* loaderFactory#load```Kind``` - loads the specified Kind, first argument is a string.

Example: Loading a new type.

```js static

  import MyType from 'my-type';
  import YourType from 'your-type';
  import Something from 'something';
  import {loader} from 'subschema';
  
  //string and Type - now you can use type:"MyType" in your schema.
  loader.addType('MyType', MyType);

  loader.addType({
     YourType, // now you can use "Some" in your schema.
    Some:Something
   });

```

## Creating a new Kind
Sometimes you may need a new Kind of thing, for injection.  To do this call

```js static

 import { loader} from 'subschema';
 loader.loaderType('Duper');
 //now listDupers, loadDuper, addDuper are available on loader.
 loader.addLoader(special);

```


## Exporting Loaders
A module may often need multiple components loaded to make it work correctly.  So it is convenient to export a loader so the consumer only needs to add the loader to their loader for the component to work correctly.

Say you had a component that required a style, a processor, a template and a type.
You could export the following index.js.  So your component does not have
to have any dependencies on subschema.

```js static

 import SpecialStyle from './special-style'; 
 import SpecialTemplate from './special-template';
 import SpecialType from './special-type';

 export const types = {
   SpecialType
 } 
 export const templates = {
   SpecialTemplate
 }
 export const styles = {
     SpecialStyle
 }
 export default {types, templates,styles};
```

And then the consumer would just set it up

```js static

   import {Form, loader} from 'subschema';
   import special from 'special';

   loader.addLoader(special);
   //form can now use all the things in the special loader
   <Form loader={loader}/>
```
 
Loaders don't do the injection magic.  Resolvers do that, loaders are basically a fancy map, that allows for extra configurability.
For instance of you wanted to use a different default template, you could just register a new one in the loader.

```js static


  import {loader} from 'subschema';
  import CustomEditorTemplate from 'custom-editor-template';

  loader.addTemplate('EditorTemplate', CustomEditorTemplate);

```

