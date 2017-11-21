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

var WizardProgressTemplate = function (_Component) {
    (0, _inherits3.default)(WizardProgressTemplate, _Component);

    function WizardProgressTemplate() {
        (0, _classCallCheck3.default)(this, WizardProgressTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (WizardProgressTemplate.__proto__ || (0, _getPrototypeOf2.default)(WizardProgressTemplate)).apply(this, arguments));
    }

    (0, _createClass3.default)(WizardProgressTemplate, [{
        key: 'getStyle',
        value: function getStyle(i) {
            var _props = this.props,
                length = _props.fieldsets.length,
                index = _props.index,
                doneClass = _props.doneClass,
                doingClass = _props.doingClass,
                todoClass = _props.todoClass;

            if (i < index || index == length) {
                return doneClass;
            }

            if (i === index) {
                return doingClass;
            }

            return todoClass;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'ol',
                { className: this.props.namespaceClass },
                this.props.fieldsets.map(function (s, i) {
                    return _react2.default.createElement(
                        'li',
                        { value: i, key: 'li' + i,
                            className: _this2.getStyle(i),
                            onClick: _this2.props.onClick },
                        _react2.default.createElement(
                            'em',
                            null,
                            i + 1
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            s.legend
                        )
                    );
                })
            );
        }
    }]);
    return WizardProgressTemplate;
}(_react.Component);

WizardProgressTemplate.propTypes = {
    style: _subschemaPropTypes2.default.style
};
WizardProgressTemplate.defaultProps = {
    index: 0,
    fieldsets: [],
    onClick: function onClick(e) {}
};
WizardProgressTemplate.displayName = 'WizardProgressTemplate';
exports.default = WizardProgressTemplate;
//# sourceMappingURL=WizardProgressTemplate.js.map