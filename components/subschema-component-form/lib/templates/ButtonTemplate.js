'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function (_Component) {
    (0, _inherits3.default)(Button, _Component);

    function Button() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
            var _this$props = _this.props,
                onChange = _this$props.onChange,
                value = _this$props.value,
                name = _this$props.name,
                action = _this$props.action,
                label = _this$props.label;

            if (name && onChange) {
                onChange(value, name);
            }
            _this.props.onClick(e, value || action || label, _this);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Button, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                buttonClass = _props.buttonClass,
                className = _props.className,
                title = _props.title,
                iconClass = _props.iconClass,
                onClick = _props.onClick,
                label = _props.label,
                props = (0, _objectWithoutProperties3.default)(_props, ['buttonClass', 'className', 'title', 'iconClass', 'onClick', 'label']);

            return _react2.default.createElement(
                'button',
                (0, _extends3.default)({ className: className || buttonClass }, props, { onClick: this.handleClick }),
                iconClass ? _react2.default.createElement('i', { className: iconClass }) : null,
                label
            );
        }
    }]);
    return Button;
}(_react.Component);

Button.defaultProps = {
    action: 'Submit',
    label: 'Submit',
    buttonClass: 'btn',
    iconClass: null,
    disabled: false
};
Button.propTypes = {
    onClick: _propTypes2.default.func,
    disabled: _propTypes2.default.bool,
    title: _propTypes2.default.string,
    buttonClass: _propTypes2.default.string,
    iconClass: _propTypes2.default.string,
    activeClass: _propTypes2.default.string,
    action: _propTypes2.default.string,
    label: _propTypes2.default.string,
    name: _propTypes2.default.string,
    type: _propTypes2.default.string,
    value: _propTypes2.default.any,
    className: _propTypes2.default.string,
    formAction: _propTypes2.default.string,
    formEncType: _propTypes2.default.string,
    formMethod: _propTypes2.default.string,
    formNoValidate: _propTypes2.default.string,
    formTarget: _propTypes2.default.string
};
Button.displayName = 'Button';
exports.default = Button;
//# sourceMappingURL=ButtonTemplate.js.map