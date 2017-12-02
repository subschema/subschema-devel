const { cwd }    = require('subschema-dev-utils');
const DEV_SERVER = {
    filename          : 'index.js',
    historyApiFallback: true,
    inline            : true,
    contentBase       : cwd('public'),
    port              : 8082,
};

module.exports = function (devServer, webpack) {

    webpack.devServer = Object.assign({}, DEV_SERVER, devServer);

    return webpack;
};
