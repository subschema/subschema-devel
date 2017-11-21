"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Content = require("subschema-core/lib/Content");

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorTemplate = function (_Component) {
    (0, _inherits3.default)(EditorTemplate, _Component);

    function EditorTemplate() {
        (0, _classCallCheck3.default)(this, EditorTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (EditorTemplate.__proto__ || (0, _getPrototypeOf2.default)(EditorTemplate)).apply(this, arguments));
    }

    (0, _createClass3.default)(EditorTemplate, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                Content = _props.Content,
                name = _props.name,
                htmlFor = _props.htmlFor,
                title = _props.title,
                help = _props.help,
                labelClass = _props.labelClass,
                hasTitleClass = _props.hasTitleClass,
                noTitleClass = _props.noTitleClass,
                errorClass = _props.errorClass,
                helpClass = _props.helpClass,
                error = _props.error,
                hasErrorClass = _props.hasErrorClass,
                errorClassName = _props.errorClassName,
                message = _props.message,
                fieldClass = _props.fieldClass,
                children = _props.children;


            if (hasErrorClass) {
                errorClassName = hasErrorClass;
            }
            var titleObj = typeof title == 'string' ? { htmlFor: htmlFor, content: title } : title;
            return _react2.default.createElement(
                "div",
                { className: fieldClass + " " + (error != null ? errorClassName || '' : '') },
                _react2.default.createElement(Content, { content: titleObj, className: labelClass, type: "label" }),
                _react2.default.createElement(
                    "div",
                    { className: title ? hasTitleClass : noTitleClass },
                    children,
                    _react2.default.createElement(Content, { content: error || help, key: "error-block", type: "p",
                        className: error ? errorClass : helpClass })
                )
            );
        }
    }]);
    return EditorTemplate;
}(_react.Component);

EditorTemplate.propTypes = {
    error: _subschemaPropTypes2.default.error,
    title: _subschemaPropTypes2.default.title,
    name: _subschemaPropTypes2.default.string,
    help: _subschemaPropTypes2.default.content,
    style: _subschemaPropTypes2.default.style,
    htmlFor: _subschemaPropTypes2.default.htmlFor,
    Content: _subschemaPropTypes2.default.injectClass
};
EditorTemplate.defaultProps = {
    Content: _Content2.default
};
EditorTemplate.displayName = "EditorTemplate";
exports.default = EditorTemplate;
;
//# sourceMappingURL=EditorTemplate.js.map