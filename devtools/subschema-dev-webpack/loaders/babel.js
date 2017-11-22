const options  = require('./index');
module.exports = ({
                      test = /\.jsx?$/,
                      include = [/\/test\/*/, /\/src\/*/, /\/public\/*/, /subschema[^/]*\/src\/*/],
                      use = {
                          loader: 'babel-loader',
                          options
                      }
                  }, webpack) => {

    webpack.module.rules.push({
        test,
        include,
        use,
    });
    return webpack;
};
