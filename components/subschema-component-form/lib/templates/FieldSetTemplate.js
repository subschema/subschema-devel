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

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

var _subschemaUtils = require('subschema-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldSetTemplate = function (_Component) {
    (0, _inherits3.default)(FieldSetTemplate, _Component);

    function FieldSetTemplate() {
        (0, _classCallCheck3.default)(this, FieldSetTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (FieldSetTemplate.__proto__ || (0, _getPrototypeOf2.default)(FieldSetTemplate)).apply(this, arguments));
    }

    (0, _createClass3.default)(FieldSetTemplate, [{
        key: 'render',
        value: function render() {
            var _props$field$props = (0, _extends3.default)({}, this.props.field, this.props),
                legend = _props$field$props.legend,
                content = _props$field$props.content,
                legendClass = _props$field$props.legendClass,
                buttons = _props$field$props.buttons,
                className = _props$field$props.className;

            return legend ? _react2.default.createElement(
                'fieldset',
                { className: className },
                _react2.default.createElement(
                    'legend',
                    { className: legendClass },
                    legend
                ),
                content,
                this.props.children,
                buttons
            ) : _react2.default.createElement(
                'div',
                { className: className },
                content,
                this.props.children,
                buttons
            );
        }
    }]);
    return FieldSetTemplate;
}(_react.Component);

FieldSetTemplate.propTypes = {
    buttons: _subschemaPropTypes2.default.renderedTemplate,
    legend: _subschemaPropTypes2.default.node,
    className: _subschemaPropTypes2.default.cssClass,
    field: _subschemaPropTypes2.default.any,
    content: _subschemaPropTypes2.default.node
};
FieldSetTemplate.defaultProps = {
    field: _subschemaUtils.FREEZE_OBJ
};
FieldSetTemplate.displayName = 'FieldSetTemplate';
exports.default = FieldSetTemplate;
//# sourceMappingURL=FieldSetTemplate.js.map