const { cwd }     = require('subschema-dev-utils');
const {ContextReplacementPlugin, DefinePlugin}  = require('webpack');
const { resolve } = require('path');
const toRegex     = (val) => {
    if (val instanceof RegExp) {
        return val;
    }
    const parts = val.split(/^\/(.*)\/$/).slice(1);
    const re  = parts[0];
    const opt = parts[1];
    if (opt) {
        return new RegExp(re, opt);
    }
    return new RegExp(re);
};

module.exports = function ({
                               testDir = cwd('test'),
                               pattern = /.*-test\.jsx?$/,
                               useCoverage = false,
                               testIndex = resolve(__dirname,
                                   'test-index.js')
                           }, webpack) {
    if (useCoverage) {
        console.warn(`enabling code coverage for karma`);
        webpack.module.rules.unshift(
            {
                test   : /\.jsx?$/,
                // instrument only testing sources with Istanbul
                include: [/subschema*/, cwd('src'), cwd('public')],
                use    : {
                    loader : 'istanbul-instrumenter-loader',
                    options: {
                        esModules: true
                    }
                },
                enforce: 'post',
            }
        );
    }
    webpack.plugins.push(new ContextReplacementPlugin(
        /^test$/,
        toRegex(pattern)));

//muck with webpack
    if (!webpack.resolve.alias.test) {
        webpack.resolve.alias.test = testDir;
    }
    console.warn('running tests in ', webpack.resolve.alias.test);

    webpack.devtool         = 'inline-source-map';
    webpack.target          = 'web';
    webpack.node            = webpack.node || {};
    webpack.node.fs         = 'empty';
    webpack.node.net        = 'empty';
    webpack.node.console    = false;
    webpack.node.util       = true;
    webpack.output          = {};
    webpack.output.pathinfo = true;
    webpack.entry           = { test: testIndex };
    webpack.plugins.unshift(new DefinePlugin({
        SUBSCHEMA_TEST_MODULE: JSON.stringify(testDir)
    }));
    return webpack;
};
