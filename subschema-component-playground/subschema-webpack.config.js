var path       = require('path');
module.exports = function (options, webpack) {
    webpack.resolve.alias['babel-core'] =
        path.resolve(__dirname, 'node_modules', 'babel-standalone');
    webpack.resolve.alias['subschema-raw'] = require.resolve('subschema/dist/subschema-debug.js');
    return webpack;
};
