// Karma configuration
const webpack = require('subschema-dev-webpack');
const path    = require('path');
const { cwd } = require('subschema-dev-utils');

const {
          SUBSCHEMA_KARMA_FILES  = '',
          SUBSCHEMA_COVERAGE     = '',
          SUBSCHEMA_COVERAGE_DIR = '',
          SUBSCHEMA_DEBUG,
          SUBSCHEMA_CHROME_DIR   = path.resolve(process.env.HOME,
              '.subschema-chrome'),
          TRAVIS
      } = process.env;

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const useCoverage = !!SUBSCHEMA_COVERAGE || !!SUBSCHEMA_COVERAGE_DIR;

const files = Object.values(webpack.entry);
if (SUBSCHEMA_KARMA_FILES) {
    files.unshift(...SUBSCHEMA_KARMA_FILES.split(/,\s*/));
    console.warn(`using files ${files}`);
}

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
            [webpack.entry.test]: ['webpack', 'sourcemap']
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
    if (useCoverage) {
        karmaConf.reporters.push('coverage-istanbul');

        karmaConf.coverageIstanbulReporter = {
            reports                : ['lcovonly', 'text-summary'],
            fixWebpackSourcePaths  : true,
            skipFilesWithNoCoverage: true,
            dir                    : SUBSCHEMA_COVERAGE_DIR
        };
        karmaConf.plugins.push('karma-coverage-istanbul-reporter')
    }
    if (TRAVIS) {
        karmaConf.browsers = ['Firefox'];
    }
    if (SUBSCHEMA_DEBUG) {
        console.log('karma-conf');
        console.dir(karmaConf);
    }
    config.set(karmaConf);
};
