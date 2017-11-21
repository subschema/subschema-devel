'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.settings = undefined;

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

var _Object = require('subschema-core/lib/Object');

var _Object2 = _interopRequireDefault(_Object);

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

var _RenderTemplate = require('subschema-core/lib/RenderTemplate');

var _RenderTemplate2 = _interopRequireDefault(_RenderTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = exports.settings = {
    //configure the path that nested editing happens at.
    editPath: '@edit@{path}'
};

var isEmpty = function isEmpty(v) {
    if (v == null || v === false || v === true || v === '') {
        return true;
    }

    if ('length' in v) {
        return v.length == 0;
    }

    return false;
};

var CollectionMixin = function (_Component) {
    (0, _inherits3.default)(CollectionMixin, _Component);

    function CollectionMixin() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CollectionMixin);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CollectionMixin.__proto__ || (0, _getPrototypeOf2.default)(CollectionMixin)).call.apply(_ref, [this].concat(args))), _this), _this.handleDelete = function (pos, val, pid) {
            var values = (0, _subschemaUtils.clone)(_this.props.value);
            if (_this.props.onWillDelete(pos, val) !== false) {
                if (Array.isArray(values)) {
                    values.splice(pos, 1);
                } else {
                    delete values[pid];
                }
                _this.props.onChange(values);
            }
        }, _this.handleAddBtn = function (e) {
            e && e.preventDefault();
            var key = _this.createPid();
            var editPath = {
                mode: 'add',
                origKey: key,
                schema: _this.createItemSchema(false),
                path: (0, _subschemaUtils.resolveKey)(_this.props.path, settings.editPath),
                pos: _this.count(),
                key: key

            };
            _this.props.onEdit(editPath);
        }, _this.handleEdit = function (pos, value, key) {
            var editPath = {
                value: (0, _subschemaUtils.clone)(value),
                mode: 'edit',
                origKey: key,
                schema: _this.createItemSchema(true),
                path: (0, _subschemaUtils.resolveKey)(_this.props.path, settings.editPath),
                pos: pos,
                key: key
            };
            _this.props.onEdit(editPath);
        }, _this.handleBtnClick = function (e, action) {
            e && e.preventDefault();
            switch (action) {
                case 'close':
                case 'cancel':
                    _this.props.onEdit();
                    return;
                default:
                    {
                        _this.handleSubmit();
                    }
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CollectionMixin, [{
        key: 'getValue',
        value: function getValue() {
            return this.props.value;
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var editPath = this.props.editPath; //this.context.valueManager.path(resolveKey(this.props.path,
            // settings.editPath));
            if (!editPath) {
                return;
            }
            var value = editPath.value,
                key = editPath.key,
                origKey = editPath.origKey,
                mode = editPath.mode;
            //value fix.

            var clonedValue = isEmpty(this.props.value) ? this.createDefValue() : (0, _subschemaUtils.clone)(this.props.value);
            if (mode == 'edit' && origKey != key) {
                if (clonedValue) {
                    if (Array.isArray(clonedValue)) {
                        clonedValue.splice(key, 1);
                    } else {
                        delete clonedValue[origKey];
                    }
                }
            }
            clonedValue[key] = value;
            this.props.onChange(clonedValue);
            this.props.onEdit();
        }
    }, {
        key: 'renderAddEditTemplate',
        value: function renderAddEditTemplate() {
            if (!this.props.editPath) {
                return null;
            }

            var _props = this.props,
                editTemplate = _props.editTemplate,
                createTemplate = _props.createTemplate,
                ObjectType = _props.ObjectType,
                _props$editPath = _props.editPath,
                mode = _props$editPath.mode,
                path = _props$editPath.path,
                schema = _props$editPath.schema,
                inline = _props.inline,
                title = _props.title;


            var isEdit = mode === 'edit';
            schema = schema || this.createItemSchema(isEdit);
            path = path || (0, _subschemaUtils.resolveKey)(this.props.path, settings.editPath);

            var children = _react2.default.createElement(ObjectType, {
                key: 'editForm-' + path,
                onButtonClick: this.handleBtnClick,
                schema: schema,
                path: path
            });
            return (0, _RenderTemplate2.default)({
                key: 'addEditTemplate-' + path,
                template: isEdit ? editTemplate : createTemplate,
                create: isEdit ? false : true,
                onButtonClick: this.handleBtnClick,
                inline: inline,
                title: title,
                children: children
            });
        }
    }, {
        key: 'renderAddBtn',
        value: function renderAddBtn() {
            if (!this.props.canAdd) {
                return null;
            }

            var btn = (0, _subschemaUtils.defaults)({}, this.props.addButton, CollectionMixin.defaultProps.addButton);

            return (0, _RenderTemplate2.default)((0, _extends3.default)({
                template: this.props.buttonTemplate,
                key: "addBtn",
                onClick: this.handleAddBtn,
                iconClass: this.props.iconAddClass
            }, btn));
        }
    }, {
        key: 'renderAdd',
        value: function renderAdd() {
            if (!this.props.editPath) {
                return this.renderAddBtn();
            }
            var mode = this.props.editPath.mode;


            if (mode) {
                if (this.props.inline) {
                    if (mode === 'edit') {
                        return this.renderAddBtn();
                    }
                }
                return this.renderAddEditTemplate();
            }
            return this.renderAddBtn();
        }
    }, {
        key: 'createItemSchema',
        value: function createItemSchema(edit) {
            var schema = {
                schema: this.getTemplateItem(edit),
                fieldsets: [{
                    fields: ['key', 'value'],
                    buttons: this.props.buttons
                }]

            };
            return schema;
        }
    }, {
        key: 'renderRowEach',
        value: function renderRowEach(data, rowId) {
            return this.renderRow(data, null, rowId, rowId);
        }
    }, {
        key: 'renderRow',
        value: function renderRow(value, sectionId, pos, pid) {
            pid = pid || pos;
            value = { value: value };
            var _props2 = this.props,
                itemTemplate = _props2.itemTemplate,
                contentTemplate = _props2.contentTemplate,
                editPath = _props2.editPath,
                showKey = _props2.showKey,
                labelKey = _props2.labelKey;


            var last = this.count() === pos + 1;
            var path = (0, _subschemaUtils.resolveKey)(this.props.path, pid);
            var isEditItem = this.props.inline && pid == editPath.key;
            var key = path + '.' + pid;

            var children = isEditItem ? this.renderAddEditTemplate(value, false) : (0, _RenderTemplate2.default)((0, _extends3.default)({}, this.props, {
                buttons: false,
                template: contentTemplate,
                key: 'render-inline-' + key,
                onClick: this.props.canEdit ? this.handleEdit : null,
                labelKey: labelKey,
                showKey: showKey,
                pos: pos,
                pid: pid,
                value: value,
                last: last

            }));

            return (0, _RenderTemplate2.default)({
                template: itemTemplate,
                onMoveUp: this.handleMoveUp,
                onMoveDown: this.handleMoveDown,
                onDelete: this.handleDelete,
                onEdit: this.handleEdit,
                canReorder: this.props.canReorder,
                canDelete: this.props.canDelete,
                canEdit: this.props.canEdit,
                canAdd: this.props.canAdd,
                errors: this.props.errors,
                path: path,
                labelKey: labelKey,
                showKey: showKey,
                key: key,
                pos: pos,
                pid: pid,
                value: value,
                last: last,
                children: children
            });
        }
    }, {
        key: 'renderAddInList',
        value: function renderAddInList() {
            return (0, _RenderTemplate2.default)({
                template: this.props.itemTemplate,
                children: this.renderAdd()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                className = _props3.className,
                listContainerClass = _props3.listContainerClass;

            return _react2.default.createElement(
                'div',
                { className: className },
                this.props.addAt === 'top' ? this.renderAdd() : null,
                _react2.default.createElement(
                    'ul',
                    { key: 'container', className: listContainerClass },
                    this.props.addAt == 'top-list' ? this.renderAddInList() : null,
                    this.renderRows(),
                    this.props.addAt == 'bottom-list' ? this.renderAddInList() : null
                ),
                this.props.addAt === 'bottom' ? this.renderAdd() : null
            );
        }
    }]);
    return CollectionMixin;
}(_react.Component);

CollectionMixin.inputClassName = 'list-editor';
CollectionMixin.contextTypes = {
    valueManager: _subschemaPropTypes2.default.valueManager,
    injector: _subschemaPropTypes2.default.injector
};
CollectionMixin.propTypes = {
    onChange: _subschemaPropTypes2.default.valueEvent,
    path: _subschemaPropTypes2.default.path,
    canEdit: _subschemaPropTypes2.default.bool,
    canDelete: _subschemaPropTypes2.default.bool,
    canAdd: _subschemaPropTypes2.default.bool,
    inline: _subschemaPropTypes2.default.bool,
    labelKey: _subschemaPropTypes2.default.string,
    itemType: _subschemaPropTypes2.default.typeDescription,
    editType: _subschemaPropTypes2.default.typeDescription,
    createType: _subschemaPropTypes2.default.typeDescription,
    editPath: _subschemaPropTypes2.default.value,
    onEdit: _subschemaPropTypes2.default.valueEvent,
    editTemplate: _subschemaPropTypes2.default.template,
    createTemplate: _subschemaPropTypes2.default.template,
    buttonTemplate: _subschemaPropTypes2.default.template,
    itemTemplate: _subschemaPropTypes2.default.template,
    contentTemplate: _subschemaPropTypes2.default.template,
    buttons: _subschemaPropTypes2.default.buttons,
    addButton: _subschemaPropTypes2.default.button,
    listContainerClass: _subschemaPropTypes2.default.cssClass,
    ObjectType: _subschemaPropTypes2.default.injectClass,
    value: _subschemaPropTypes2.default.value,
    title: _subschemaPropTypes2.default.string,
    errors: _subschemaPropTypes2.default.errors,
    addAt: _subschemaPropTypes2.default.oneOf(['top', 'bottom', 'bottom-list', 'top-list'])
};
CollectionMixin.defaultProps = {
    addAt: 'top',
    onWillReorder: _subschemaUtils.noop,
    onWillChange: _subschemaUtils.noop,
    onWillAdd: _subschemaUtils.noop,
    onWillDelete: _subschemaUtils.noop,
    createTemplate: 'CollectionCreateTemplate',
    editTemplate: 'CollectionCreateTemplate',
    buttonTemplate: 'ButtonTemplate',
    itemTemplate: 'ListItemTemplate',
    contentTemplate: "ContentItemTemplate",
    editPath: settings.editPath,
    onEdit: settings.editPath,
    itemType: {
        type: 'Text'
    },
    addButton: {
        "label": "Add",
        "className": "btn btn-default btn-add"
    },
    buttons: {
        buttonsClass: 'btn-group pull-right',
        buttons: [{
            label: 'Cancel',
            action: 'cancel',
            buttonClass: 'btn btn-default'
        }, {
            label: 'Save',
            type: 'submit',
            action: 'submit',
            primary: true,
            buttonClass: 'btn-primary btn'
        }]
    },
    ObjectType: _Object2.default
};
CollectionMixin.displayName = 'CollectionMixin';
exports.default = CollectionMixin;
//# sourceMappingURL=CollectionMixin.js.map