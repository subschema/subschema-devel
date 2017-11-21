'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxTemplate = function (_Component) {
    (0, _inherits3.default)(CheckboxTemplate, _Component);

    function CheckboxTemplate() {
        (0, _classCallCheck3.default)(this, CheckboxTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (CheckboxTemplate.__proto__ || (0, _getPrototypeOf2.default)(CheckboxTemplate)).apply(this, arguments));
    }

    (0, _createClass3.default)(CheckboxTemplate, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                checkboxClass = _props.checkboxClass,
                checked = _props.checked,
                checkedClass = _props.checkedClass,
                uncheckedClass = _props.uncheckedClass,
                label = _props.label;

            return _react2.default.createElement(
                'div',
                { className: checkboxClass + ' ' + (checked ? checkedClass : uncheckedClass) + ' ' },
                _react2.default.createElement(
                    'label',
                    null,
                    children,
                    label
                )
            );
        }
    }]);
    return CheckboxTemplate;
}(_react.Component);

CheckboxTemplate.propTypes = {
    label: _subschemaPropTypes2.default.node,
    style: _subschemaPropTypes2.default.style,
    checked: _subschemaPropTypes2.default.bool
};
CheckboxTemplate.defaultProps = {
    style: "CheckboxTemplate",
    checkedClass: "",
    uncheckedClass: "",
    checkboxClass: ""
};
CheckboxTemplate.displayName = 'CheckboxTemplate';
exports.default = CheckboxTemplate;
//# sourceMappingURL=CheckboxTemplate.js.map