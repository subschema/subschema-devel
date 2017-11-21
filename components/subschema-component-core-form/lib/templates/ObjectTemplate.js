'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = ObjectTemplate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ObjectTemplate(props) {
    var children = props.children,
        className = props.className,
        fieldAttrs = props.fieldAttrs,
        rest = (0, _objectWithoutProperties3.default)(props, ['children', 'className', 'fieldAttrs']);

    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: className }, fieldAttrs),
        children
    );
}
ObjectTemplate.displayName = 'ObjectTemplate';
ObjectTemplate.displayName = 'ObjectTemplate';
//# sourceMappingURL=ObjectTemplate.js.map