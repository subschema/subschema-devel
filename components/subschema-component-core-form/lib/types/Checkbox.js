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

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function (_PureComponent) {
    (0, _inherits3.default)(Checkbox, _PureComponent);

    function Checkbox() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Checkbox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Checkbox.__proto__ || (0, _getPrototypeOf2.default)(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (e) {
            var value = _this.props.value;

            //Blur does not get called on checkbox, so we do check on change
            // anyways.

            var val = e.target.checked ? !value ? true : value : !value ? false : null;
            _this.props.onChange(val);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Checkbox, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                onChange = _props.onChange,
                onValidate = _props.onValidate,
                value = _props.value,
                className = _props.className,
                checkedClass = _props.checkedClass,
                props = (0, _objectWithoutProperties3.default)(_props, ['onChange', 'onValidate', 'value', 'className', 'checkedClass']);


            var checked = typeof value === 'boolean' ? value : value == null || value === '' ? this.props.checked : true;
            return _react2.default.createElement('input', (0, _extends3.default)({}, props, { value: value == null ? '' : value,
                className: className + ' ' + (checked ? checkedClass : ''),
                checked: checked == null ? false : checked,
                onChange: this.handleChange }));
        }
    }]);
    return Checkbox;
}(_react.PureComponent);

Checkbox.inputClassName = ' ';
Checkbox.propTypes = {
    onChange: _subschemaPropTypes2.default.valueEvent,
    onBlur: _subschemaPropTypes2.default.blurValidate,
    value: _subschemaPropTypes2.default.value,
    id: _subschemaPropTypes2.default.id,
    name: _subschemaPropTypes2.default.htmlFor,
    className: _subschemaPropTypes2.default.typeClass,
    checkedClass: _subschemaPropTypes2.default.cssClass,
    onValidate: _subschemaPropTypes2.default.changeValidate
};
Checkbox.defaultProps = {
    type: 'checkbox',
    checkedClass: ''
};
Checkbox.displayName = 'Checkbox';
exports.default = Checkbox;
//# sourceMappingURL=Checkbox.js.map