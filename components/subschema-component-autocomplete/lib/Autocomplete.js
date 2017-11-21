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

var _Dom = require('subschema-component-form/lib/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

var _subschemaPropTypes = require('subschema-prop-types');

var _subschemaPropTypes2 = _interopRequireDefault(_subschemaPropTypes);

var _subschemaCore = require('subschema-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Autocomplete = function (_Component) {
    (0, _inherits3.default)(Autocomplete, _Component);

    function Autocomplete() {
        var _ref;

        var _temp, _this2, _ret;

        (0, _classCallCheck3.default)(this, Autocomplete);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = Autocomplete.__proto__ || (0, _getPrototypeOf2.default)(Autocomplete)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = { suggestions: [], showing: false, focus: -1 }, _this2.hide = function (selectValue) {
            var _this2$state = _this2.state,
                selected = _this2$state.selected,
                input = _this2$state.input,
                suggestions = _this2$state.suggestions,
                focus = _this2$state.focus,
                i = 0,
                l = void 0,
                options = void 0,
                found = false;

            suggestions = suggestions || [];
            if (selectValue) {

                var p = _this2.getProcessor();
                if (selectValue && focus > -1) {

                    selected = suggestions[focus];
                } else if (input == null || input.trim() === '') {
                    selected = null;
                    input = null;
                } else if (!selected || input !== selected.label) {
                    if (suggestions.length === 1) {
                        selected = suggestions[0];
                        input = selected.label;
                    } else {
                        selected = null;
                        options = suggestions;
                        l = options.length;
                        for (; i < l; i++) {
                            var opt = options[i];
                            if (opt.label === input) {
                                selected = opt;
                                input = opt.label;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            input = null;
                        }
                    }
                }
                if (selected !== _this2.state.selected) {
                    _this2.onSelect(selected);
                } else {
                    if (_this2.props.onBlur) {
                        _this2.props.onBlur(selected && selected.val, _this2.props.value, _this2.props.name, _this2.props.path);
                    }
                    _this2.setState({
                        suggestions: [],
                        selected: selected,
                        input: input,
                        showing: false,
                        focus: -1
                    });
                }
            } else {
                _this2.setState({ showing: false, focus: -1, suggestions: [] }, _this2.un);
            }
            //        this.props.onBlur();
        }, _this2.bindDocument = function () {
            if (_this2._bound) {
                return;
            }
            _this2.unbindDocument();
            _this2._bound = true;
            _this2._onDocumentClickListener = _Dom2.default.listen(_this2, 'click', _this2.handleDocumentClick);

            _this2._onDocumentKeyupListener = _Dom2.default.listen(_this2, 'keyup', _this2.handleDocumentKeyUp);

            _this2._onDocumentKeydownListener = _Dom2.default.listen(_this2, 'keypress', _this2.handleDocumentEnter);
        }, _this2.handleDocumentEnter = function (e) {

            if (e.keyCode === 13 && _this2.state.suggestions && _this2.state.suggestions.length) {
                e.preventDefault();
                e.stopPropagation();
                _this2.hide(true);
            }
        }, _this2.handleDocumentKeyUp = function (e) {

            if (e.keyCode === 27) {
                _this2.hide(false);
            }
        }, _this2.handleDocumentClick = function (e) {
            // If the click originated from within this component
            // don't do anything.
            if (_Dom2.default.isNodeInRoot(e.target, _this2)) {
                return;
            }

            _this2.hide(false);
        }, _this2.handleSuggestionClick = function (o) {
            _this2.onSelect(o);
        }, _this2.onSelect = function (o) {
            if (_this2.props.onSelect(o) === false) {
                return;
            }
            var p = _this2.processor();
            var value = p.value(o);
            if (_this2.props.onChange(value) !== false) {
                var input = p.format(o);
                _this2.setState({
                    suggestions: [],
                    showing: false,
                    focus: -1,
                    selected: o,
                    value: value,
                    input: input
                });
            }
        }, _this2._handleDispatch = function (input) {
            _this2.setState({
                input: input,
                selected: null
            });

            if (_this2._fetch && _this2._fetch.cancel) {
                _this2._fetch.cancel();
            }
            var _this = _this2;
            _this2._fetch = _this2.processor().fetch(_this2.props.url, input, _this2, function (err, suggestions) {
                if (err) {
                    return;
                }
                if (_this.props.autoSelectSingle && suggestions && suggestions.length === 1) {
                    _this.onSelect(suggestions[0]);
                } else {
                    _this.props.onInputChange(input);
                    _this.setState({
                        suggestions: suggestions || [],
                        showing: true,
                        input: input
                    });
                }
            });
        }, _this2.handleKeyUp = function (e) {
            if (_this2.props.onKeyUp) {
                _this2.props.onKeyUp.call(_this2, e);
            }
            var focus = _this2.state.focus,
                s = _this2.state.suggestions;
            if (s && s.length) {
                var update = false;
                switch (e.key || e.keyCode) {
                    case 'Up':
                    case 38:
                    case 'ArrowUp':
                        {
                            focus = Math.max(-1, focus - 1);
                            update = true;
                            break;
                        }
                    case 40:
                    case 'Down':
                    case 'ArrowDown':
                        {
                            focus = Math.min(s.length, focus + 1);
                            update = true;
                            break;
                        }
                    case 'Enter':
                        {
                            if (e) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            if (s.length) {
                                _this2.handleSuggestionClick(s[Math.max(_this2.state.focus, 0)]);
                                _this2.setState({ suggestions: [], showing: false, focus: -1 });

                                return;
                            }
                            _this2.hide();
                            break;
                        }
                }
                if (update) {
                    //e.preventDefault();
                    _this2.setState({ focus: focus });
                }
            }
        }, _this2.handleChange = function (e) {
            _this2._handleDispatch(e.target.value);
        }, _this2.handleFocus = function (e) {
            if (!_this2.props.showAllOnFocus) {
                return _this2.props.onFocus && _this2.props.onFocus(e);
            }
            _this2._handleDispatch(_this2.state.input);
        }, _this2.handlePaste = function (event) {
            var items = event.clipboardData && event.clipboardData.items;
            items && items[0] && items[0].getAsString(function (input) {

                _this2.setState({ input: input, suggestions: [], showing: false });
            });
        }, _this2.handleBlur = function (event) {
            var suggestions = _this2.state.suggestions || [];
            if (suggestions.length === 1 && !_this2.state.selected) {
                _this2.handleSuggestionClick(suggestions[Math.max(0, _this2.state.focus)]);
            }
            if (_this2.props.onBlur) {
                _this2.props.onBlur(event);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
    }

    (0, _createClass3.default)(Autocomplete, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._processProps(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props, context) {
            this._processProps(props);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (nextState && nextState.suggestions && nextState.suggestions.length) {
                this.bindDocument();
            } else {
                this.unbindDocument();
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(v) {
            var p = this.processor();
            var value = p.value(v);
            var input = p.format(v);
            this.setState({
                value: value,
                selected: v,
                input: input,
                showing: false,
                suggestions: []
            });
        }

        /** In the event that the value does not have the meta data for displaying
         * We will try to fetch the object and format it.
         * @param props
         * @private
         */

    }, {
        key: '_processProps',
        value: function _processProps(props) {
            var _this3 = this;

            var value = props.value;
            if (value && value !== this.state.value) {
                //see if we can get the formatted value from the value, may not
                // work.
                var input = props.processor.format(value);
                if (input == null) {
                    //It didn't format to a value, go fetch it so we can display it.
                    props.processor.fetch(props.url, value, this, function (e, o) {
                        if (o && o.length === 1) {
                            _this3.setValue(o[0]);
                        } else {
                            _this3.setState({
                                suggestions: o,
                                showing: true
                            });
                        }
                    });
                } else {
                    this.setState({ input: input, value: value });
                }
            }
        }

        /**
         * Hide could be called when a user has not selected a value.
         *
         * If their is a selected value and input equals its label select it.
         * So if there is only 1 selection select it.
         * If
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocument();
        }
    }, {
        key: 'unbindDocument',
        value: function unbindDocument() {
            this._bound = false;
            if (this._onDocumentClickListener) {
                this._onDocumentClickListener.remove();
            }

            if (this._onDocumentKeyupListener) {
                this._onDocumentKeyupListener.remove();
            }
            if (this._onDocumentKeydownListener) {
                this._onDocumentKeydownListener.remove();
            }
        }
    }, {
        key: 'processor',
        value: function processor() {
            return this.props.processor;
        }
    }, {
        key: 'renderSuggestions',
        value: function renderSuggestions() {
            var suggestions = this.state.suggestions || [];
            if (this.state.showing === false || suggestions.length === 0) {

                return null;
            }
            var _state = this.state,
                focus = _state.focus,
                input = _state.input;

            var processor = this.processor();
            var handleSuggestionClick = this.handleSuggestionClick;
            var itemTemplate = this.props.itemTemplate;

            return _react2.default.createElement(
                'ul',
                { className: this.props.listGroupClass },
                suggestions.map(function (data, i) {
                    return (0, _subschemaCore.RenderTemplate)({
                        template: itemTemplate,
                        key: 'autocomplete-' + i,
                        focus: focus === i,
                        value: input,
                        onSelect: handleSuggestionClick,
                        data: data,
                        processor: processor
                    });
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var suggestions = this.state.suggestions || [];
            var _props = this.props,
                foundClass = _props.foundClass,
                namespaceClass = _props.namespaceClass,
                inputType = _props.inputType,
                id = _props.id,
                input = _props.input,
                notFoundClass = _props.notFoundClass,
                placeholder = _props.placeholder;

            var inputProps = {
                onPaste: this.handlePaste,
                onKeyDown: this.handleKeyUp,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onChange: this.handleChange,
                value: this.state.input,
                autoComplete: 'off',
                id: id,
                placeholder: placeholder
            };
            var Input = inputType;
            if (Input && Input.Clazz) {
                inputProps.path = '@' + id;
            }
            return _react2.default.createElement(
                'div',
                {
                    className: namespaceClass + ' ' + (suggestions.length > 0 ? foundClass : notFoundClass) },
                _react2.default.createElement(Input, (0, _extends3.default)({}, inputProps, { ref: 'input' })),
                this.renderSuggestions()
            );
        }
    }]);
    return Autocomplete;
}(_react.Component);

Autocomplete.propTypes = {
    inputType: _subschemaPropTypes2.default.type,
    onChange: _subschemaPropTypes2.default.valueEvent,
    onSelect: _subschemaPropTypes2.default.event,
    minLength: _subschemaPropTypes2.default.number,
    autoSelectSingle: _subschemaPropTypes2.default.bool,
    maxInputLength: _subschemaPropTypes2.default.number,
    itemTemplate: _subschemaPropTypes2.default.template,
    processor: _subschemaPropTypes2.default.processor,
    showing: _subschemaPropTypes2.default.content,
    foundClass: _subschemaPropTypes2.default.cssClass,
    notFoundClass: _subschemaPropTypes2.default.cssClass,
    options: _subschemaPropTypes2.default.options,
    onInputChange: _subschemaPropTypes2.default.event,
    style: _subschemaPropTypes2.default.style,
    url: _subschemaPropTypes2.default.expression,
    placeholder: _subschemaPropTypes2.default.string,
    showAllOnFocus: _subschemaPropTypes2.default.bool

};
Autocomplete.defaultProps = {
    minLength: 1,
    maxInputLength: 200,
    itemTemplate: "AutocompleteItemTemplate",
    inputType: {
        type: 'Text',
        propTypes: {
            value: _subschemaPropTypes2.default.any,
            autoComplete: _subschemaPropTypes2.default.string
        },
        defaultProps: { value: '', autoComplete: 'off' }
    },
    processor: 'OptionsProcessor',
    showing: 'Searching...',
    input: 'input',
    inputValue: 'input'
};
Autocomplete.displayName = 'Autocomplete';
exports.default = Autocomplete;
//# sourceMappingURL=Autocomplete.js.map