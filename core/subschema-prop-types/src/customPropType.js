import {warning} from 'subschema-utils';
const propTypeToName         = new Map();
export const resolvePropType = (propType) => {
    if (typeof propType === 'string') {
        for (const [pT, name] of propTypeToName) {
            if (name === propType) {
                return pT;
            }
        }
    }
    return propTypeToName.get(propType);
};

function customPropType(type, name) {

    //wrap type because React may return the same function, especially in
    // production mode

    const typeSpecName = (...args) => {
        if (args.length > 2) {
            return type(...args);
        }
        return customPropType(type(args[0]), args[1]);
    };

    const isRequired = {
        enumerable  : false,
        value       : (...args) => type.isRequired(...args),
        configurable: false,
        writable    : false
    };
    Object.defineProperty(typeSpecName, 'isRequired',isRequired);

    //warning(name, 'Please provide a name for your propType [%s]', type);
    if (name) {
        Object.defineProperty(typeSpecName, 'displayName', {
            enumerable  : false,
            value       : name,
            configurable: false,
            writable    : false
        });

        typeSpecName[name] = type;
        propTypeToName.set(typeSpecName, name);
        propTypeToName.set(isRequired.value, name);
    }else{

    }

    return typeSpecName;
}

export default customPropType;
