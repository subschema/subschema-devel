import React, { Component } from 'react';
import { extend, isString } from 'subschema-utils';
import PropTypes from 'subschema-prop-types';
import renderTemplate from 'subschema-rendertemplate';

export class ButtonsTemplate extends Component {
    static defaultProps = {
        buttonTemplate: 'ButtonTemplate',
        buttons       : [{
            action  : 'submit',
            label   : 'Submit',
            type    : 'submit',
            template: 'Button',
            primary : true
        }],
        onButtonClick(event, action, btn, value) {

        }
    };

    static propTypes = {
        buttonTemplate: PropTypes.template,
        buttonClass   : PropTypes.cssClass,
        style         : PropTypes.style,
    };


    makeButtons(buttons) {
        let onClick        = this.props.onButtonClick || this.props.onClick,
            buttonTemplate = this.props.buttonTemplate;
        if (buttons == null || buttons === false) {
            return null;
        }
        if (Array.isArray(buttons)) {
            return buttons.map(b => {
                onClick      = b.onClick || onClick;
                const btn    = isString(b) ? {
                    action: b,
                    label : b,
                    onClick
                } : extend({}, b, { onClick, template: buttonTemplate });
                let btnClass = this.props.buttonClass;
                if (btn.buttonClass) {
                    btnClass = `${btn.buttonClass} ${btnClass}`;
                }
                if (btn.primary) {
                    btn.buttonClass =
                        `${btnClass} ${this.props.primaryClass}`;
                } else {
                    btn.buttonClass =
                        `${btnClass} ${this.props.secondaryClass}`;

                }
                return btn;
            });
        }
        return Object.keys(buttons).map(function (b) {
            const v      = buttons[b];
            onClick      = v.onClick || onClick;
            const btn    = isString(v) ? {
                action: b,
                label : v,
                onClick
            } : { ...v, onClick, template: buttonTemplate };
            let btnClass = this.props.buttonClass;
            if (btn.buttonClass) {
                btnClass = `${btn.buttonClass} ${btnClass}`;
            }
            if (btn.primary) {
                btn.buttonClass = `${btnClass} ${this.props.primaryClass}`;
            } else {
                btn.buttonClass = `${btnClass} ${this.props.secondaryClass}`;

            }
            if (!btn.action) {
                btn.action = b;
            }
            return btn;
        }, this)
    }

    render() {
        let { buttons, buttonTemplate, buttonsClass, buttonContainerClass } = this.props;
        if (buttons.buttons) {
            buttonsClass = buttons.buttonsClass || buttonsClass;
            buttons      = buttons.buttons
        }
        return (<div className={buttonContainerClass}>
            <div className={buttonsClass}>
                {this.makeButtons(buttons).map(
                    (b, i) => renderTemplate(
                        { template: buttonTemplate, key: `btn-${i}`, ...b })
                )}
            </div>
        </div>);
    }

}

export default ({
    template: { ButtonsTemplate }
})
