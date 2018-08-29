These are examples of how to use subschema.   They both show usage and are
a compatibility suite to ensure subschema does not break you between releases.

The examples are packages with 1 (or 2) extra files.
* src/index.js - returns an object that looks like
```js static
    description: '// A description of the example',
    schema     : {
        schema: {
          //a schema
        }
    },
    data       : {
        //sample data to include
    },
    imports    : {
        //imports, what imports need to be included.
        'subschema': ['loader']
    },
    //props to pass
    props      : ["loader"],
    //and optionally a file that is run before the schema is loaded.  To show
    // code examples
    setupTxt   : require('!!raw-loader!./setup.js')

```
* src/setup.js
  Allows for javascript to be executed, so that more dynamic examples can be
  created.  If the example does not have any code, than on src/index is required.
