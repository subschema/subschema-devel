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
            <div className={this.props.innerClass}>
                <div className={this.props.headerClass}>
                    <a className={this.props.brandClass}
                       href="#">{this.props.content || this.props.brandText}</a>
                </div>
                <div className={this.props.collapseClass}>
                    <ul className={this.props.menuClass}>
                        {this.props.children}
                    </ul>
                </div>
            </div>
        </nav>);
    }
}
