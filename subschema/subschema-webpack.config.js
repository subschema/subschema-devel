const path         = require('path');
const webpackUtils = require('subschema-dev-support/webpack-utils');
const pkg          = require('./package.json');

module.exports = function (options, webpack) {
    webpack.module.rules.push({
        test   : path.resolve(__dirname, 'src', 'DefaultLoader.js'),
        use    : {
            loader : 'val-loader',
            options: {
                dependencies: webpackUtils.concatFilteredDependencies(pkg)
            }

        }
    });
    //make sure everyone uses the same lodash.
    webpack.resolve.alias.lodash =
        path.dirname(require.resolve('lodash'));

    options.useDefine['process.env.SUBSCHEMA_VERSION'] = pkg.version;
    console.log('using subschema');
    return webpack;
};

