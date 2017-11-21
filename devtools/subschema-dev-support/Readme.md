Subschema Dev Support
===
These tools help develop subschema, they could be used in other multimodule,
monorepos.   This is meant to hold all common dev dependencies.  

## Installation
Typical npm/yarn installation.
```sh
$ npm install subschema-dev-support --save-dev
```

## Configuration
The tools are designed to run with smart defaults.  Edit your 
package.json like this

```json
"scripts":{
 "karma": "subschema-karma",
 //if you want plain moch use subschema-mocha instead.
    "test": "subschema-karma",
    "demo": "subschema-webpack --demo ./docs",
    "server": "subschema-webpack-dev-server",
    "prepublish": "subschema-webpack",
    "clean": "rimraf ./lib ./dist"
},
"devDependencies":{
 "subschema-dev-support":"^2.2.3"
}
```

With this configuration you can run

* Tests: 
``` 
$ npm run test
```
* Karma: 
```
$ npm run karma
```
* Demo: 
```
$ npm run demo
```
* Server: 
``` 
$ npm run server
```


Included tools-

 * [Babel](#user-content-babel)
 * [Webpack](#user-content-webpack)
 * [Webpack DevServer](#user-content-webpack-dev-server)
 * [Mocha](#user-content-mocha)
 * [Karma](#user-content-karma)

## Babel
Subschema uses babel to compile source code.  This command is for when you don't need webpack to do the compiling. The arguments are the same as [babel-cli](https://babeljs.io/docs/usage/cli/) but are defaulted to

```sh
$ subschema-babel -s true &&\
 --out-dir lib &&\
 --copy-files &&\
```

Effective .babelrc, although these tools do not actually use the babelrc this is the preset
```json
{
  "presets": [
    "es2015",
    "es2017",
    "react",
    "stage-2"
  ],
  "plugins": [
    "transform-function-bind",
    "transform-class-properties",
    "transform-async-to-generator",
    "transform-export-extensions"
  ],
  "babelrc": false,
  "ignore": "**/lib/**"
}
```

## Webpack
This tool is designed to compile your code with webpack. It respects all the [webpack cli](https://webpack.js.org/api/cli/) but has been extended to be easier in multimodule projects.  Part of what
this does is creates alias to make debugging and changing multiple modules easier in dev mode and compile and biuld modes.


Environmental Variables

| Name                        |  Default   | Description
| --------------------------- |:----------:|:-----------
| SUBSCHEMA\_USE\_NAME\_HASH  |            | Use hashes in filenames
| SUBSCHEMA\_NO\_STYLE\_LOADER| 1          | Disable style loader.
| SUBSCHEMA\_USE\_HTML        | 1          | Use html templates
| SUBSCHEMA\_USE\_STATS\_FILE | 1          | Use stats file
| SUBSCHEMA\_USE\_EXTERNALS   | 1          | Use externals react,react-dom,prop-types


Cli Arguments

| Argument               | Value     |Description
| -----------------------|:---------:|:----
| --demo                 | [path]    | generate a demo app a that location 
| --no-style-loader      |           | don't use style loader (better for server side).
| --use-stats-file       | [file]    | output a file with css and compiled information.
| --use-externals        | [modules] | use the following as externals react,...
| --externalize-peers    |           | (default) use this to make externalize the peerDependencies.
| --no-externalize-peers |           | Do not externalize peer dependencies.
| --debug                |           | output some debug information.


### Custom Webpack Configuration
Sometimes you need to change webpacks configuration.   subschema-webpack extends normal webpack behaviour to look into the dependencies and the current project for a `subschema-webpack.config.js` 
if this file exists it attempts to load it.   this file differs from traditional webpack as that
it is expected to be a function 


```js
module.export = function(options,webpack){
  // options - are just for passing meta data to other loaders and from other loaders.
  // webpack is the actual configuration.  You can do whatever.
  
  return webpack.
}

```
If you want or don't want different modules loaded by webpack, it looks in package.json
for include/exclude array of globs

package.json

```json 
{
  "subschema":{
     "include":["subschema-*"],
     "exclude":["whatever"]
  }
}
```



## Mocha
For non browser testing we use plain mocha. Its faster and easier to run than Karma but can not do browsery things. It uses the same babel configuration as subschema-babel. It uses a combination of environmental variables and arguments for configuration, though typically it takes neither.

* SUBSCHEMA_COVERAGE_DIR=./converage turns on test coverage
* SUBSCHEMA_COVERAGE=1 turns on coverage

## Karma
Karma testing is useful for testing in browser.  This configuration
uses the aformentioned webpack with the following additional settings.




