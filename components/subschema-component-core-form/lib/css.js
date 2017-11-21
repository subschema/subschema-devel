'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addClasses = addClasses;
exports.addClass = addClass;
exports.hasClass = hasClass;
exports.removeClass = removeClass;

var _subschemaUtils = require('subschema-utils');

function addClasses(classes, str) {
    if (str == null) {
        return;
    }
    if ((0, _subschemaUtils.isString)(str)) {
        (0, _subschemaUtils.push)(classes, str.split(/\s+?/));
    }
    if ((0, _subschemaUtils.isArray)(str)) {
        str.forEach(function (v) {
            return addClasses(classes, v);
        });
    }
    if ((0, _subschemaUtils.isFunction)(str)) {
        addClasses(classes, str.call(this));
    }
}

function addClass(node, className) {
    if (className) {
        if (node.classList) {
            node.classList.add(className);
        } else if (!api.hasClass(node, className)) {
            node.className = node.className + ' ' + className;
        }
    }
    return node;
}

function hasClass(node, className) {
    if (node.classList) {
        return !!className && node.classList.contains(className);
    }
    return node.className.split(/\s+?/).indexOf(className) > -1;
}

function removeClass(node, className) {
    if (className) {
        if (node.classList) {
            node.classList.remove(className);
        } else {
            var parts = node.className.split(/\s+?/),
                idx;
            while ((idx = parts.indexOf(className)) > -1) {
                parts.splice(idx, 1);
            }
            node.className = parts.join(' ');
        }
    }
    return node;
}

exports.default = {
    hasClass: hasClass,
    removeClass: removeClass,
    addClass: addClass,
    addClasses: addClasses
};
//# sourceMappingURL=css.js.map