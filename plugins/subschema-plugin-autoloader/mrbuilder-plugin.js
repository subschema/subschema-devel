const OptionsManager = require('mrbuilder-optionsmanager');
const babelConfig    = require('mrbuilder-plugin-babel/babel-config');
module.exports       = function (options, webpack, optionsManager) {

    const subschemaManager = new OptionsManager({
        _require: optionsManager.require,
        prefix  : 'subschema'
    });


    webpack.resolve.alias['subschema-plugin-autoloader/importer'] =
        require.resolve('./src/importer');

    webpack.resolve.alias['subschema-plugin-autoloader'] =
        require.resolve('./src/index');

    const babel = {
        loader : 'babel-loader',
        options: babelConfig
    };

    webpack.module.rules.unshift({
        test: /subschema-plugin-autoloader\/importer/,
        use : [{
            loader : 'val-loader',
            options: subschemaManager
        }]
    });
    webpack.module.rules.unshift({
        test: /subschema-plugin-autoloader/,
        use : [{
            loader : 'val-loader',
            options: subschemaManager
        }]
    });
    /* webpack.module.rules.push({
         test: /subschema-plugin-autoloader/,
         use : [babel, {
             loader : 'val-loader',
             options: subschemaManager
         }]
     });
 */
    return webpack;
};

