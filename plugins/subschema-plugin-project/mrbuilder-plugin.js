const path = require('path');

const resolvePkgDir = name => path.resolve(
    require.resolve(path.join(name, 'package.json')), '..');

module.exports = function ({
                               test = /\.tmpl$/,
                               use = path.resolve(__dirname, 'tmpl-loader'),
                               include,
                               exclude,
                           }, webpack) {
    const info = this.info || console.log;

    info('loading template loader');
    webpack.module.rules.push({
        test,
        use,
        include,
        exclude
    });

    webpack.resolve.alias['babel-core'] = resolvePkgDir('babel-standalone');

    webpack.resolve.alias['subschema-raw'] =
        `!raw-loader!!${require.resolve(
            'subschema/dist/subschema-debug.js')}`;
    return webpack;
};
