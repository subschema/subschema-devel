const { version } = require('./package.json');

module.exports = function (options, webpack) {
    options.useDefine['SUBSCHEMA_VERSION'] = version;
    return webpack;
};
