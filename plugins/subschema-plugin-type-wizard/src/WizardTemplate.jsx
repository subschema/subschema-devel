import React from 'react';
import WizardMixin from './WizardMixin';
import PropTypes from 'subschema-prop-types';
import { ObjectType } from 'subschema-plugin-object';
import renderTemplate from 'subschema-rendertemplate';

function donner(done) {
    done();
}

const fakeTransition = {
    Transition(props) {
        return <span {...props}/>
    },
};

export default class WizardTemplate extends WizardMixin {
    static defaultProps = {
        ...WizardMixin.defaultProps,
        wizardProgressTemplate: 'WizardProgressTemplate',
        Template              : 'ObjectTemplate',
        onNext                : donner,
        onPrevious            : donner,
        onDone                : donner,
        buttons               : {
            'previous': {
                label : 'Previous',
                action: 'previous'
            },
            'next'    : {
                label  : 'Next',
                action : 'next',
                primary: true
            },
            'last'    : {
                label  : 'Done',
                type   : "submit",
                action : 'submit',
                primary: true
            }
        },
        onAction              : function (pos, action, wizard) {
        },
        onNavChange(current, previous, wizard) {
        },
        transitionForward     : "slideRight",
        transitionBackward    : "slideLeft",
        namespaceClass        : 'wizard'
    };

    static propTypes = {
        ...WizardMixin.propTypes,
        buttons               : PropTypes.any,
        fieldsets             : PropTypes.any,
        wizardProgressTemplate: PropTypes.template,
        Template              : PropTypes.template,
        transitionForward     : PropTypes.transition,
        transitionBackward    : PropTypes.transition,
        style                 : PropTypes.style
    };

    setNavState(next) {
        const len       = this.props.schema.fieldsets.length,
              compState = this.state.compState;

        next = Math.max(Math.min(len - 1, next), 0);
        if (this.props.onNavChange(next, compState,
                this.props.schema.fieldsets[next]) !== false) {
            this.setState({
                compState: next,
                disabled : false,
                prevState: next === compState ? this.state.prevState : compState
            });
        }
    }

    renderProgress(fieldsets) {
        return renderTemplate({
            key     : 'progress-template-key',
            template: this.props.wizardProgressTemplate,
            fieldsets,
            index   : this.state.done ? fieldsets.length
                : this.state.compState,
            onClick : this.handleOnClick
        })

    }

    makeTransition(compState) {
        if (compState < this.state.prevState) {
            return this.props.transitionForward || fakeTransition;
        } else {
            return this.props.transitionBackward || fakeTransition;
        }
    }

    _handleBtn = (...args) => {
        return this.handleBtn(...args);
    };

    render() {
        let { className, Template, template, fieldsets, fields, onButtonClick, transitionLeaveTimeout, transitionEnterTimeout, carouselHeightClass, children, schema, ...rest } = this.props;
        ({ fieldsets, schema } = this.props.schema);
        const compState                     = this.state.compState,
              current                       = fieldsets[compState],
              { Transition, ...transition } = this.makeTransition(compState);
        const buttons                       = current.buttons ? current.buttons
            : this.createButtons(compState);
        const currentSchema                 = {
            schema,
            fieldsets: [{ buttons, ...current, legend: false }],
            template : Template
        };
        return (
            <div
                className={`${this.props.namespaceClass} ${(this.state.animating
                    ? this.props.animatingClass : '')}`}
                onKeyDown={this.handleKeyDown}>
                {this.renderProgress(fieldsets)}
                <Transition name={"transition-" + compState}  {...transition}>
                    <ObjectType {...rest}
                                className={`clearfix state-${compState}`}
                                key={"form-" + compState}
                                schema={currentSchema}
                                onButtonClick={this._handleBtn}/>
                </Transition>
            </div>
        );
    }
}
