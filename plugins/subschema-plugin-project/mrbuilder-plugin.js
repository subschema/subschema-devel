const path = require('path');

const resolvePkgDir = name => path.resolve(
    require.resolve(path.join(name, 'package.json')), '..');

module.exports = function ({
                               test = /\.tmpl$/,
                               include,
                               exclude,
                           }, webpack) {
    const info = this.info || console.log;

    info('loading template loader');
    webpack.module.rules.push({
        test,
        use: [
            path.resolve(__dirname, 'tmpl-loader'),
        ],
        include,
        exclude
    });

    const oNoParse = webpack.module.noParse;
    if (!oNoParse) {
        webpack.module.noParse = /babel\.min/;
    } else {
        webpack.module.noParse = function (v) {
            if (oNoParse) {

                if (oNoParse instanceof RegExp) {
                    if (oNoParse.test(v)) {
                        return true;
                    }
                } else if (oNoParse(v)) {
                    return true;
                }
            }

            return /babel\.min/.test(v)

        };
    }
    webpack.resolve.alias.debug=`${__dirname}/src/debug`;
    webpack.resolve.alias['babel-core'] =
        require.resolve('babel-standalone/babel.min');

    webpack.resolve.alias['subschema-raw'] =
        `!raw-loader!!${require.resolve(
            'subschema/dist/subschema-debug.js')}`;

    return webpack;
};
