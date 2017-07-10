import {
    any, arrayOf, bool, func, instanceOf, node, number, object, oneOf,
    oneOfType, shape, string
} from 'prop-types';

//we'll re-export these for convenience in the babel6 world.


function customPropType(type, name) {
    function customPropType$return(...args) {
        return type.apply(api, args);
    }

    customPropType$return.isRequired =
        function customPropType$return$isRequired(...args) {
            return type.isRequired.apply(type, args);
        };
    if (name) {
        customPropType$return.displayName = name;

    }

    return customPropType$return;
}

function propTypeToName(propType) {
    const keys = Object.keys(api), l = keys.length;
    for (let i = 0; i < l; i++) {
        let key = keys[i], f = api[key];
        if (f.isRequired === propType) {
            return '*' + key;
        }
        if (f === propType) {
            return key;
        }
    }
}
function lazyFunction(f) {
    return function () {
        return f.apply(this, arguments);
    };
}


function propTypesToNames(props) {
    return Object.keys(props).reduce((ret, k) => {
        ret[k] = propTypeToName(props[k]);
        return ret;
    }, {});
}
const deprecated  = function (message) {
    return function deprecated$propType(props, propName, componentName) {
        return propName in props ? new Error(
            `DEPRECATED: ${message} in ${componentName}.propTypes.${propName}`)
            : void(0);
    }
};
const conditional = customPropType(oneOfType([string, shape({
    operator: oneOfType([string, func])
})]), 'conditional');

const domType = customPropType(node, 'domType');

const fields = customPropType(oneOfType([string, arrayOf(string)]), 'fields');

const title = customPropType(oneOfType([string, bool]), 'title');

const injector        = customPropType(shape({
    inject: func.isRequired
}), 'injector');
const injectorFactory = customPropType(func, 'injectorFactory');

const blurValidate = customPropType(func, 'blurValidate');

const changeValidate = customPropType(func, 'changeValidate');

const stash = customPropType(func, 'stash');

const unstash = customPropType(func, 'unstash');

const validateFields = customPropType(oneOfType([arrayOf(string), func]),
    'validateFields');

const clearStash = customPropType(func, 'clearStash');

const className = customPropType(oneOfType([string, arrayOf(string)]),
    'className');

const validate = customPropType(func, 'validate');

const value = customPropType(any, 'value');

const message = customPropType(any, 'message');

const error = customPropType(any, 'error');

const errors = customPropType(any, 'errors');

const promise = customPropType(shape({ then: func }), 'promise');

const id = customPropType(string, 'id');

const htmlFor = customPropType(id, 'htmlFor');

const fieldAttrs = customPropType(object, 'fieldAttrs');

const cssClass = customPropType(string, 'cssClass');

const style = customPropType(object, 'style');

const typeClass = customPropType(cssClass, 'typeClass');

const templateClass = customPropType(cssClass, 'templateClass');

const injectedClass = customPropType(any, 'injectedClass');

const event = customPropType(func, 'event');


const validator = customPropType(func, 'validator');

const path = customPropType(string, 'path');

const placeholder = customPropType(string, 'placeholder');

const arrayString = customPropType(oneOfType([string, arrayOf(string)]),
    'arrayString');

const submit = customPropType(func, 'submit');

const listener = customPropType(any, 'listener');

const onButtonClick = customPropType(func, 'onButtonClick');
/**
 * A valueEvent does not expect target.value
 */
const valueEvent    = customPropType(func, 'valueEvent');

/**
 * A targetEvent expects the first arg to have target.value
 */
const targetEvent = customPropType(func, 'targetEvent');

/**
 * A errorEvent expects the first arg to be an error.
 */
const errorEvent = customPropType(func, 'errorEvent');

/**
 * Signify this is a blur Event Listener.
 */
const blurEvent = customPropType(func, 'blurEvent');


/**
 * Signify this is a onValid Event listener.
 */
const validEvent = customPropType(func, 'validEvent');

const dataType = customPropType(string, 'dataType');

const type = customPropType(oneOfType([string, func]), 'type');

const typeDescription = customPropType(oneOfType([string, shape({
    type: string.isRequired
})]), 'typeDescription');

const _transitionTypes = oneOf(['appear', 'enter', 'leave']);
const transition       = customPropType(oneOfType([string, shape({
    transition: string,
    on        : _transitionTypes
})]), 'transition');

/**
 * Signify this property can take an expression.  This
 * allows properties to be tied to the valueManager.  So
 * it will evaluate the property against the valueManager.
 *
 * It will add a listener for each of the corresponding
 * matching strings.
 *
 */
const expression = customPropType(string, 'expression');

const renderedTemplate = customPropType(oneOfType([
        string,
        shape({
            Template: func,
            template: string
        })
    ]),
    'renderedTemplate');

const loader = customPropType(shape({
    loadTemplate : func,
    loadType     : func,
    loadSchema   : func,
    loadValidator: func,
    loadProcessor: func,
    loadOperator : func
}), 'loader');

const valueManager = customPropType(shape({
    addListener: func,

    addErrorListener: func,

    addValidateListener: func,

    addSubmitListener: func,

    addStateListener: func,
}), 'shape');

let contentShape = {
    className: cssClass,
    type     : string,
    children : bool
};

let pContentShape = shape(contentShape);

let contentType = customPropType(
    oneOfType([pContentShape, string, bool, func, number, arrayOf(
        oneOfType([string, string, bool, number, func, pContentShape]))]),
    'contentType');

