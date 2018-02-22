function idValue(value, key, props) {
    if (value == null) return props.id || props.path;
    return value;
}
export default {
    resolver: {
        htmlFor: function(Clazz, key) {

            Clazz::this.property(key, idValue);
        }
    }
};
