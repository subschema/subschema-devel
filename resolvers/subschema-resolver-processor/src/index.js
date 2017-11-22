function loadProcessor(value, key, props, {loader}){
    return loader.loadProcessor(value);
}

export default {
    resolver: {
        processor: function(Clazz, key) {
            Clazz::this.property(key, loadProcessor);
        }
    }
};
