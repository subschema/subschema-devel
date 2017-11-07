var path       = require('path');
var resolvePkgDir = function(name){
    return path.resolve(require.resolve(path.join(name, 'package.json')), '..');
}
module.exports = function (options, webpack) {
    webpack.module.rules.push({
        test   : /\.tmpl$/,
        use    : path.resolve(__dirname, 'tmpl-loader'),
        include: [
            path.resolve(__dirname, 'src')
        ]
    });

    const resolveLoader = webpack.resolveLoader
                          || (webpack.resolveLoader = {});

    (resolveLoader.alias || (resolveLoader.alias = {}))['raw-loader'] =
        resolvePkgDir('raw-loader');

    webpack.resolve.alias['subschema-raw'] =
        `!raw-loader!!${require.resolve(
            'subschema/dist/subschema-debug.js')}`;
    return webpack;
};
