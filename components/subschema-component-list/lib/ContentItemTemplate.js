'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var ContentItemTemplate = function (_Component) {
    (0, _inherits3.default)(ContentItemTemplate, _Component);

    function ContentItemTemplate() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ContentItemTemplate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ContentItemTemplate.__proto__ || (0, _getPrototypeOf2.default)(ContentItemTemplate)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
            e && e.preventDefault();
            _this.props.onClick(_this.props.pos, _this.props.value.value, _this.props.pid);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    //(pos, val, pid)


    (0, _createClass3.default)(ContentItemTemplate, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                value = _props.value,
                showKey = _props.showKey,
                children = _props.children,
                itemInnerClass = _props.itemInnerClass,
                itemClass = _props.itemClass,
                clickableClass = _props.clickableClass,
                labelKey = _props.labelKey;

            var key = value.key || '';
            var _label = labelKey ? (0, _subschemaUtils.get)(value.value, labelKey, '') : value.value;
            return _react2.default.createElement(
                'span',
                { onClick: this.handleClick,
                    className: this.props.onClick ? clickableClass : '' },
                showKey ? _react2.default.createElement(
                    'h4',
                    { className: itemClass },
                    key
                ) : null,
                _react2.default.createElement(
                    'span',
                    { className: itemInnerClass },
                    _label
                ),
                children
            );
        }
    }]);
    return ContentItemTemplate;
}(_react.Component);

ContentItemTemplate.propTypes = {
    onClick: _subschemaPropTypes2.default.func,
    pid: _subschemaPropTypes2.default.any,
    pos: _subschemaPropTypes2.default.number,
    showKey: _subschemaPropTypes2.default.bool,
    labelKey: _subschemaPropTypes2.default.string,
    itemInnerClass: _subschemaPropTypes2.default.string,
    clickableClass: _subschemaPropTypes2.default.string,
    value: function value(props, propName, componentName) {
        var value = props[propName];
        var labelKey = props.labelKey;

        for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
            rest[_key2 - 3] = arguments[_key2];
        }

        if ('value' in props) {
            if (labelKey) {
                return _subschemaPropTypes2.default.node.apply(_subschemaPropTypes2.default, [props.value, labelKey, componentName].concat((0, _toConsumableArray3.default)(rest)));
            } else {
                return _subschemaPropTypes2.default.node.apply(_subschemaPropTypes2.default, [value, 'value', componentName].concat((0, _toConsumableArray3.default)(rest)));
            }
        }
        if (props.showKey) {
            return _subschemaPropTypes2.default.node.apply(_subschemaPropTypes2.default, [props, 'key', componentName].concat((0, _toConsumableArray3.default)(rest)));
        }
    }
};
ContentItemTemplate.defaultProps = {
    clickableClass: 'clickable'
};
ContentItemTemplate.displayName = 'ContentItemTemplate';
exports.default = ContentItemTemplate;
//# sourceMappingURL=ContentItemTemplate.js.map