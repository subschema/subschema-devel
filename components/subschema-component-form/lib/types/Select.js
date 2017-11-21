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

var _subschemaUtils = require('subschema-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function (_PureComponent) {
    (0, _inherits3.default)(Select, _PureComponent);

    function Select() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Select);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelect = function (e) {
            var _this$props = _this.props,
                multiple = _this$props.multiple,
                placeholder = _this$props.placeholder;

            if (multiple) {
                //normalize multiple  selection
                var values = [],
                    options = e.target.options,
                    i = 0,
                    l = options.length,
                    option;
                for (; i < l; i++) {
                    option = options[i];
                    if (option.selected) {
                        if (option.label != placeholder) {
                            values.push(option.value);
                        }
                    }
                }
                _this.props.onChange(values);
                return;
            } else if (e.target.value === placeholder) {
                _this.props.onChange(null);
                return;
            }
            _this.props.onChange(e.target.value);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Select, [{
        key: 'renderOptions',
        value: function renderOptions(value) {
            var _props = this.props,
                multiple = _props.multiple,
                options = _props.options,
                placeholder = _props.placeholder;


            options = options || [];
            var hasValue = false,
                ret = options.map(multiple ? function (o, i) {
                return _react2.default.createElement(
                    'option',
                    { key: 's' + i, value: o.val },
                    o.label
                );
            } : function (o, i) {
                if (!hasValue && o.val + '' == value + '') {
                    hasValue = true;
                }
                return _react2.default.createElement(
                    'option',
                    { key: 's' + i, value: o.val },
                    o.label
                );
            });

            if (placeholder) {
                ret.unshift(_react2.default.createElement(
                    'option',
                    { key: 'null-' + options.length },
                    placeholder
                ));
            }
            return ret;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                onValidate = _props2.onValidate,
                onChange = _props2.onChange,
                value = _props2.value,
                path = _props2.path,
                _props2$fieldAttrs = _props2.fieldAttrs,
                fieldAttrs = _props2$fieldAttrs === undefined ? {} : _props2$fieldAttrs,
                options = _props2.options,
                props = (0, _objectWithoutProperties3.default)(_props2, ['onValidate', 'onChange', 'value', 'path', 'fieldAttrs', 'options']);

            if (props.multiple && !(0, _subschemaUtils.isArray)(value)) {
                value = value ? [value] : [];
            }
            return _react2.default.createElement(
                'select',
                (0, _extends3.default)({}, props, { value: value }, fieldAttrs, {
                    onChange: this.handleSelect }),
                this.renderOptions(value)
            );
        }
    }]);
    return Select;
}(_react.PureComponent);

Select.propTypes = {
    onBlur: _subschemaPropTypes2.default.blurValidate,
    value: _subschemaPropTypes2.default.value,
    id: _subschemaPropTypes2.default.id,
    name: _subschemaPropTypes2.default.htmlFor,
    className: _subschemaPropTypes2.default.typeClass,
    fieldAttrs: _subschemaPropTypes2.default.fieldAttrs,
    options: _subschemaPropTypes2.default.options,
    multiple: _subschemaPropTypes2.default.bool,
    onChange: _subschemaPropTypes2.default.valueEvent,
    placeholder: _subschemaPropTypes2.default.placeholder,
    onValidate: _subschemaPropTypes2.default.changeValidate
};
Select.defaultProps = {
    options: [],
    multiple: false,
    value: ''
};
Select.injectedProps = {
    value: '.'
};
Select.displayName = 'Select';
exports.default = Select;
//# sourceMappingURL=Select.js.map