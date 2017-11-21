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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _RestrictedMixin2 = require('./RestrictedMixin');

var _RestrictedMixin3 = _interopRequireDefault(_RestrictedMixin2);

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

var _subschemaUtils = require('subschema-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Restricted = function (_RestrictedMixin) {
    (0, _inherits3.default)(Restricted, _RestrictedMixin);

    function Restricted() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Restricted);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Restricted.__proto__ || (0, _getPrototypeOf2.default)(Restricted)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelectionRange = function (caret) {
            var input = _this.refs && _reactDom2.default.findDOMNode(_this.refs.input);
            if (!input) {
                return;
            }

            if (_this.state.caret != null) {
                input && input.setSelectionRange(_this.state.caret, _this.state.caret);
            }
        }, _this.handleValueChange = function (e) {
            _this._value(e.target.value, false);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Restricted, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                onValid = _props.onValid,
                formatter = _props.formatter,
                onChange = _props.onChange,
                onKeyDown = _props.onKeyDown,
                fieldAttrs = _props.fieldAttrs,
                value = _props.value,
                props = (0, _objectWithoutProperties3.default)(_props, ['onValid', 'formatter', 'onChange', 'onKeyDown', 'fieldAttrs', 'value']);

            return _react2.default.createElement('input', (0, _extends3.default)({ ref: 'input' }, props, fieldAttrs, {
                value: this.state.value, onKeyDown: this.handleKeyDown,
                onChange: this.handleValueChange }));
        }
    }]);
    return Restricted;
}(_RestrictedMixin3.default);

Restricted.contextTypes = _subschemaPropTypes2.default.contextTypes;
Restricted.defaultProps = {
    onValid: _subschemaUtils.noop,
    value: ''
};
Restricted.propTypes = {
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
    onValid: _subschemaPropTypes2.default.validEvent,
    onChange: _subschemaPropTypes2.default.valueEvent,
    formatter: _subschemaPropTypes2.default.string
};
Restricted.injectedProps = {
    value: '.'
};
Restricted.displayName = 'Restricted';
exports.default = Restricted;
//# sourceMappingURL=Restricted.js.map