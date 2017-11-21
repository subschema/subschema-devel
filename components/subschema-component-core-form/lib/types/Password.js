'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Text2 = require('./Text');

var _Text3 = _interopRequireDefault(_Text2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Password = function (_Text) {
    (0, _inherits3.default)(Password, _Text);

    function Password() {
        (0, _classCallCheck3.default)(this, Password);
        return (0, _possibleConstructorReturn3.default)(this, (Password.__proto__ || (0, _getPrototypeOf2.default)(Password)).apply(this, arguments));
    }

    (0, _createClass3.default)(Password, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Text3.default, this.props);
        }
    }]);
    return Password;
}(_Text3.default);

Password.defaultProps = (0, _extends3.default)({}, _Text3.default.defaultProps, {
    type: 'password'
});
Password.displayName = 'Password';
exports.default = Password;
//# sourceMappingURL=Password.js.map