
const jctx = require.context('./', false, /^(?!.*-setup|index\.js$).*\.jsx?$/);
const rctx = require.context('!!raw-loader!./', false, /-setup\.jsx?$/);
const keysRctx = rctx.keys();
const keys = jctx.keys();
const __default = keys.reduce(function (obj, key) {

    if (/(index|-setup|context)/.test(key)) {
        return obj;
    }
    const setup = obj[key.replace(/\.jsx?$/, '').replace(/.*\//, '')] = jctx(key);
    const setupFile = key.replace(/(\.js)$/, '-setup.js');
    if (keysRctx.indexOf(setupFile) > -1) {
        setup.setupFile = setupFile;
        setup.setupTxt = rctx(setupFile);
    }
    return obj;
}, {});

module.exports = __default;// {__esModule: true, default: __default};
