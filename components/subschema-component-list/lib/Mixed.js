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

var _CollectionMixin2 = require('./CollectionMixin');

var _CollectionMixin3 = _interopRequireDefault(_CollectionMixin2);

var _subschemaUtils = require('subschema-utils');

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MixedInput = function (_CollectionMixin) {
    (0, _inherits3.default)(MixedInput, _CollectionMixin);

    function MixedInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, MixedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MixedInput.__proto__ || (0, _getPrototypeOf2.default)(MixedInput)).call.apply(_ref, [this].concat(args))), _this), _this.uniqueCheck = function (value) {
            if (!value) {
                return null;
            }
            if (_this.props.editPid != null && _this.props.editPid.key == value) {
                return null;
            }
            if (value in _this.props.value) {

                return {
                    message: 'Keys must be unique'
                };
            }
            return null;
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(MixedInput, [{
        key: 'count',
        value: function count() {
            if (!this.props.value) {
                return 0;
            }
            return (0, _keys2.default)(this.props.value).length;
        }
    }, {
        key: 'createPid',
        value: function createPid() {
            return '' + this.props.newKeyPrefix + this.count();
        }
    }, {
        key: 'createDefValue',
        value: function createDefValue() {
            return {};
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            var value = this.props.value;

            return value ? (0, _keys2.default)(value).map(function (key, i) {
                return this.renderRow(value[key], null, i, key);
            }, this) : null;
        }
    }, {
        key: 'getTemplateItem',
        value: function getTemplateItem(edit) {
            var _props = this.props,
                _props$keyType = _props.keyType,
                keyType = _props$keyType === undefined ? { type: 'Text' } : _props$keyType,
                valueType = _props.valueType,
                editType = _props.editType,
                itemType = _props.itemType;

            var type = edit ? editType || valueType || itemType : valueType || itemType;

            var key = (0, _subschemaUtils.isString)(keyType) ? { type: keyType } : keyType;

            var value = (0, _subschemaUtils.isString)(type) ? { type: type } : type || {};

            var schema = { key: key, value: value };

            (key.validators || (key.validators = [])).unshift('required', this.uniqueCheck);

            return schema;
        }
    }]);
    return MixedInput;
}(_CollectionMixin3.default);

MixedInput.propTypes = (0, _extends3.default)({}, _CollectionMixin3.default.propTypes, {
    labelKey: _subschemaPropTypes2.default.string,
    keyType: _subschemaPropTypes2.default.typeDescription,
    valueType: _subschemaPropTypes2.default.typeDescription,
    showKey: _subschemaPropTypes2.default.bool

});
MixedInput.defaultProps = (0, _extends3.default)({}, _CollectionMixin3.default.defaultProps, {
    value: {},
    newKeyPrefix: 'new_key',
    showKey: true,
    valueType: { type: 'Text' },
    keyType: { type: 'Text' }
});
exports.default = MixedInput;
//# sourceMappingURL=Mixed.js.map