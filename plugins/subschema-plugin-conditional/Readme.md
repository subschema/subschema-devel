Sometimes you need some dynanicness in your schema.  To do this we have conditional.
The basic is it listens to a valueManager and then tries show or hide.

Props:

 * value (optional - any - null) - The value to listen to can if not given, than
          it will be a compare against not null.
 * listen (optional - string - path) The path to listen to can be empty, in which case will look for defaults to the current path.
          Can be relative '..' or absolute. Defaults to the current path.
 * template (optional - string|ReactFactory) The template to use if it evaluates to true IE - Modal, ShowHide
 * falseTemplate (optional - string|ReactFactory) The template to use if the expression evaluates to false.
 * animate (optional - boolean|string|object) A string to use  a named animation,or a boolean. if a string that string will be the "name" to use to animate.
          If an object is passed than it will passed as props to the transition group.
          If === true than the default animation will be used.
          If === false than no animation is used

  * operator (optional - string|regex - truthy
           How to compare the value to the matched value.
           If ommitted and a value is given than === is used.
           If ommitted and the value is ommitted than a truthy (!!value) is used.
           The built in operators are:
             * '==' - Same as javascript ==
             * '>='
             * '<='
             * '>'
             * '<'
             * '==='
             * '!==' - Special ones -
             * 'truthy' !!value
             * 'falsey' !value
             * '/regex/[gim]' /regex/.test()
             * '!/regex/[gim]' !/regext/.test();
             * 'something registed with the loader'
   * error  (optional - string) - The error path to listen to.   This path is evaluated slighty differntly, always absolute.
   * dismiss (optional - string) - This will be set to false, given to make the current conditional false.   Set this for dismissing modals.  If
          not provided, the template will recieve a dismiss property with the current key substituting '.' with '_' and prepended with an @

See the [example](https://subschema.github.io/subschema/#/Conditional)
