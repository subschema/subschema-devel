import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import { NavLink } from 'react-router-dom'

export default class ToggleLink extends Component {

    static propTypes = {
        "pathname": PropTypes.value,
        "query"   : PropTypes.value
    };

    static defaultProps = {
        "label"      : "{.}",
        "name"       : "",
        "search"     : "",
        "className"  : "",
        "activeClass": "active",
        "pathname"   : "@pathname",
        "query"      : "@query"
    };


    render() {
        const {
                  className, activeClass, value, anchorClass, label
              } = this.props;
        return <li className={className}>
            <NavLink to={value}
                     activeClassName={this.props.activeClass}
                     className={anchorClass}>{label}</NavLink>
        </li>
    }
}
