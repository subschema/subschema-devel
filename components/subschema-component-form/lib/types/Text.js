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

var Text = function (_PureComponent) {
    (0, _inherits3.default)(Text, _PureComponent);

    function Text() {
        (0, _classCallCheck3.default)(this, Text);
        return (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).apply(this, arguments));
    }

    (0, _createClass3.default)(Text, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dataType = _props.dataType,
                fieldAttrs = _props.fieldAttrs,
                props = (0, _objectWithoutProperties3.default)(_props, ['dataType', 'fieldAttrs']);

            return _react2.default.createElement('input', (0, _extends3.default)({ type: dataType }, fieldAttrs, props));
        }
    }]);
    return Text;
}(_react.PureComponent);

Text.defaultProps = {
    type: 'text',
    value: ''
};
Text.propTypes = {
    onKeyDown: _subschemaPropTypes2.default.event,
    className: _subschemaPropTypes2.default.typeClass,
    placeholder: _subschemaPropTypes2.default.string,
    dataType: _subschemaPropTypes2.default.string,
    fieldAttrs: _subschemaPropTypes2.default.fieldAttrs
};
Text.injectedProps = {
    value: "."
};
Text.displayName = 'Text';
exports.default = Text;
//# sourceMappingURL=Text.js.map