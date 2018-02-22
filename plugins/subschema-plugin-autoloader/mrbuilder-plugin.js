const OptionsManager = require('mrbuilder-optionsmanager').default;
const babelConfig    = require('mrbuilder-plugin-babel/babel-config');

module.exports = function (options, webpack, optionsManager) {
    const debug = this.debug || console.log;

    debug('optionsManager', optionsManager);
    const subschemaManager = new OptionsManager({
        prefix  : 'subschema',
        _require: optionsManager.require || require
    });

    webpack.resolve.alias['subschema-plugin-autoloader/importer'] =
        `${__dirname}/src/importer`;

    const babel = {
        loader : 'babel-loader',
        options: babelConfig
    };

    webpack.module.rules.push({
        test: /subschema-plugin-autoloader.*/,
        use : [babel,{
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

