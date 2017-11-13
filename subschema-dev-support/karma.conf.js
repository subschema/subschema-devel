// Karma configuration
const webpack             = require('./webpack.config');
const webpackObj          = require('webpack');
const path                = require('path');
const fs                  = require('fs');
const { resolveMap, cwd } = require('./webpack-utils');

const {
          SUBSCHEMA_KARMA_FILES  = '',
          SUBSCHEMA_TEST_DIR     = __dirname,
          SUBSCHEMA_COVERAGE     = '',
          SUBSCHEMA_COVERAGE_DIR = '',
          SUBSCHEMA_DEBUG,
          SUBSCHEMA_CHROME_DIR   = path.resolve(process.env.HOME,
              '.subschema-chrome'),
          SUBSCHEMA_TEST_MODULE  = fs.existsSync(cwd('test')) ? cwd('test')
              : cwd(),
          SUBSCHEMA_TEST_PATTERN = '-test\.jsx?',
          TRAVIS
      } = process.env;

const useCoverage = !!SUBSCHEMA_COVERAGE || !!SUBSCHEMA_COVERAGE_DIR;
const test        = path.resolve(SUBSCHEMA_TEST_DIR, 'test-index.js');
if (!webpack.output) {
    webpack.output = {};
}


//muck with webpack
if (!webpack.resolve.alias.test) {
    webpack.resolve.alias.test = SUBSCHEMA_TEST_MODULE;
}
console.warn('running tests in ', webpack.resolve.alias.test);

webpack.devtool      = 'inline-source-map';
webpack.target       = 'web';
webpack.node         = webpack.node || {};
webpack.node.fs      = 'empty';
webpack.node.net     = 'empty';
webpack.node.console = false;
webpack.node.util    = true;
//webpack.resolve.alias.util = require.resolve('util/util.js');
//webpack.resolve.alias['util/util.js'] = require.resolve('util/util.js');
webpack.output.pathinfo = true;

Object.assign(webpack.resolve.alias, resolveMap('subschema-test-support'));

if (useCoverage) {
    console.warn(`enabling code coverage for karma`);
    webpack.module.rules.unshift(
        {
            test   : /\.jsx?$/,
            // instrument only testing sources with Istanbul
            include: [/subschema*/, cwd('src'), cwd('public')],
            use    : 'istanbul-instrumenter-loader'
        }
    );
}
if (SUBSCHEMA_TEST_PATTERN) {
    webpack.plugins.push(new webpackObj.ContextReplacementPlugin(/^test$/,
        new RegExp(SUBSCHEMA_TEST_PATTERN), true));
}
const files = [test];
if (SUBSCHEMA_KARMA_FILES) {
    files.unshift(...SUBSCHEMA_KARMA_FILES.split(/,\s*/));
    console.warn(`using files ${files}`);
}
webpack.plugins.push(new webpackObj.DefinePlugin({
    'process.env.SUBSCHEMA_TEST_MODULE' : JSON.stringify(SUBSCHEMA_TEST_MODULE),
    'process.env.SUBSCHEMA_TEST_PATTERN': JSON.stringify(SUBSCHEMA_TEST_PATTERN)
}));

module.exports = function (config) {

    const karmaConf = {

        // base path, that will be used to resolve files and exclude
        basePath: cwd(),


        // frameworks to use
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files,

        customLaunchers: {
            Chrome_with_debugging: {
                base         : 'Chrome',
                chromeDataDir: SUBSCHEMA_CHROME_DIR
            },
            Chrome_travis_ci     : {
                base : 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        // list of preprocessors
        preprocessors: {
            [test]: ['webpack', 'sourcemap']
        },


        webpack,

        webpackMiddleware: {
            stats: {
                colors: true
            }
        },


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['spec'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        /**
         * level of logging
         *
         * possible values:
         * config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN
         * config.LOG_INFO    || config.LOG_DEBUG
         */
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file
        // changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install
        // karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install
        // karma-safari-launcher`) - PhantomJS - IE (only Windows; has to be
        // installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // List plugins explicitly, since autoloading karma-webpack
        // won't work here
        plugins: [
            require('karma-mocha'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-spec-reporter'),
            require('karma-sourcemap-loader'),
            require('karma-webpack')
        ]
    };
    if (TRAVIS) {
        karmaConf.browsers = ['Firefox'];
    }
    if (SUBSCHEMA_DEBUG) {
        console.log('karma-conf');
        console.dir(karmaConf);
        c
    }
    config.set(karmaConf);
};
