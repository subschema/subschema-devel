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

var AutocompleteItemTemplate = function (_Component) {
    (0, _inherits3.default)(AutocompleteItemTemplate, _Component);

    function AutocompleteItemTemplate() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, AutocompleteItemTemplate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutocompleteItemTemplate.__proto__ || (0, _getPrototypeOf2.default)(AutocompleteItemTemplate)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
            e && e.preventDefault();
            _this.props.onSelect(_this.props.data);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(AutocompleteItemTemplate, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                data = _props.data,
                focus = _props.focus,
                itemClass = _props.itemClass,
                focusedClass = _props.focusedClass,
                value = _props.value,
                processor = _props.processor;

            var __html = processor.format(data, value, true);
            return __html == null ? null : _react2.default.createElement('li', { ref: 'item', className: itemClass + '  ' + (focus ? focusedClass : ''), onClick: this.handleClick,
                dangerouslySetInnerHTML: { __html: __html } });
        }
    }]);
    return AutocompleteItemTemplate;
}(_react.Component);

AutocompleteItemTemplate.defaultProps = {
    data: null,
    value: null,
    focus: false,
    processor: null
};
AutocompleteItemTemplate.propTypes = {
    onSelect: _subschemaPropTypes2.default.event,
    style: _subschemaPropTypes2.default.style
};
AutocompleteItemTemplate.displayName = 'AutocompleteItemTemplate';
exports.default = AutocompleteItemTemplate;
//# sourceMappingURL=AutocompleteItemTemplate.js.map