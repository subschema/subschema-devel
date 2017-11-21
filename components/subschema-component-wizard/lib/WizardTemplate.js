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

var _WizardMixin2 = require('./WizardMixin');

var _WizardMixin3 = _interopRequireDefault(_WizardMixin2);

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

var _subschemaCore = require('subschema-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function donner(done) {
    done();
}
var fakeTransition = {
    Transition: function Transition(props) {
        return _react2.default.createElement('span', props);
    }
};

var WizardTemplate = function (_WizardMixin) {
    (0, _inherits3.default)(WizardTemplate, _WizardMixin);

    function WizardTemplate() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, WizardTemplate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WizardTemplate.__proto__ || (0, _getPrototypeOf2.default)(WizardTemplate)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(WizardTemplate, [{
        key: 'setNavState',
        value: function setNavState(next) {
            var len = this.props.schema.fieldsets.length,
                compState = this.state.compState;

            next = Math.max(Math.min(len - 1, next), 0);
            if (this.props.onNavChange(next, compState, this.props.schema.fieldsets[next]) !== false) {
                this.setState({
                    compState: next,
                    disabled: false,
                    prevState: next === compState ? this.state.prevState : compState
                });
            }
        }
    }, {
        key: 'renderProgress',
        value: function renderProgress(fieldsets) {
            return (0, _subschemaCore.RenderTemplate)({
                key: 'progress-template-key',
                template: this.props.wizardProgressTemplate,
                fieldsets: fieldsets,
                index: this.state.done ? fieldsets.length : this.state.compState,
                onClick: this.handleOnClick
            });
        }
    }, {
        key: 'makeTransition',
        value: function makeTransition(compState) {
            if (compState < this.state.prevState) {
                return this.props.transitionForward || fakeTransition;
            } else {
                return this.props.transitionBackward || fakeTransition;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                Template = _props.Template,
                template = _props.template,
                fieldsets = _props.fieldsets,
                fields = _props.fields,
                onButtonClick = _props.onButtonClick,
                transitionLeaveTimeout = _props.transitionLeaveTimeout,
                transitionEnterTimeout = _props.transitionEnterTimeout,
                carouselHeightClass = _props.carouselHeightClass,
                children = _props.children,
                schema = _props.schema,
                rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'Template', 'template', 'fieldsets', 'fields', 'onButtonClick', 'transitionLeaveTimeout', 'transitionEnterTimeout', 'carouselHeightClass', 'children', 'schema']);
            var _props$schema = this.props.schema;
            fieldsets = _props$schema.fieldsets;
            schema = _props$schema.schema;
            var compState = this.state.compState,
                current = fieldsets[compState],
                _makeTransition = this.makeTransition(compState),
                Transition = _makeTransition.Transition,
                transition = (0, _objectWithoutProperties3.default)(_makeTransition, ['Transition']);

            var buttons = current.buttons ? current.buttons : this.createButtons(compState);
            var currentSchema = {
                schema: schema,
                fieldsets: [(0, _extends3.default)({ buttons: buttons }, current, { legend: false })],
                template: Template
            };
            return _react2.default.createElement(
                'div',
                {
                    className: this.props.namespaceClass + ' ' + (this.state.animating ? this.props.animatingClass : ''),
                    onKeyDown: this.handleKeyDown },
                this.renderProgress(fieldsets),
                _react2.default.createElement(
                    Transition,
                    (0, _extends3.default)({ key: 'wizard-transition' }, transition),
                    _react2.default.createElement(_subschemaCore.ObjectType, (0, _extends3.default)({}, rest, {
                        className: 'clearfix state-' + compState,
                        key: "form-" + compState,
                        schema: currentSchema,

                        onButtonClick: this._handleBtn
                    }))
                )
            );
        }
    }]);
    return WizardTemplate;
}(_WizardMixin3.default);

WizardTemplate.defaultProps = (0, _extends3.default)({}, _WizardMixin3.default.defaultProps, {
    wizardProgressTemplate: 'WizardProgressTemplate',
    Template: 'ObjectTemplate',
    onNext: donner,
    onPrevious: donner,
    onDone: donner,
    buttons: {
        'previous': {
            label: 'Previous',
            action: 'previous'
        },
        'next': {
            label: 'Next',
            action: 'next',
            primary: true
        },
        'last': {
            label: 'Done',
            type: "submit",
            action: 'submit',
            primary: true
        }
    },
    onAction: function onAction(pos, action, wizard) {},
    onNavChange: function onNavChange(current, previous, wizard) {},

    transitionForward: "slideRight",
    transitionBackward: "slideLeft",
    namespaceClass: 'wizard'
});
WizardTemplate.propTypes = (0, _extends3.default)({}, _WizardMixin3.default.propTypes, {
    buttons: _subschemaPropTypes2.default.any,
    fieldsets: _subschemaPropTypes2.default.any,
    wizardProgressTemplate: _subschemaPropTypes2.default.template,
    Template: _subschemaPropTypes2.default.template,
    transitionForward: _subschemaPropTypes2.default.transition,
    transitionBackward: _subschemaPropTypes2.default.transition,
    style: _subschemaPropTypes2.default.style
});

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this._handleBtn = function () {
        return _this2.handleBtn.apply(_this2, arguments);
    };
};

WizardTemplate.displayName = 'WizardTemplate';
exports.default = WizardTemplate;
//# sourceMappingURL=WizardTemplate.js.map