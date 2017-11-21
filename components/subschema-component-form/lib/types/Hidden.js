'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

/**
 * Hidden does need a template, and does not care about errors.
 * but we will
 */
var Hidden = function (_PureComponent) {
    (0, _inherits3.default)(Hidden, _PureComponent);

    function Hidden() {
        (0, _classCallCheck3.default)(this, Hidden);
        return (0, _possibleConstructorReturn3.default)(this, (Hidden.__proto__ || (0, _getPrototypeOf2.default)(Hidden)).apply(this, arguments));
    }

    (0, _createClass3.default)(Hidden, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                value = _props.value,
                asJSON = _props.asJSON,
                props = (0, _objectWithoutProperties3.default)(_props, ['value', 'asJSON']);

            return _react2.default.createElement('input', (0, _extends3.default)({}, props, {
                value: asJSON && value !== void 0 ? (0, _stringify2.default)(value) : value }));
        }
        //only unnormal is asJSON, which will set the value to json rather than a
        // string so that it can be used to hold hidden state of complex
        // structures.

    }]);
    return Hidden;
}(_react.PureComponent);

Hidden.noTemplate = true;
Hidden.propTypes = {
    asJSON: _subschemaPropTypes2.default.bool,
    onChange: _subschemaPropTypes2.default.targetEvent,
    value: _subschemaPropTypes2.default.value
};
Hidden.template = false;
Hidden.defaultProps = {
    type: "hidden",
    asJSON: false
};
Hidden.displayName = 'Hidden';
exports.default = Hidden;
//# sourceMappingURL=Hidden.js.map