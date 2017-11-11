module.exports = function (options, webpack) {


    webpack.resolve.alias['subschema-raw'] =
        require.resolve('subschema/dist/subschema-debug.js');

    (webpack.node || (webpack.node = {})).buffer = false;

    return webpack;
};
