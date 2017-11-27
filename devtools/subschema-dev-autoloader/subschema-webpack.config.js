module.exports = function (options, webpack, optionsManager) {
    webpack.module.rules.push({
        test   : /subschema-dev-autoloader/,
        use: {
            loader : 'val-loader',
            options: {
                plugins: optionsManager && optionsManager.plugins
            }
        }
    });

    return webpack;
};

