'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _RenderTemplate = require('subschema-core/lib/RenderTemplate');

var _RenderTemplate2 = _interopRequireDefault(_RenderTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkboxes = function (_PureComponent) {
    (0, _inherits3.default)(Checkboxes, _PureComponent);

    function Checkboxes() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Checkboxes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Checkboxes.__proto__ || (0, _getPrototypeOf2.default)(Checkboxes)).call.apply(_ref, [this].concat(args))), _this), _this.handleCheckChange = function (e) {
            if (_this.props.dataType === 'radio') {
                _this.props.onChange(e.target.checked ? e.target.value : null);
                if (_this.props.onBlur) {
                    _this.props.onBlur();
                }
                return;
            }
            var newValues = _this.props.value.concat();
            var idx = newValues.indexOf(e.target.value);

            if (e.target.checked) {
                if (idx < 0) {
                    newValues.push(e.target.value);
                }
            } else {
                if (idx > -1) {
                    newValues.splice(idx, 1);
                }
            }

            _this.props.onChange(newValues);
            _this.props.onBlur();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    //override added input Class Names.


    (0, _createClass3.default)(Checkboxes, [{
        key: '_createCheckbox',
        value: function _createCheckbox(option, index, group) {

            var id = (0, _subschemaUtils.path)(this.props.path, group, index);
            var val = option.val,
                labelHTML = option.labelHTML,
                label = option.label;

            val = val == null ? label || labelHTML : val;
            label = labelHTML || label;
            var value = this.props.value;
            var labelContent = label ? _react2.default.createElement('span', {
                dangerouslySetInnerHTML: { __html: label } }) : val;
            var opts = {
                onChange: this.handleCheckChange,
                name: group,
                checked: value ? !!~value.indexOf(val) : false,
                id: id,
                value: val
            };
            return (0, _RenderTemplate2.default)((0, _extends3.default)({
                template: this.props.itemTemplate,
                key: 'checkbox-' + index + '-' + group,
                label: labelContent,
                type: 'checkbox'
            }, opts, {
                children: _react2.default.createElement('input', (0, _extends3.default)({ type: this.props.type }, opts))

            }));
        }
    }, {
        key: '_createGroup',
        value: function _createGroup(option, index, group) {
            var _props = this.props,
                Checkboxes = _props.Checkboxes,
                groupTemplate = _props.groupTemplate,
                name = _props.name,
                value = _props.value,
                rest = (0, _objectWithoutProperties3.default)(_props, ['Checkboxes', 'groupTemplate', 'name', 'value']);

            return (0, _RenderTemplate2.default)({
                template: groupTemplate,
                key: 'checkbox-group-' + index + '-' + option.group,
                legend: option.legend || option.group,
                children: this.makeOptions(option.options, group + '-' + index)
            });
        }

        /**
         * Create the checkbox list HTML
         * @param {Array}   Options as a simple array e.g. ['option1', 'option2']
         *                      or as an array of objects e.g. [{val: 543, label:
         *     'Title for object 543'}]
         * @return {String} HTML
         */

    }, {
        key: 'makeOptions',
        value: function makeOptions(array, group) {
            var _this2 = this;

            return array.map(function (option, index) {
                return option.group ? _this2._createGroup(option, index, group) : _this2._createCheckbox(option, index, group);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                this.makeOptions(this.props.options, this.props.path)
            );
        }
    }]);
    return Checkboxes;
}(_react.PureComponent);

Checkboxes.inputClassName = ' ';
Checkboxes.propTypes = {

    onChange: _subschemaPropTypes2.default.valueEvent,
    options: _subschemaPropTypes2.default.options,
    item: _subschemaPropTypes2.default.type,
    name: _subschemaPropTypes2.default.string,
    itemTemplate: _subschemaPropTypes2.default.template,
    groupTemplate: _subschemaPropTypes2.default.template,
    path: _subschemaPropTypes2.default.path,
    dataType: _subschemaPropTypes2.default.dataType,
    onBlur: _subschemaPropTypes2.default.changeValidate
};
Checkboxes.defaultProps = {
    options: _subschemaUtils.FREEZE_ARR,
    item: 'Text',
    itemTemplate: 'CheckboxesTemplate',
    groupTemplate: 'CheckboxesGroupTemplate',
    //make the value an array regardless of input
    value: {
        processor: 'ArrayProcessor'
    },
    dataType: "checkbox"
};
Checkboxes.displayName = 'Checkboxes';
exports.default = Checkboxes;
//# sourceMappingURL=Checkboxes.js.map