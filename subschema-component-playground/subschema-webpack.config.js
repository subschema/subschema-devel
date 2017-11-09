module.exports = function (options, webpack) {


    webpack.resolve.alias['subschema-raw'] =
        require.resolve('subschema/dist/subschema-debug.js');
    return webpack;
};
