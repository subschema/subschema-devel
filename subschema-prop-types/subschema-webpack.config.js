const path       = require('path');
const PROP_TYPES = 'wrapped-prop-types';

module.exports = function (options, webpack) {
    webpack.module.rules.push({
        test: path.resolve(__dirname, 'src', PROP_TYPES),
        use : {
            loader : 'val-loader',
            options: {
                propTypes: require('prop-types')
            }
        }
    });

    webpack.resolve.alias['internal-prop-types'] =
        require.resolve('prop-types');

    webpack.resolve.alias['prop-types$'] =
        path.resolve(__dirname, 'src', PROP_TYPES);

/*
    webpack.resolve.alias['prop-types/checkPropTypes$'] =
        require.resolve('prop-types/checkPropTypes');
*/

    return webpack;
};
