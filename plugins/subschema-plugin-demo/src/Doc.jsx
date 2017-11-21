import React, {Component} from "react";
import PropTypes from "subschema-prop-types";
import {loader} from "./PropTypes";

export default class Doc extends Component {

    static contextTypes = PropTypes.contextTypes;

    static propTypes = {
        Doc: loader
    };

    render() {
        const {Doc} = this.props;
        return <Doc/>
    }
}
