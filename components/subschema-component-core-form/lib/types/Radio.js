'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _subschemaUtils = require('subschema-utils');

var _subschemaCore = require('subschema-core');

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compare(val, val2) {
    if (val == null && val2 == null) {
        return true;
    }
    if (val == null || val2 == null) {
        return false;
    }
    return '' + val === '' + val2;
}

var RadioInput = function (_PureComponent) {
    (0, _inherits3.default)(RadioInput, _PureComponent);

    function RadioInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RadioInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RadioInput.__proto__ || (0, _getPrototypeOf2.default)(RadioInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleCheckChange = function (e) {
            //Make a radio behave like a checkbox when there is only 1.
            if (_this.props.forceSelection === false || _this.props.options && _this.props.options.length === 1) {
                _this.props.onChange(compare(e.target.value, _this.props.value) ? null : e.target.value);
            } else {
                _this.props.onChange(e.target.value);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RadioInput, [{
        key: 'renderInput',
        value: function renderInput(onChange, ret, val) {
            return _react2.default.createElement('input', (0, _extends3.default)({ type: 'radio', onChange: onChange }, ret, { value: val }));
        }
    }, {
        key: 'renderOptions',
        value: function renderOptions(options) {
            var _this2 = this;

            options = options || [];
            var onChange = this.handleCheckChange;
            var _props = this.props,
                value = _props.value,
                path = _props.path,
                name = _props.name,
                checkedClass = _props.checkedClass;

            name = name || path;
            return options.map(function (option, index) {
                var val = option.val,
                    label = option.label,
                    labelHTML = option.labelHTML,
                    rest = (0, _objectWithoutProperties3.default)(option, ['val', 'label', 'labelHTML']);

                var ret = (0, _extends3.default)({}, rest, {
                    id: (0, _subschemaUtils.path)(path, index),
                    name: name,
                    checked: compare(value, val)
                });
                return (0, _subschemaCore.RenderTemplate)((0, _extends3.default)({
                    key: 'radio-item-' + index,
                    template: _this2.props.itemTemplate }, ret, {
                    checkedClass: checkedClass,
                    label: label || labelHTML,
                    children: _this2.renderInput(onChange, ret, val)
                }));
                /*
                 return <RenderTemplate key={} template={this.props.itemTemplate} {...ret}
                 checkedClass={checkedClass} label={label || labelHTML}>
                 {this.renderInput(onChange, ret, val)}
                 </RenderTemplate>
                 */
            }, this);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                this.renderOptions(this.props.options)
            );
        }
    }]);
    return RadioInput;
}(_react.PureComponent);

RadioInput.inputClassName = '  ';
RadioInput.defaultProps = {
    itemTemplate: 'RadioItemTemplate',
    options: [],
    forceSelection: false
};
RadioInput.propTypes = {
    onChange: _subschemaPropTypes2.default.valueEvent,
    itemTemplate: _subschemaPropTypes2.default.template,
    forceSelection: _subschemaPropTypes2.default.bool,
    checkedClass: _subschemaPropTypes2.default.cssClass,
    options: _subschemaPropTypes2.default.options.isRequired,
    path: _subschemaPropTypes2.default.path,
    value: _subschemaPropTypes2.default.value,
    id: _subschemaPropTypes2.default.id,
    name: _subschemaPropTypes2.default.htmlFor,
    className: _subschemaPropTypes2.default.typeClass,
    fieldAttrs: _subschemaPropTypes2.default.fieldAttrs
};
RadioInput.displayName = 'RadioInput';
exports.default = RadioInput;
//# sourceMappingURL=Radio.js.map