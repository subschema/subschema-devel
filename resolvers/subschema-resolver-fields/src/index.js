import {toArray} from 'subschema-utils';

export function normalizeFields(fields) {
    if (fields == null) {
        return fields;
    }
    fields = toArray(fields);
    if (fields.length === 0) {
        return null;
    }
    return fields;
}
export default {
    resolver: {
        fields: function(Clazz, key) {
            Clazz::this.property(key, normalizeFields);
        }
    }
};
