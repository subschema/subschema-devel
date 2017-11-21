const path = require('path');

const resolvePkgDir = name => path.resolve(
    require.resolve(path.join(name, 'package.json')), '..');

module.exports = function (options, webpack) {
    webpack.module.rules.push({
        test   : /\.tmpl$/,
        use    : path.resolve(__dirname, 'tmpl-loader'),
        include: [
            path.resolve(__dirname, 'src')
        ]
    });

    webpack.resolve.alias['babel-core'] = resolvePkgDir('babel-standalone');

    webpack.resolve.alias['subschema-raw'] =
        `!raw-loader!!${require.resolve(
            'subschema/dist/subschema-debug.js')}`;
    return webpack;
};
