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

var _subschemaUtils = require('subschema-utils');

var _ButtonsTemplate = require('subschema-component-form/lib/templates/ButtonsTemplate');

var _ButtonsTemplate2 = _interopRequireDefault(_ButtonsTemplate);

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItemTemplate = function (_Component) {
    (0, _inherits3.default)(ListItemTemplate, _Component);

    function ListItemTemplate() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ListItemTemplate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ListItemTemplate.__proto__ || (0, _getPrototypeOf2.default)(ListItemTemplate)).call.apply(_ref, [this].concat(args))), _this), _this.handleMoveUp = function (e) {
            e.preventDefault();
            _this.props.onMoveUp(_this.props.pos, _this.props.value, _this.props.pid);
        }, _this.handleMoveDown = function (e) {
            e.preventDefault();
            _this.props.onMoveDown(_this.props.pos, _this.props.value, _this.props.pid);
        }, _this.handleDelete = function (e) {
            e.preventDefault();
            _this.props.onDelete(_this.props.pos, _this.props.value, _this.props.pid);
        }, _this.handleEdit = function (e) {
            e.preventDefault();
            var val = _this.props.value;

            _this.props.onEdit(_this.props.pos, val.value, _this.props.pid);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ListItemTemplate, [{
        key: 'buttons',
        value: function buttons(pos, last, canReorder, canDelete) {
            var buttons = [];
            var buttonClass = this.props.buttonClass;
            if (canReorder) {
                if (pos > 0) {
                    buttons.push({
                        onClick: this.handleMoveUp,
                        title: 'Move Up',
                        action: 'up',
                        label: '',
                        iconClass: this.props.moveUpClass,
                        buttonClass: buttonClass
                    });
                }
                if (!last) {
                    buttons.push({
                        onClick: this.handleMoveDown,
                        title: 'Move Down',
                        action: 'down',
                        iconClass: this.props.moveDownClass,
                        buttonClass: buttonClass,
                        label: ''
                    });
                }
            }
            if (canDelete) {
                buttons.push({
                    onClick: this.handleDelete,
                    title: 'Delete',
                    action: 'delete',
                    iconClass: this.props.deleteClass,
                    buttonClass: buttonClass,
                    label: ''
                });
            }
            return buttons;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                pos = _props.pos,
                Buttons = _props.Buttons,
                value = _props.value,
                errors = _props.errors,
                path = _props.path,
                ctrlButtonsClass = _props.ctrlButtonsClass,
                listGroupItemClass = _props.listGroupItemClass,
                helpClass = _props.helpClass,
                onValidate = _props.onValidate,
                type = _props.type,
                name = _props.name,
                hasErrorClass = _props.hasErrorClass,
                canReorder = _props.canReorder,
                canDelete = _props.canDelete,
                last = _props.last,
                onValueChange = _props.onValueChange;

            var error = errors && errors[0] && errors[0].message;
            return _react2.default.createElement(
                'li',
                {
                    className: listGroupItemClass + ' ' + (error ? hasErrorClass : '') },
                error ? _react2.default.createElement(
                    'p',
                    { ref: 'error', key: 'error', className: helpClass },
                    error
                ) : null,
                _react2.default.createElement(Buttons, { key: 'buttons',
                    buttons: this.buttons(pos, last, canReorder, canDelete),
                    ref: 'buttons',
                    buttonsClass: ctrlButtonsClass }),
                this.props.children
            );
        }
    }]);
    return ListItemTemplate;
}(_react.Component);

ListItemTemplate.propTypes = {
    style: _subschemaPropTypes2.default.style,
    Buttons: _subschemaPropTypes2.default.injectClass,
    pid: _subschemaPropTypes2.default.any
};
ListItemTemplate.defaultProps = {
    type: 'Text',
    onMoveUp: _subschemaUtils.noop,
    onMoveDown: _subschemaUtils.noop,
    onDelete: _subschemaUtils.noop,
    onValidate: _subschemaUtils.noop,
    onValueChange: _subschemaUtils.noop,
    onEdit: _subschemaUtils.noop,
    canAdd: false,
    canReorder: false,
    canEdit: false,
    canDelete: false,
    last: false,
    errors: null,
    pos: 0,
    style: "ListItemTemplate",
    Buttons: _ButtonsTemplate2.default
};
ListItemTemplate.displayName = 'ListItemTemplate';
exports.default = ListItemTemplate;
//# sourceMappingURL=ListItemTemplate.js.map