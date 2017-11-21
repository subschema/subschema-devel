"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _subschemaPropTypes = require("subschema-prop-types");

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormTemplate = function (_Component) {
    (0, _inherits3.default)(FormTemplate, _Component);

    function FormTemplate() {
        (0, _classCallCheck3.default)(this, FormTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (FormTemplate.__proto__ || (0, _getPrototypeOf2.default)(FormTemplate)).apply(this, arguments));
    }

    (0, _createClass3.default)(FormTemplate, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                children = _props.children,
                style = _props.style,
                fieldAttrs = _props.fieldAttrs,
                formClass = _props.formClass,
                className = _props.className,
                props = (0, _objectWithoutProperties3.default)(_props, ["children", "style", "fieldAttrs", "formClass", "className"]);

            return _react2.default.createElement(
                "form",
                (0, _extends3.default)({}, props, { className: className || formClass }, fieldAttrs),
                children
            );
        }
    }]);
    return FormTemplate;
}(_react.Component);

FormTemplate.propTypes = {
    style: _subschemaPropTypes2.default.style,
    onSubmit: _subschemaPropTypes2.default.submit,
    onReset: _subschemaPropTypes2.default.event,
    accept: _subschemaPropTypes2.default.string,
    acceptCharset: _subschemaPropTypes2.default.string,
    action: _subschemaPropTypes2.default.string,
    autocapitalize: _subschemaPropTypes2.default.oneOf(['on', 'off', 'words', 'sentences', 'charecters', 'none']),
    autocomplete: _subschemaPropTypes2.default.oneOf(['on', 'off']),
    encType: _subschemaPropTypes2.default.oneOf(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']),
    method: _subschemaPropTypes2.default.oneOf(['get', 'post']),
    name: _subschemaPropTypes2.default.string,
    target: _subschemaPropTypes2.default.string,
    fieldAttrs: _subschemaPropTypes2.default.any,
    charSet: _subschemaPropTypes2.default.string,
    disabled: _subschemaPropTypes2.default.bool,
    noValidate: _subschemaPropTypes2.default.bool,
    novalidate: _subschemaPropTypes2.default.deprecated('Please use noValidate instead')

};
FormTemplate.defaultProps = {
    className: '',
    method: 'post'
};
FormTemplate.displayName = "FormTemplate";
exports.default = FormTemplate;
//# sourceMappingURL=FormTemplate.js.map