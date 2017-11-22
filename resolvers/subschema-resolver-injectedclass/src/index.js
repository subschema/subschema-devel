/**
 * Returns the injected class as a property to the child class.
 * Useful for Content.
 *
 * @param Clazz
 * @param key
 */
export default {
    resolver: {
        injectedClass(Clazz, key) {

            Clazz::this.property(key, function () {
                return () => Clazz;
            });
        }
    }
};
