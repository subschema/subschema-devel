const babel = require('subschema-dev-babel');
/**
 * {
        "extensions": {
          "es6": "javascript",
          "js": "javascript",
          "jsx": "javascript",
          "sh": "shell"
        },
        "theme": "atom-one-light",
        "highlighter": "hljs"
      }
 * @param test
 * @param include
 * @param exclude
 * @param extensions
 * @param webpack
 * @returns {*}
 */
module.exports =
    function ({
                  test = /\.md$/, include, exclude, extensions = {
                      'sh'  : 'shell',
                      'js'  : 'javascript',
                      'es6' : 'javascript',
                      'jsx' : 'javascript',
                      'css' : 'stylesheets',
                      'less': 'less',
                      'styl': 'stylus'
                  }, highlighter = 'hljs', theme = 'atom-one-light'
              },
              webpack) {
        webpack.module.rules.push(
            {
                test,
                include,
                exclude,
                use: [{
                    loader : 'babel-loader',
                    options: babel
                }, {
                    loader : require.resolve('subschema-dev-markdown'),
                    options: {
                        extensions,
                        highlighter,
                        theme
                    }
                }]
            });
        return webpack;
    };
