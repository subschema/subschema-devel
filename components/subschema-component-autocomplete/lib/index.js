'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.types = exports.templates = exports.AutocompleteItemTemplate = exports.Autocomplete = undefined;

var _Autocomplete2 = require('./Autocomplete');

var _Autocomplete3 = _interopRequireDefault(_Autocomplete2);

var _AutocompleteItemTemplate2 = require('./AutocompleteItemTemplate');

var _AutocompleteItemTemplate3 = _interopRequireDefault(_AutocompleteItemTemplate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Autocomplete = exports.Autocomplete = _Autocomplete3.default;

var AutocompleteItemTemplate = exports.AutocompleteItemTemplate = _AutocompleteItemTemplate3.default;

var templates = exports.templates = {
    AutocompleteItemTemplate: AutocompleteItemTemplate
};

var types = exports.types = {
    Autocomplete: Autocomplete
};

exports.default = { templates: templates, types: types };
//# sourceMappingURL=index.js.map