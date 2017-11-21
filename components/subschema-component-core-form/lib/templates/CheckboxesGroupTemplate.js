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

var CheckboxesGroupTemplate = function (_Component) {
    (0, _inherits3.default)(CheckboxesGroupTemplate, _Component);

    function CheckboxesGroupTemplate() {
        (0, _classCallCheck3.default)(this, CheckboxesGroupTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (CheckboxesGroupTemplate.__proto__ || (0, _getPrototypeOf2.default)(CheckboxesGroupTemplate)).apply(this, arguments));
    }

    (0, _createClass3.default)(CheckboxesGroupTemplate, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'fieldset',
                { className: this.props.groupClass },
                _react2.default.createElement(
                    'legend',
                    null,
                    this.props.legend
                ),
                this.props.children
            );
        }
    }]);
    return CheckboxesGroupTemplate;
}(_react.Component);

CheckboxesGroupTemplate.propTypes = {
    legend: _subschemaPropTypes2.default.node,
    style: _subschemaPropTypes2.default.style
};
CheckboxesGroupTemplate.displayName = 'CheckboxesGroupTemplate';
exports.default = CheckboxesGroupTemplate;
//# sourceMappingURL=CheckboxesGroupTemplate.js.map