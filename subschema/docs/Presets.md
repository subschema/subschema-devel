Presets are a way of configuring a group of plugins together.  This is
a bit more convienent than configuring every plugin by hand.  A plugin within
a preset can be overridden in the parents package.json, by specifing the plugin
and the new configuration.   If the second argument is a bool, than the plugin
will be disabled.   A preset by itself does not have functionality.
