import {noop} from 'subschema-utils';

function handleEvent(value) {
    if (value == null) return noop;
    return value;
}

export default {
    resolver: {
        event: function(Clazz, key) {
            Clazz::this.property(key, handleEvent);
        }
    }
};
