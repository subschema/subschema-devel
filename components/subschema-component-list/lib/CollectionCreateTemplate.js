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

var _Content = require('subschema-core/lib/Content');

var _Content2 = _interopRequireDefault(_Content);

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionCreateTemplate = function (_Component) {
    (0, _inherits3.default)(CollectionCreateTemplate, _Component);

    function CollectionCreateTemplate() {
        (0, _classCallCheck3.default)(this, CollectionCreateTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (CollectionCreateTemplate.__proto__ || (0, _getPrototypeOf2.default)(CollectionCreateTemplate)).apply(this, arguments));
    }

    (0, _createClass3.default)(CollectionCreateTemplate, [{
        key: 'renderInline',
        value: function renderInline() {
            return _react2.default.createElement(
                'div',
                {
                    className: this.props.inlineClass },
                this.props.children
            );
        }
    }, {
        key: 'renderPanel',
        value: function renderPanel() {
            var _props = this.props,
                title = _props.title,
                panelClass = _props.panelClass,
                editText = _props.editText,
                createText = _props.createText,
                panelTitleClass = _props.panelTitleClass,
                panelHeadingClass = _props.panelHeadingClass,
                panelBodyClass = _props.panelBodyClass,
                groupClass = _props.groupClass,
                create = _props.create;

            if (title === false) {
                title = '';
            } else if (title == null) {
                title = create ? createText : editText;
            } else if (typeof title === 'string') {
                title = {
                    type: 'h3',
                    content: create ? createText + ' ' + title : editText + ' ' + title,
                    className: panelTitleClass
                };
            }
            return _react2.default.createElement(
                'div',
                { className: panelClass },
                _react2.default.createElement(_Content2.default, { content: title, type: 'div', className: panelHeadingClass }),
                _react2.default.createElement(
                    'div',
                    { className: this.props.panelBodyClass },
                    _react2.default.createElement(
                        'div',
                        { className: this.props.groupClass },
                        this.props.children
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.inline ? this.renderInline() : this.renderPanel();
        }
    }]);
    return CollectionCreateTemplate;
}(_react.Component);

CollectionCreateTemplate.propTypes = {
    title: _subschemaPropTypes2.default.node,
    style: _subschemaPropTypes2.default.style,
    inline: _subschemaPropTypes2.default.bool,
    create: _subschemaPropTypes2.default.bool,
    editText: _subschemaPropTypes2.default.string,
    createText: _subschemaPropTypes2.default.string,
    onChange: _subschemaPropTypes2.default.valueEvent,
    value: _subschemaPropTypes2.default.value,
    origValue: _subschemaPropTypes2.default.any,
    pid: _subschemaPropTypes2.default.any,
    errors: _subschemaPropTypes2.default.errors,
    onButtonClick: _subschemaPropTypes2.default.func
};
CollectionCreateTemplate.defaultProps = {
    create: true,
    editText: 'Edit ',
    createText: 'Create '
};
CollectionCreateTemplate.displayName = 'CollectionCreateTemplate';
exports.default = CollectionCreateTemplate;
;
//# sourceMappingURL=CollectionCreateTemplate.js.map