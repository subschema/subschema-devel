Content
A Content component.  Will render safely as possible innerHTML.  It will also
subscribe to values that are put in the {name}.   You can nest content and types.

Super simple example.
```json
{
 "content":"Stuff {substitute_this_value}"
}
```

A more sophisticated example using arrays and custom content.

```json
{
 "content":["Stuff {substitute_this_value}", {
   "type":"h3",
   "className":"some_class",
   "content":"Hello {..another_value_from_parent}"
 }]
}
```


See the [example]("http://subschema.github.io/subschema/#/Content")
