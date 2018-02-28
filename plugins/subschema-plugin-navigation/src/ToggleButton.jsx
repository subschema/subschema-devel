import React, { PureComponent } from 'react';
import PropTypes from 'subschema-prop-types';


export default class ToggleButton extends PureComponent {

    static template = false;

    static propTypes = {
        label      : PropTypes.expression,
        value      : PropTypes.value,
        onChange   : PropTypes.valueEvent,
        activeClass: PropTypes.string,
        className  : PropTypes.className
    };

    handleClick = () => {
        this.props.onChange(
            this.props.value == null ? true : !this.props.value);
    };

    render() {
        const classes = [];
        if (this.props.className) {
            classes.push(this.props.className)
        }

        if (this.props.activeClass) {
            if (this.props.value) {
                classes.push(this.props.activeClass)
            }
        }
        return <button onClick={this.handleClick}
                       className={classes.join(' ')}>{this.props.label}</button>
    }

}
