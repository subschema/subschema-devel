const util = require('util');
if (!util.inherits) {
    util.inherits = function (ctor, superCtor) {
        if (ctor == null || superCtor == null) {
            throw new Error(`constructor ans super must be defined`);
        }
        ctor.super_ = superCtor;
        Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
    };
}
