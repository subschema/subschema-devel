const babel = require('subschema-dev-babel');

module.exports =
    function ({ test = /\.md$/, include, exclude }, webpack) {
        webpack.module.rules.push(
            {
                test,
                include,
                exclude,
                use: [{
                    loader : 'babel-loader',
                    options: babel
                }, {
                    loader: require.resolve('subschema-dev-markdown'),
                }]
            });
        return webpack;
    };
