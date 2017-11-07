var path          = require('path');
var resolvePkgDir = function (name) {
    return path.resolve(require.resolve(path.join(name, 'package.json')), '..');
};

module.exports = function (options, webpack) {


    webpack.resolve.alias['babel-core']    =
        resolvePkgDir('babel-standalone');
    webpack.resolve.alias['subschema-raw'] =
        require.resolve('subschema/dist/subschema-debug.js');
    return webpack;
};
