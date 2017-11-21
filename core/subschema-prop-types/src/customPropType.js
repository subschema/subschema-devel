

function customPropType(type, name) {

    //wrap type because React may return the same function, especially in
    // production mode
    const typeSpecName = (...args) => {
        if (args.length > 2) {
            return type(...args);
        }
        return customPropType(type(args[0]), args[1]);
    };


    Object.defineProperty(typeSpecName, 'isRequired', {
        enumerable  : false,
        value       : (...args) => type.isRequired(...args),
        configurable: false,
        writable    : false
    });
    if (name) {
        Object.defineProperty(typeSpecName, 'displayName', {
            enumerable  : false,
            value       : name,
            configurable: false,
            writable    : false
        });

        typeSpecName[name] = type;
    }
    return typeSpecName;
}

export default customPropType;