contentShape.content = contentType;

const content = customPropType(contentType, 'content');

const template = customPropType(oneOfType([string, bool, shape({
    template : oneOfType([string, bool, func]),
    content  : content,
    className: cssClass
}), func]), 'template');

const button = customPropType(oneOfType([string, shape({
    onClick    : event,
    buttonClass: cssClass,
    action     : string,
    name       : string,
    value      : string,
    path       : path,
    iconClass  : cssClass
})]), 'button');

const buttons = customPropType(oneOfType([
    button,
    arrayOf(button),
    shape({
        buttonsClass   : cssClass,
        onButtonClick  : event,
        buttons        : oneOfType([arrayString, arrayOf(button)]),
        buttonTemplate : template,
        buttonsTemplate: template
    })
]), 'buttons');

const fieldsets = customPropType((...args) => fieldset(...args), 'fieldsets');
const fieldset  = customPropType(oneOfType([
    string,
    shape({
        fields,
        legend   : content,
        className: cssClass,
        buttons  : buttons,
        template : template,
        fieldsets
    }),
    arrayOf(shape({
        fields,
        legend   : content,
        className: cssClass,
        buttons,
        template,
        fieldsets
    }))
]), 'fieldset');

const literal = customPropType(
    oneOfType([string, bool, number, instanceOf(Date)]), 'literal');


const options = customPropType(oneOfType([
    arrayString,
    arrayOf(shape({
        label: string,
        val  : literal
    }))
]), 'options');

const optionsGroup = customPropType(oneOfType([
    arrayString,
    arrayOf(shape({
        options  : options,
        group    : string,
        label    : string,
        labelHTML: string,
        val      : literal
    }))
]), 'optionsGroup');

const schema = customPropType(oneOfType([string, object, shape({
    fields   : arrayString,
    fieldsets: oneOfType([arrayString, fieldset, arrayOf(fieldset)]),
    schema   : object,
})]), 'schema');

const array = customPropType(arrayOf(any), 'array');

const validators = customPropType(oneOfType([arrayString, arrayOf(validators)]),
    'validators');

const operator = customPropType(oneOfType([string, func, instanceOf(RegExp)]),
    'operator');

const events = {
    onValidate: event,
    onFocus   : event,
    onBlur    : event,
    onValid   : event,
    onChange  : oneOfType([targetEvent, valueEvent])
};

const field = customPropType(any, 'field');

const mixin = {
    events: events,
    field : {
        ...events,
        title      : content,
        help       : content,
        name       : string,
        placeholder: placeholder,
        dataType   : dataType,
        editorClass: cssClass,
        fieldClass : cssClass,
        field      : {}
    }
};

const contextTypes = Object.freeze({
    valueManager,
    loader,
    injector
});


const processor = customPropType(oneOfType([string, shape({
    fetch : func,
    value : func,
    format: func
})]), 'processor');

const injectClass = customPropType(oneOfType([
    func,
    shape({
        injectClass: func,
        propTypes  : object,
        injectProps: object,
        strict     : bool
    })
]), 'injectClass');

const api = {
    onButtonClick,
    injectorFactory,
    conditional,
    className,
    deprecated,
    transition,
    injectClass,
    blurValidate,
    changeValidate,
    promise,
    id,
    injectedClass,
    fieldAttrs,
    cssClass,
    error,
    errors,
    errorEvent,
    event,
    htmlFor,
    validator,
    path,
    placeholder,
    arrayString,
    listener,
    valueEvent,
    targetEvent,
    blurEvent,
    validEvent,
    dataType,
    type,
    domType,
    typeDescription,
    expression,
    loader,
    valueManager,
    content,
    template,
    button,
    buttons,
    fields,
    fieldset,
    literal,
    options,
    submit,
    optionsGroup,
    schema,
    value,
    validate,
    validators,
    operator,
    events,
    field,
    mixin,
    style,
    contextTypes,
    processor,
    typeClass,
    string,
    bool,
    number,
    object,
    func,
    any,
    node,
    shape,
    arrayOf,
    instanceOf,
    oneOfType,
    oneOf,
    renderedTemplate,
    stash,
    unstash,
    clearStash,
    validateFields

};

export default
({
    propTypesToNames,
    propTypeToName,
    customPropType,
    className,
    conditional,
    blurValidate,
    changeValidate,
    promise,
    id,
    fieldAttrs,
    cssClass,
    error,
    errors,
    event,
    valueEvent,
    targetEvent,
    errorEvent,
    validator,
    path,
    placeholder,
    arrayString,
    listener,
    blurEvent,
    validEvent,
    dataType,
    domType,
    type,
    typeDescription,
    expression,
    loader,
    valueManager,
    content,
    template,
    button,
    buttons,
    fields,
    fieldset,
    injectedClass,
    injector,
    injectorFactory,
    literal,
    htmlFor,
    options,
    optionsGroup,
    onButtonClick,
    schema,
    validators,
    operator,
    events,
    field,
    mixin,
    contextTypes,
    processor,
    submit,
    value,
    validate,
    array,
    title,
    injectClass,
    typeClass,
    style,
    transition,
    deprecated,
    string,
    bool,
    number,
    object,
    func,
    any,
    node,
    shape,
    arrayOf,
    instanceOf,
    oneOfType,
    oneOf,
    renderedTemplate,
    stash,
    unstash,
    clearStash,
    validateFields
});
