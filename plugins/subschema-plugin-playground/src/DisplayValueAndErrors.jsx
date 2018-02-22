import React, {Component} from "react";
import PropTypes from "subschema-prop-types";
import SchemaEditor from "./SchemaEditor";

const stringify = (obj) => {
    if (obj == null) return '';
    return JSON.stringify(obj, null, 2);
}
export default class DisplayValueAndErrors extends Component {
    static propTypes = {
        value: PropTypes.value,
        errors: PropTypes.errors
    };


    render() {
        return <div className="form-group">
            <h3>Values:</h3>
            <SchemaEditor readOnly={true}
                          useWorker={false}
                          showGutter={false}
                          highlightActiveLine={false}
                          lineNumbers={false}
                          value={stringify(this.props.value)}/>
            <h3>Errors:</h3>
            <SchemaEditor readOnly={true}
                          useWorker={false}
                          showGutter={false}
                          highlightActiveLine={false}
                          lineNumbers={false}
                          value={stringify(this.props.errors || "No Errors")}/>
        </div>
    }
};