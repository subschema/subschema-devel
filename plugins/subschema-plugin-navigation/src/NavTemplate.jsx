import React, { Component } from "react";
import PropTypes from 'subschema-prop-types';

export default class NavTemplate extends Component {
    static propTypes    = {
        style: PropTypes.style
    };
    static defaultProps = {
        brandText: "Subschema",
    };

    render() {
        return (<nav className={this.props.containerClass}>
            <a className={this.props.brandClass}
               href="#">{this.props.content || this.props.brandText}</a>

            {this.props.children}

        </nav>);
    }
}
