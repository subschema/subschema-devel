const pkg  = require('./package.json');

module.exports = function (options, webpack) {
    //make sure everyone uses the same lodash.
    if (!options.useDefine) {
        options.useDefine = {};
    }
    options.useDefine['process.env.SUBSCHEMA_VERSION'] = pkg.version;
    return webpack;
};

