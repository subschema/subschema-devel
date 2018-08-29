import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import ValueManager from 'subschema-valuemanager';
import loader from 'subschema-loader';
import injector from 'subschema-injection';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { ReactWrapper, configure, mount as _mount } from 'enzyme';

function prettyLog(result) {
    console.log(JSON.stringify(result, null, '\t'));
}

function cleanUp() {
    const nodes = document.getElementsByClassName('__test__inserted__');
    let node;
    while ((node = nodes[0])) {
        try {
            const ret = ReactDOM.unmountComponentAtNode(node);
        } catch (e) {
            console.trace(e);
        }
        nodes[0].parentNode.removeChild(node);
    }
}

let __id = 0;

function into(node, debug) {
    const attachTo     = document.createElement('div');
    attachTo.className = `__test__inserted__`;
    attachTo.id        = `__test_${__id++}`;
    if (debug === true) {
        document.body.appendChild(attachTo);
    }
    return _mount(node, { attachTo });
}

function notByType(node, type, description) {
    const ret = byTypes(node, type);
    expect(ret.at(0), description).to.have.length(0);
    return ret;
}

function expected(nodes, length) {
    if (length === void(0)) {
        return nodes;
    }
    if (nodes.length !== length) {
        expect(nodes).to.have.length(length);
    }
    return nodes;
}

function byTypes(node, type, length) {
    const rest = expected(node.find(type), length);

    return rest;
}

function byType(node, type) {
    return node.find(type);
}

function byTag(node, tag) {
    return node.find(`${tag}`);
}

function byTags(node, tag, length) {
    return expected(node.find(`${tag}`), length);
}

function onlyOne(node) {
    expect(node).to.have.length(1);
    return node;
}

function byName(root, prop) {
    return root.find(`[name="${prop}"]`)
}


function filterProp(node, property, value) {
    node = Array.isArray(node) ? node : [node];
    return node.filter((n) => {
        const props = (n instanceof Element) ? n.attributes : n.props;
        if (property in props) {
            if (value === null) {
                return true;
            }

            return props[property] === value;
        }
        return false;
    })
}

function byId(node, id) {
    return onlyOne(node.find(`#${id}`));
}

function click(node, form) {
    node.simulate('click');
    form && form.update();
    return node;
}


function change(node, value, form) {
    node.simulate('change', { target: { value } });
    form && form.update();
    return node;
}

function check(node, checked, value, form) {
    node.simulate('change', { target: { checked, value } });
    form && form.update();
    return node;
}

function blur(node, form) {
    node.simulate('blur');
    form && form.update();
    return node;
}

function focus(node, form) {
    node.simulate('focus')
    form && form.update()
    return node;
}

function submit(node, value, form){

    node.simulate('submit', value)
    form && form.update();
    return node;
}


function byComponent(node, comp) {
    return onlyOne(node.find(comp));
}

function byComponents(node, comp, length) {
    return expected(node.find(comp), length);
}

function byClass(node, className) {
    return node.find(`.${className}`);
}

function findNode(n) {
    return n.getDOMNode();
}

function defChildContext() {
    return {
        valueManager: ValueManager(),
        loader      : loader,
        injector    : injector
    };
}


function intoWithContext(child, context, attachTo, contextTypes) {

    if (attachTo == true) {
        attachTo = document.createElement('div');
        document.body.appendChild(attachTo);
    } else if (attachTo == null || attachTo == false) {
        attachTo = document.createElement('div');
    }
    if (context && !contextTypes) {
        contextTypes = Object.keys(context).reduce(function (ret, key) {
            ret[key] = PropTypes[key] || PropTypes.any;
            return ret;
        }, {});
    }

    return _mount(child, { context, attachTo, contextTypes, childContextTypes:contextTypes });
}


function select(node, index) {
    const multiple = Array.isArray(index);

    const options = byTags(node, 'option').map(v => v.getDOMNode());
    if (!multiple) {
        options.forEach((option, idx) => {
            option.selected = (idx === index);
        })
    } else {
        options[index].selected = !options[index].selected
    }

    node.simulate('change', {
        target: {
            options,
            value: multiple ? options.map(o => o.value) : options[index].value
        }
    });
    return node;
}

class StateWrapper extends Component {
    render() {
        return React.cloneElement(this.props.children, this.state);
    }
}

function intoWithState(child, state, debug) {
    const s = into(<StateWrapper>{child}</StateWrapper>, debug);
    if (state != null) {
        s.instance().setState(state);
    }
    return {
        state: s,
        child: s.first()
    }
}

function mount(node, debug) {
    if (debug) {
        const attachTo = document.createElement('div');
        document.body.appendChild(attachTo);
        return _mount(node, { attachTo });
    }
    return _mount(node);
}

export {
    mount,
    cleanUp,
    React,
    ReactDOM,
    intoWithState,
    into,
    intoWithContext,
    prettyLog,
    findNode,
    expect,
    byId,
    byName,
    byTags,
    byTag,
    byType,
    byTypes,
    notByType,
    filterProp,
    byClass,
    byComponent,
    byComponents,
    //trigger events
    select,
    click,
    change,
    check,
    blur,
    focus,
    expected,
    submit
}
