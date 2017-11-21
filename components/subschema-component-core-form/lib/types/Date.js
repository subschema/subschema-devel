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

var DateInput = function (_PureComponent) {
    (0, _inherits3.default)(DateInput, _PureComponent);

    function DateInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DateInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DateInput.__proto__ || (0, _getPrototypeOf2.default)(DateInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleDateChange = function (e) {
            var value = e.target.value;
            _this.props.onChange(new Date(value).getTime());
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DateInput, [{
        key: 'asInputValue',
        value: function asInputValue(value) {
            if (!value) {
                return '';
            }
            return new Date(value).toISOString().substring(0, 10);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                value = _props.value,
                onChange = _props.onChange,
                props = (0, _objectWithoutProperties3.default)(_props, ['value', 'onChange']);

            return _react2.default.createElement('input', (0, _extends3.default)({}, props, { onChange: this.handleDateChange,
                value: this.asInputValue(value) }));
        }
    }]);
    return DateInput;
}(_react.PureComponent);

DateInput.propTypes = {
    onBlur: _subschemaPropTypes2.default.blurValidate,
    value: _subschemaPropTypes2.default.value,
    id: _subschemaPropTypes2.default.id,
    name: _subschemaPropTypes2.default.htmlFor,
    className: _subschemaPropTypes2.default.typeClass,
    placeholder: _subschemaPropTypes2.default.string,
    dataType: _subschemaPropTypes2.default.string,
    fieldAttrs: _subschemaPropTypes2.default.fieldAttrs,
    onChange: _subschemaPropTypes2.default.valueEvent
};
DateInput.defaultProps = {
    type: "date"
};
DateInput.displayName = 'DateInput';
exports.default = DateInput;
//# sourceMappingURL=Date.js.map