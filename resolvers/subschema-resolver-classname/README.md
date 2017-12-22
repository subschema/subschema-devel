subschema-resolver-classname
===
Resolver that handles classNames injection.

## Installation
```sh
 $ yarn install subschema-resolver-classname
```
## Configuration
You can configure globally by
overriding settings.
```js

import {settings} from 'subschema-resolver-classname';
settings.global = 'Global' // Name of your global css class;
settings.className = 'container'; // default className injection
settings.pattern  =  /^(.*)[cC]lassName$/; // regex to extract className key from
```
