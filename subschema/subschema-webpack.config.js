const path         = require('path');
const pkg          = require('./package.json');

module.exports = function (options, webpack, optionsManager) {
    console.log('HERER\n\n\n\\n\n\n')
    webpack.module.rules.push({
        test: path.resolve(__dirname, 'src', 'DefaultLoader.js'),
        use : {
            loader : 'val-loader',
            options: {
                dependencies: optionsManager && Array.from(
                    optionsManager.plugins.keys())
            }

        }
    });
    //make sure everyone uses the same lodash.
    webpack.resolve.alias.lodash =
        path.dirname(require.resolve('lodash'));
    if (!options.useDefine){
        options.useDefine = {};
    }
    options.useDefine['process.env.SUBSCHEMA_VERSION'] = pkg.version;
    console.log('using subschema');
    return webpack;
};

