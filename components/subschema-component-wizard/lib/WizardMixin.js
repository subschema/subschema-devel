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

var _Field = require('subschema-core/lib/Field');

var _Field2 = _interopRequireDefault(_Field);

var _FieldSet = require('subschema-core/lib/FieldSet');

var _FieldSet2 = _interopRequireDefault(_FieldSet);

var _subschemaUtils = require('subschema-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function donner(d) {
    d && d();
}

var WizardMixin = function (_Component) {
    (0, _inherits3.default)(WizardMixin, _Component);

    function WizardMixin() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, WizardMixin);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WizardMixin.__proto__ || (0, _getPrototypeOf2.default)(WizardMixin)).call.apply(_ref, [this].concat(args))), _this), _this.state = { compState: 0, prevState: 0, maxState: 0, done: false }, _this.handleOnClick = function (evt) {
            var steps = _this.props.schema.fieldsets.length,
                value = evt.target.value;
            if (value < steps && value <= _this.state.maxState) {
                _this.setNavState(value, true);
            }
        }, _this.handleKeyDown = function (e) {
            if (e.which === 13) {
                if (_this.state.compState < _this.props.schema.fieldsets.length - 1) {
                    return _this.handleBtn(e, 'next');
                } else {
                    return _this.handleBtn(e, 'submit');
                }
            }
        }, _this.handleValidate = function () {}, _this.handleEnter = function () {
            _this.setState({ animating: true });
        }, _this.handleLeave = function (done) {
            _this.setState({ animating: false });
            done();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(WizardMixin, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            //    e && e.preventDefault();
            this._validate(function (errors) {
                if (errors) {

                    this.setState({ disabled: false, done: false });
                    return;
                }

                this.setState({ done: true });
                this.props.onSubmit(e);
                return;
            }.bind(this));
        }
    }, {
        key: 'next',
        value: function next() {
            var compState = this.state.compState,
                nextState = compState + 1,
                current = this.props.schema.fieldsets[compState];
            this.setState({ disabled: true });
            this._validate(function (e) {
                var _this2 = this;

                if (e) {
                    this.setState({ disabled: false, done: false });
                    return;
                }
                if (this.props.onNext(function (resp) {
                    return _this2.go(nextState, resp);
                }, nextState, current) === false) {
                    this.setState({
                        disabled: false,
                        done: false,
                        maxState: Math.max(nextState, this.state.maxState)
                    });
                    return;
                }
            }.bind(this));
        }
    }, {
        key: 'previous',
        value: function previous() {
            var _this3 = this;

            var compState = this.state.compState,
                nextState = compState - 1,
                current = this.props.schema.fieldsets[compState];

            this.setState({ disabled: true });
            if (this.props.onPrevious(function (resp) {
                return _this3.go(nextState, resp);
            }, nextState, current) === false) {
                this.setState({ disabled: false, done: false });
                return;
            }
        }
    }, {
        key: 'go',
        value: function go(pos, resp) {
            if (resp === false) {
                this.setState({ disabled: false, done: false });
                return;
            }
            this.setNavState(resp == null ? pos : resp);
        }
    }, {
        key: '_validate',
        value: function _validate(done) {
            var paths = (0, _subschemaUtils.flattenFields)(this.props.schema.fieldsets[this.state.compState]);
            this.context.valueManager.validatePaths(paths, done);
        }
    }, {
        key: 'createButtons',
        value: function createButtons(state) {
            var buttons = this.props.schema.fieldsets[state].buttons;

            var rest = {};
            if (buttons) {
                if (buttons.buttons) {
                    var _buttons = buttons;
                    buttons = _buttons.buttons;
                    rest = (0, _objectWithoutProperties3.default)(_buttons, ['buttons']);
                }
                if (!Array.isArray(buttons)) {
                    buttons = [buttons];
                }
            } else {
                buttons = [];
                var _props$buttons = this.props.buttons,
                    next = _props$buttons.next,
                    previous = _props$buttons.previous,
                    last = _props$buttons.last,
                    restBtns = (0, _objectWithoutProperties3.default)(_props$buttons, ['next', 'previous', 'last']);

                rest = restBtns;
                var isFirst = state == 0,
                    isLast = state + 1 === this.props.schema.fieldsets.length;

                if (isLast) {
                    if (!isFirst) {
                        buttons.push((0, _extends3.default)({ buttonClass: this.props.previousClass }, previous));
                    }
                    buttons.push((0, _extends3.default)({
                        buttonClass: this.props.lastClass,
                        primary: true }, last));
                } else if (isFirst) {
                    buttons.push((0, _extends3.default)({
                        buttonClass: this.props.nextClass,
                        primary: true }, next));
                } else {
                    buttons.push((0, _extends3.default)({ buttonClass: this.props.previousClass }, previous), (0, _extends3.default)({
                        buttonClass: this.props.nextClass,
                        primary: true }, next));
                }
            }

            buttons.forEach(function (b) {
                if (b.action === 'next' || b.action === 'submit') {
                    b.disabled = this.disabled;
                }
            }, this.state);
            return (0, _extends3.default)({}, rest, {
                buttons: buttons
            });
        }
    }, {
        key: 'handleBtn',
        value: function handleBtn(e, action, btn) {
            e && e.preventDefault();
            switch (action) {

                case 'previous':
                    {
                        this.previous();
                        break;
                    }
                case 'next':
                    {
                        this.next();
                        break;
                    }
                case 'submit':
                    {
                        this.handleSubmit(e);
                        break;
                    }
                default:
                    {
                        this.props.onAction(this.state.compState, action, this);
                    }
            }
        }
    }]);
    return WizardMixin;
}(_react.Component);

WizardMixin.contextTypes = {
    valueManager: _subschemaPropTypes2.default.valueManager
};
WizardMixin.defaultProps = {
    buttonsTemplate: 'ButtonsTemplate',
    Field: _Field2.default,
    FieldSet: _FieldSet2.default
};
WizardMixin.propTypes = {
    schema: _subschemaPropTypes2.default.any,
    buttons: _subschemaPropTypes2.default.buttons,
    buttonsTemplate: _subschemaPropTypes2.default.template,
    onSubmit: _subschemaPropTypes2.default.submit,
    FieldSet: _subschemaPropTypes2.default.injectClass,
    Field: _subschemaPropTypes2.default.injectClass
};
exports.default = WizardMixin;
//# sourceMappingURL=WizardMixin.js.map