How it works
===
Subschema is mainly a dependency injection framework for React.  It works by inspecting classes to be injected, propTypes property and then resolving those properties against the resolvers or the configuration.

`
 App -> Form (Context)   ->[] FieldSets
         + ValueManager       +Injected->(Template) (Each Fieldset can have a template
         + resolvers             +-Fields (A Template can have multiple Fields)
         + loader                   +- Injected->(Template) -> (A Field Template has a Type
                                    +- Injected->(Type) -> A Type Ends the loop unless type Object.

`

So the basic flow is &lt;Subschema.Form...&gt; takes a schema.  A schema contains the schema, fields and fieldsets describing the layout.    Form sets up the Context will valueManager and loader (These can be passed into the form) Which then starts the layout process.

The actual magic happens by a Synthetic Class is generated based on the Component Class's propTypes.  It looks at the propTypes and passes them to the resolvers.   These resolvers then modify the Synthetic class to enable it to manage the child's properties. 

`
  Synthetic Class -> Component Class
`
The Synthetic Class than can listen to events and convert propTypes from one format to another to be consumed by the Component Class.   Synthetic Class's are cached based on the propTypes passed to it.  If another class has the same propTypes and defaultProps than the Synthetic Class is reused.   In the future this may be changed to use a single Synthetic Class that can have its behavior modified, to increase performance.     
