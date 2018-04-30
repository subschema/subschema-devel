
Resolver that handles css classNames injection.


You can configure globally by
overriding settings.
```js static

import {settings} from 'subschema-resolver-classname';
settings.global = 'Global' // Name of your global css class;
settings.className = 'container'; // default className injection
settings.pattern  =  /^(.*)[cC]lassName$/; // regex to extract className key from

```
