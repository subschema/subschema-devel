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

var noRe = /^(-|\+)?([0-9]*\.)?$/,
    numRe = /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/;

var NumberInput = function (_PureComponent) {
    (0, _inherits3.default)(NumberInput, _PureComponent);

    function NumberInput(props) {
        var _ref;

        (0, _classCallCheck3.default)(this, NumberInput);

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = NumberInput.__proto__ || (0, _getPrototypeOf2.default)(NumberInput)).call.apply(_ref, [this, props].concat(rest)));

        _this.handleDateChange = function (e) {

            var value = e.target.value;
            //Not a valid number but valid to become a number
            if (value === '') {
                _this.props.onChange(null);
            } else if (noRe.test(value)) {
                if (/\.$/.test(value)) {
                    _this.props.onChange(parseFloat(value));
                    _this.setValue(value);
                } else {
                    _this.setValue(value);
                }
            } else
                //check if real actual numbers.
                if (numRe.test(value)) {
                    _this.props.onChange(parseFloat(value));
                } else {
                    _this.forceUpdate();
                    return false;
                }
        };

        var state = _this.state || (_this.state = {});
        state.value = props.value;

        return _this;
    }

    (0, _createClass3.default)(NumberInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.value !== this.props.value) {
                this.setState({ value: newProps.value });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                onChange = _props.onChange,
                value = _props.value,
                props = (0, _objectWithoutProperties3.default)(_props, ['onChange', 'value']);

            return _react2.default.createElement('input', (0, _extends3.default)({}, props, { value: this.state.value,
                onChange: this.handleDateChange }));
        }
    }]);
    return NumberInput;
}(_react.PureComponent);

NumberInput.propTypes = {
    onBlur: _subschemaPropTypes2.default.blurValidate,
    onKeyDown: _subschemaPropTypes2.default.event,
    onKeyUp: _subschemaPropTypes2.default.event,
    onFocus: _subschemaPropTypes2.default.event,
    onPaste: _subschemaPropTypes2.default.event,
    value: _subschemaPropTypes2.default.value,
    id: _subschemaPropTypes2.default.id,
    name: _subschemaPropTypes2.default.htmlFor,
    className: _subschemaPropTypes2.default.typeClass,
    placeholder: _subschemaPropTypes2.default.string,
    fieldAttrs: _subschemaPropTypes2.default.fieldAttrs,
    onChange: _subschemaPropTypes2.default.valueEvent
};
NumberInput.displayName = 'NumberInput';
exports.default = NumberInput;
//# sourceMappingURL=Number.js.map