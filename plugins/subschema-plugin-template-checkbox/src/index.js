import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';

export class CheckboxTemplate extends Component {
    static propTypes    = {
        label  : PropTypes.node,
        style  : PropTypes.style,
        checked: PropTypes.bool
    };
    static defaultProps = {
        style         : "CheckboxTemplate",
        checkedClass  : "",
        uncheckedClass: "",
        checkboxClass : ""
    };

    render() {
        const { children, checkboxClass, checked, checkedClass, uncheckedClass, label } = this.props;
        return (<div className={`${checkboxClass} ${checked ? checkedClass
            : uncheckedClass} `}>
            <label>
                {children}
                {label}
            </label>
        </div>);
    }
}

export default ({
    template: {
        CheckboxTemplate,
        CheckboxesTemplate: CheckboxTemplate
    }
})
