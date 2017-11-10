const { version } = require('./package.json');

module.exports = function (options, webpack) {
    options.useDefine['process.env.SUBSCHEMA_VERSION'] = version;
    return webpack;
};
