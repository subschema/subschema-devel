'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.templates = exports.WizardProgressTemplate = exports.WizardTemplate = exports.WizardMixin = undefined;

var _WizardProgressTemplate2 = require('./WizardProgressTemplate');

var _WizardProgressTemplate3 = _interopRequireDefault(_WizardProgressTemplate2);

var _WizardTemplate2 = require('./WizardTemplate');

var _WizardTemplate3 = _interopRequireDefault(_WizardTemplate2);

var _WizardMixin2 = require('./WizardMixin');

var _WizardMixin3 = _interopRequireDefault(_WizardMixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WizardMixin = exports.WizardMixin = _WizardMixin3.default;
var WizardTemplate = exports.WizardTemplate = _WizardTemplate3.default;
var WizardProgressTemplate = exports.WizardProgressTemplate = _WizardProgressTemplate3.default;
var templates = exports.templates = {
    WizardTemplate: WizardTemplate,
    WizardProgressTemplate: WizardProgressTemplate
};
exports.default = {
    templates: templates
};
//# sourceMappingURL=index.js.map