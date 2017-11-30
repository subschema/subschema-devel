module.exports = ({
                      preEntry = ['only-dev-server'],
                      babel = require('subschema-dev-babel'),
                  }, webpack) => {


    webpack.devtool = 'cheap-module-source-map';
    babel.plugins.unshift(require.resolve("react-hot-loader/babel"));

    webpack.resolve.alias['webpack/hot/dev-server'] =
        require.resolve('webpack/hot/dev-server.js');

    webpack.resolve.alias['only-dev-server'] =
        require.resolve('webpack/hot/only-dev-server.js');

    if (typeof webpack.entry == 'string') {
        webpack.entry = preEntry.concat(webpack.entry);
    } else if (Array.isArray(webpack.entry)) {
        webpack.entry = webpack.entry.map(entry => preEntry.concat(entry));
    } else if (webpack.entry) {
        webpack.entry =
            Object.keys(webpack.entry).reduce(function (ret, key) {
                ret[key] = preEntry.concat(webpack.entry[key]);
                return ret;
            }, {});
    } else {
        console.warn(
            `could not find an webpack.entry, hot loading may not work`);
    }
};
