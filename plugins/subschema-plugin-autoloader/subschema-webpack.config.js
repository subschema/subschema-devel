const OptionsManager = require('mrbuilder-optionsmanager').default;

module.exports = function (options, webpack, optionsManager) {
    console.log('optionsManager', optionsManager);
    const subschemaManager = new OptionsManager({
        prefix  : 'subschema',
        _require: optionsManager.require || require
    });

    webpack.resolve.alias['subschema-plugin-autoloader/importer'] =
        `${__dirname}/src/importer`;

    webpack.module.rules.push({
        test: /subschema-plugin-autoloader\/importer/,
        use : [{
            loader : 'val-loader',
            options: subschemaManager
        }]
    });
    webpack.module.rules.push({
        test: /subschema-plugin-autoloader/,
        use : {
            loader : 'val-loader',
            options: subschemaManager
        }
    });


    return webpack;
};

