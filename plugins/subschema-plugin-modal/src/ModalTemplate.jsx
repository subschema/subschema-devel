import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import RenderContent from 'subschema-rendercontent';
import { warning } from 'subschema-utils';
import { createPortal } from 'react-dom';

export default class ModalTemplate extends Component {
    static propTypes = {
        stash           : PropTypes.stash,
        unstashOnUnmount: PropTypes.unstash,
        clearStash      : PropTypes.clearStash,
        validate        : PropTypes.validateFields,
        style           : PropTypes.style,
        title           : PropTypes.content,
        //buttons will get an object describing buttons, not a rendered  node
        buttons         : PropTypes.buttons,
        path            : PropTypes.path,
        dismiss         : PropTypes.valueEvent,
        buttonsTemplate : PropTypes.template,
        legend          : PropTypes.content,
        error           : PropTypes.error,
        target          : PropTypes.domNode,
    };

    static defaultProps = {
        onButtonClick() {
        },
        domNode         : 'body',
        buttonsTemplate : 'ButtonsTemplate',
        unstashOnUnmount: true,
        buttons         : {
            buttonsClass: 'pull-right btn-group',
            buttons     : [
                {
                    label    : "Cancel",
                    action   : 'cancel',
                    className: 'btn'
                },
                {
                    label    : "Save",
                    action   : 'submit',
                    primary  : true,
                    className: 'btn btn-primary'
                }
            ]
        },
        dismiss() {
            warning(false, 'no dismiss path given to modal');
        }
    };

    handleBtnClose    = (e) => {
        e && e.preventDefault();
        this.props.dismiss();
    };
    handleButtonClick = (e, action, btn) => {
        e && e.preventDefault();
        const { buttons } = this.props;
        if (!buttons) {
            return;
        }
        const { onButtonClick = buttons.onButtonClick } = this.props;
        switch (action) {
            case 'cancel':
            case 'close':
                this.handleBtnClose(e);
                return false;
            //handle submits and such
            default: {
                const errors = this.props.validate && this.props.validate();
                if (errors) {
                    onButtonClick && onButtonClick(e, action, btn);

                    return;
                }
                //clear the stashes so that they won't reapply when
                //component comes back.
                this.props.clearStash();
                this.props.dismiss();
                onButtonClick && onButtonClick(e, action, btn);

            }
        }
    };

    renderFooter(buttons) {
        if (buttons == false || buttons == null) {
            return null;
        }
        const {
                  template = this.props.buttonsTemplate,
                  ...rest
              }                      = buttons;
        const { Template, ...trest } = template;
        return <div className={this.props.footerClass}>
            <Template {...trest} {...rest}
                      onButtonClick={this.handleButtonClick}/></div>
    }

    target() {
        if (this.props.target) {
            if (typeof this.props.target === 'string') {
                return document.querySelector(this.props.target);
            }
            return this.props.target;
        }
        return document.body;
    }

    render() {
        const { title, legend, buttons, path, value, bodyClass, headerClass, closeClass, contentClass, backdropClass, dialogClass, namespaceClass, overlayClass, children, ...rest } = this.props;

        return createPortal(<dialog className={dialogClass}>
            <div className={contentClass}>
                <div className={headerClass}>
                    <button onClick={this.handleBtnClose}
                            className={closeClass}
                            name={this.props.path + '@dismiss'}
                            value={value}
                            aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                    <RenderContent type='h4' content={title || legend}/>
                </div>
                <div className={bodyClass}>
                    {children}
                </div>
                {this.renderFooter(buttons)}
            </div>
        </dialog>, this.target());
    }
}
