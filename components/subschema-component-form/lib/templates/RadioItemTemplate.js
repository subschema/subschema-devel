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

var _Content = require("subschema-core/lib/Content");

var _Content2 = _interopRequireDefault(_Content);

var _subschemaPropTypes = require("subschema-prop-types");

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioItemTemplate = function (_Component) {
    (0, _inherits3.default)(RadioItemTemplate, _Component);

    function RadioItemTemplate() {
        (0, _classCallCheck3.default)(this, RadioItemTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (RadioItemTemplate.__proto__ || (0, _getPrototypeOf2.default)(RadioItemTemplate)).apply(this, arguments));
    }

    (0, _createClass3.default)(RadioItemTemplate, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                Content = _props.Content,
                label = _props.label,
                namespaceClass = _props.namespaceClass,
                labelHTML = _props.labelHTML,
                children = _props.children,
                checked = _props.checked,
                checkedClass = _props.checkedClass,
                uncheckedClass = _props.uncheckedClass,
                id = _props.id,
                path = _props.path;

            id = id || path;
            label = labelHTML ? labelHTML : label;
            checkedClass = checkedClass || '';
            label = typeof label === 'string' ? {
                className: [namespaceClass, checked ? checkedClass : uncheckedClass].join(' '),
                type: this.props.wrapperType,
                content: [{
                    type: this.props.labelType,
                    className: '',
                    htmlFor: id,
                    //true -outputs child.
                    content: [true, label]
                }]
            } : label;
            return _react2.default.createElement(
                Content,
                { content: label },
                children
            );
        }
    }]);
    return RadioItemTemplate;
}(_react.Component);

RadioItemTemplate.propTypes = {
    label: _subschemaPropTypes2.default.any,
    labelHTML: _subschemaPropTypes2.default.any,
    checked: _subschemaPropTypes2.default.bool,
    checkedClass: _subschemaPropTypes2.default.string,
    id: _subschemaPropTypes2.default.id,
    path: _subschemaPropTypes2.default.path,
    Content: _subschemaPropTypes2.default.injectClass,
    style: _subschemaPropTypes2.default.style
};
RadioItemTemplate.defaultProps = {
    Content: _Content2.default,
    namespaceClass: "radio",
    checkedClass: "",
    uncheckedClass: "",
    labelType: 'label',
    wrapperType: 'div'
};
RadioItemTemplate.displayName = "RadioItemTemplate";
exports.default = RadioItemTemplate;
//# sourceMappingURL=RadioItemTemplate.js.map