'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

var _subschemaCore = require('subschema-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonsTemplate = function (_Component) {
    (0, _inherits3.default)(ButtonsTemplate, _Component);

    function ButtonsTemplate() {
        (0, _classCallCheck3.default)(this, ButtonsTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (ButtonsTemplate.__proto__ || (0, _getPrototypeOf2.default)(ButtonsTemplate)).apply(this, arguments));
    }

    (0, _createClass3.default)(ButtonsTemplate, [{
        key: 'makeButtons',
        value: function makeButtons(buttons) {
            var _this2 = this;

            var onClick = this.props.onButtonClick || this.props.onClick,
                buttonTemplate = this.props.buttonTemplate;
            if (buttons == null || buttons === false) {
                return null;
            }
            if (Array.isArray(buttons)) {
                return buttons.map(function (b) {
                    onClick = b.onClick || onClick;
                    var btn = (0, _subschemaUtils.isString)(b) ? {
                        action: b,
                        label: b,
                        onClick: onClick
                    } : (0, _subschemaUtils.extend)({}, b, { onClick: onClick, template: buttonTemplate });
                    if (_this2.props.buttonClass) {
                        btn.buttonClass = (btn.buttonClass || '') + ' ' + (_this2.props.buttonClass || '');
                    }
                    if (btn.primary) {
                        btn.buttonClass = btn.buttonClass + ' ' + _this2.props.primaryClass;
                    }
                    return btn;
                });
            }
            return (0, _keys2.default)(buttons).map(function (b) {
                var v = buttons[b];
                onClick = v.onClick || onClick;
                var btn = (0, _subschemaUtils.isString)(v) ? {
                    action: b,
                    label: v,
                    onClick: onClick
                } : (0, _extends3.default)({}, v, { onClick: onClick, template: buttonTemplate });
                if (this.props.buttonClass) {
                    btn.buttonClass = (btn.buttonClass || '') + ' ' + (this.props.buttonClass || '');
                }
                if (btn.primary) {
                    btn.buttonClass = btn.buttonClass + ' ' + this.props.primaryClass;
                }
                if (!btn.action) {
                    btn.action = b;
                }
                return btn;
            }, this);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                buttons = _props.buttons,
                buttonTemplate = _props.buttonTemplate,
                buttonsClass = _props.buttonsClass,
                buttonContainerClass = _props.buttonContainerClass;

            if (buttons.buttons) {
                buttonsClass = buttons.buttonsClass || buttonsClass;
                buttons = buttons.buttons;
            }
            return _react2.default.createElement(
                'div',
                { className: buttonContainerClass },
                _react2.default.createElement(
                    'div',
                    { className: buttonsClass },
                    this.makeButtons(buttons).map(function (b, i) {
                        return (0, _subschemaCore.RenderTemplate)((0, _extends3.default)({ template: buttonTemplate, key: 'btn-' + i }, b));
                    })
                )
            );
        }
    }]);
    return ButtonsTemplate;
}(_react.Component);

ButtonsTemplate.defaultProps = {
    buttonTemplate: 'ButtonTemplate',
    buttons: [{
        action: 'submit',
        label: 'Submit',
        type: 'submit',
        template: 'Button',
        primary: true
    }],
    onButtonClick: function onButtonClick(event, action, btn, value) {}
};
ButtonsTemplate.propTypes = {
    buttonTemplate: _subschemaPropTypes2.default.template,
    buttonClass: _subschemaPropTypes2.default.cssClass,
    style: _subschemaPropTypes2.default.style
};
ButtonsTemplate.displayName = 'ButtonsTemplate';
exports.default = ButtonsTemplate;
//# sourceMappingURL=ButtonsTemplate.js.map