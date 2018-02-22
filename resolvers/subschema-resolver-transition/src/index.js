import PropTypes from 'subschema-prop-types';
import React from 'react';

const EMPTY = {};

export const settings = {
    on                     : ['enter', 'leave'],
    transitionEnterTimeout : 300,
    transitionAppearTimeout: 300,
    transitionLeaveTimeout : 300,
    Transition({ transitionEnter, transitionLeave, transitionAppear, transitionHeightClass, ...props }) {
//TODO - Renable
        //  warning(false,
        //      `Please set
        // subschema-core.resolvers.transition.settings.Transition to a
        // transition handler`);
        return EmptyTransition(props);
    }
};

const EmptyTransition = ({ children }) => {
    return Array.isArray(children) ? children[0] : children;
};

const NO_TRANSITION = {
    Transition: EmptyTransition
};

export function handleTransition(value, key, props, { loader }) {
    if (value == null) {
        return value;
    }
    if (value === false || value.transition === false) {
        return NO_TRANSITION;
    }
    if (typeof value === 'string') {
        value = { transition: value };
    }

    const { transition, ...config } = { ...settings, ...value };

    const {
              transitionAppearTimeout,
              transitionLeaveTimeout,
              transitionEnterTimeout,
              on,
              transitionHeightClass,
              transitionName,
              ...rest
          } = typeof transition === 'string'
        ? { ...config, ...loader.loadTransition(transition) } : transition;

    const { enter, enterActive, appear, appearActive, leave, leaveActive } = transitionName
                                                                             || EMPTY;

    const _on = Array.isArray(on) ? on : [on];
    //either the original value has the timeout or we have an on
    if (enter && (transitionEnterTimeout || _on.includes('enter'))) {
        rest.timeout    = { enter: transitionEnterTimeout };
        rest.classNames = {
            ...rest.transitionName,
            ...rest.classNames,
            enter,
            enterActive
        };
    }

    if (appear && (transitionAppearTimeout || _on.includes('appear'))) {
        rest.timeout    = { ...rest.timeout, appear: transitionAppearTimeout };
        rest.classNames = {
            ...rest.transitionName,
            ...rest.classNames,
            appear,
            appearActive,
        };

    }

    if (leave && (transitionLeaveTimeout || _on.includes('leave'))) {
        rest.timeout    = { ...rest.timeout, exit: transitionLeaveTimeout };
        rest.classNames = {
            ...rest.transitionName,
            ...rest.classNames,
            exit      : leave,
            exitActive: leaveActive,
        };

    }
    rest.className = transitionHeightClass;
    if (!rest.classNames) {
        return null;
    }
    return rest;
}

export function transition(Clazz, key) {
    Clazz.contextTypes.loader = PropTypes.loader;
    Clazz::this.property(key, handleTransition);
}

//because es6 modules.
transition.handleTransition = handleTransition;

export default {
    resolver: {
        transition
    }
};
