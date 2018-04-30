A plugin is a way of injecting functionality into subschema.  Often plugins are
used to add components, templates and validators; though other functionality
exists.   Plugin configuration can be overriden by the callers "subschema" configuration
in package.json.  They can also be disabled by specifing an array where the first
element is the plugin name and the second element is false.   This will prevent
the plugin from being loaded in subschema, giving the calling application
flexibility over which plugins get loaded.


In general plugins are imported by the subschema-plugin-autoloader, which looks
at the configuration and generates a file that is then imported into subschema
allowing webpack to include the needed components.
