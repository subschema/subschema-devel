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

var _subschemaUtils = require('subschema-utils');

var _CollectionMixin2 = require('./CollectionMixin');

var _CollectionMixin3 = _interopRequireDefault(_CollectionMixin2);

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListInput = function (_CollectionMixin) {
    (0, _inherits3.default)(ListInput, _CollectionMixin);

    function ListInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ListInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ListInput.__proto__ || (0, _getPrototypeOf2.default)(ListInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleMoveUp = function (pos, val) {
            _this.reorder(pos, val, -1);
        }, _this.handleMoveDown = function (pos, val) {
            _this.reorder(pos, val, 1);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ListInput, [{
        key: 'createPid',
        value: function createPid() {
            return this.count();
        }
    }, {
        key: 'createDefValue',
        value: function createDefValue() {
            return [];
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            if (this.props.value) {
                return this.props.value.map(this.renderRowEach, this);
            }
            return null;
        }
    }, {
        key: 'count',
        value: function count() {
            if (!this.props.value) {
                return 0;
            }
            return this.props.value.length;
        }
    }, {
        key: 'reorder',
        value: function reorder(pos, val, direction) {
            var values = clone(this.props.value);
            var newPos = direction > 0 ? Math.min(pos + direction, values.length) : Math.max(pos + direction, 0);
            if (this.props.onWillReorder(pos, val, direction) !== false) {
                values.splice(newPos, 0, values.splice(pos, 1)[0]);
                this.props.onChange(values);
            }
        }
    }, {
        key: 'getTemplateItem',
        value: function getTemplateItem(edit) {
            var type = edit ? this.props.editType || this.props.itemType : this.props.itemType;
            var value = (0, _subschemaUtils.isString)(type) ? {
                type: type
            } : type || {};
            value.title = false;
            return {
                value: value,
                key: { title: false, template: false, type: 'Hidden' }
            };
        }
    }]);
    return ListInput;
}(_CollectionMixin3.default);

ListInput.inputClassName = _CollectionMixin3.default.inputClassName;
ListInput.propTypes = (0, _extends3.default)({}, _CollectionMixin3.default.propTypes, {
    canReorder: _subschemaPropTypes2.default.bool
});
exports.default = ListInput;
//# sourceMappingURL=List.js.map