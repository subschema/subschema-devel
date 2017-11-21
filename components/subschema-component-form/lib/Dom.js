"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventListener = undefined;
exports.listen = listen;
exports.ownerDocument = ownerDocument;
exports.isNodeInRoot = isNodeInRoot;

var _EventListener2 = require('fbjs/lib/EventListener');

var _EventListener3 = _interopRequireDefault(_EventListener2);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventListener = exports.EventListener = _EventListener3.default;
/**
 * listen
 */
function listen(node, event, func) {
    return EventListener.listen(ownerDocument(node), event, func);
}
/**
 * Get elements owner document
 *
 * @param {ReactComponent|HTMLElement} componentOrElement
 * @returns {HTMLElement}
 */
function ownerDocument(componentOrElement) {
    var elem = _reactDom2.default.findDOMNode(componentOrElement);
    return elem && elem.ownerDocument || document;
}
/**
 * Checks whether a node is within
 * a root nodes tree
 *
 * @param {DOMElement} node
 * @param {DOMElement} root
 * @returns {boolean}
 */
function isNodeInRoot(node, root) {
    node = _reactDom2.default.findDOMNode(node), root = _reactDom2.default.findDOMNode(root);
    return _isNodeInRoot(node, root);
}
function _isNodeInRoot(node, root) {
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
}

exports.default = {
    listen: listen,
    ownerDocument: ownerDocument,
    isNodeInRoot: isNodeInRoot
};
//# sourceMappingURL=Dom.js.map