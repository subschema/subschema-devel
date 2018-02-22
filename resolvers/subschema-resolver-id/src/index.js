function idValue(value, key, props) {
    if (value == null) return props.path;
    return value;
}
export default {
    resolver: {
        id: function(Clazz, key) {

            Clazz::this.property(key, idValue);
        }
    }
};
