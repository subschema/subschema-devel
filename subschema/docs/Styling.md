Styling
===
Styling is hard.  Making components with externalized styling is even harder.   Subschema has a dependency injection approach to styling, using [css modules](https://github.com/css-modules/css-modules), to make it easier.

## CSS Modules
CSS Modules can work with any css preprocessor, or no preprocessor, however they expose css classNames to javascript objects.

Widget.css
```css

.container {
...
}

```

With the help of webpack if you include Widget.css it will expose ".container" as "container" in the resulting object.

```js static
 import WidgetStyle from './Widget.css';
 //WidgetStyle.container will have a generated css class name.

```

To inject styles into Components use the PropTypes.style resolver and add the stylesheet to the loader.

```js static
//index.js
import WidgetStyle from './widget/Widget.css';
import Widget from './widget/Widget.jsx';

export types = { Widget };
export styles = { Widget:WidgetStyle};

export default ({ types, styles }); 


```
Now we need to access the style object from our component.

```js static
//Widget.jsx
import {PropTypes} from 'Subschema';
import React, {Component} from 'react';

export default class Widget extends Component {
  static displayName = 'Widget';
  static propTypes = {
     styleClass:PropTypes.style
  }
  static injectedProps = {
    //this is optional, as it will use the displayName, if this is not set, but you could change it to share styling, between components.
     styleClass:"Widget"
  }
  render(){
    //this.props.styleClass will have the injected component it will also have 
    const {containerClass, styleClass, ...rest} = this.props;
   //"Class" will get appended to all the names in the style component and be available directly as props.
   // containerClass is the same as styleClass.container;
    <div className={containerClass}>
//...your magic here
    </div>
  }
}

```



