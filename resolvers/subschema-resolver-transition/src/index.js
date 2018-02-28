import PropTypes from 'subschema-prop-types';
import React, { PureComponent } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FREEZE_OBJ, toArray, warning } from 'subschema-utils';


export class SubschemaTransitionGroup extends PureComponent {
    render() {
        const { className, name, ...rest } = this.props;
        return <TransitionGroup className={className}>
            <CSSTransition key={name} {...rest}/>
        </TransitionGroup>
    }
}

//TODO consider replacing this with a bool.
export class SubschemaTransition extends PureComponent {

    state = {
        in: this.props.name === 'match'
    };

    handleEnd = () => {
        this.setState({ in: this.props.name === 'match' });
    };

    componentWillReceiveProps({ name }) {
        if (name !== this.props.name) {
            this.setState({ in: name == 'match' });
        }
    }

    render() {
        const { name, ...props } = this.props;
        return <CSSTransition
            onExited={this.handleEnd}
            in={this.state.in} {...props}/>
    }

}

export const settings = {
    on        : ['enter', 'exit'],
    timeout   : 300,
    Transition: SubschemaTransitionGroup
};

export const EmptyTransition = ({ children }) => children;

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
              on,
              transitionHeightClass,
              classNames = FREEZE_OBJ,
              ...rest
          } = typeof transition === 'string'
        ? { ...config, ...loader.loadTransition(transition) } : transition;

    const {
              enter,
              enterActive,
              exit,
              exitActive,
              appear,
              appearActive
          } = classNames;

    const _on = toArray(on);

    //either the original value has the timeout or we have an on
    if (_on.includes('enter')) {
        warning(enter,
            '"enter" configured, but not defined for transition "%s"',
            transition);
        rest.classNames = {
            enter,
            enterActive
        }
    }

    if (_on.includes('appear')) {
        warning(appear,
            '"appear" configured, but not defined for transition "%s"',
            transition);
        rest.classNames = {
            ...rest.classNames,
            appear,
            appearActive,
        };
    }

    if (_on.includes('leave') || _on.includes('exit')) {
        warning(exit, '"exit" configured, but not defined for transition "%s"',
            transition);
        rest.classNames = {
            ...rest.classNames,
            exit,
            exitActive
        };
    }

    if (transitionHeightClass) {
        rest.className =
            rest.className ? `${rest.className} ${transitionHeightClass}`
                : transitionHeightClass;
    }

    if (typeof rest.Transition === 'string') {
        switch (rest.Transition) {
            case 'group':
                rest.Transition = SubschemaTransitionGroup;
                break;
            case 'single':
                rest.Transition = SubschemaTransition;
                break;
            default:
                warning(false, 'Unknown tansition type "%s"', rest.Transition);
        }
    } else if (!rest.Transition) {
        rest.Transition = settings.Transition;
    }

    if (!rest.timeout) {
        rest.timeout = settings.timeout;
    }
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
