import React, {PureComponent} from "react";
import {Editor} from "subschema-component-playground";
import PropTypes from "subschema-prop-types";
import AceEditor from "react-ace";
import "brace/theme/chrome";
import "brace/mode/json";


const parseJson = (v, cb = console.trace) => {
    if (v == null) {
        return v;
    }
    if (typeof v === 'string') {
        try {
            return JSON.parse(v);
        } catch (e) {
            cb && cb(e);
            return;
        }
    }
    return v;
};

const toString = (value) => {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return JSON.stringify(value, null, 2);
}
export default class SchemaEditor extends PureComponent {
    static propTypes = {
        onChange: PropTypes.valueEvent,
        value: PropTypes.value
    };
    static defaultProps = {
        mode: 'application/json',
        lineNumbers: true,
        readOnly: false,
        useWorker: true,
        showGutter: true,
        highlightActiveLine: true
    };
    handleLoad = (editor) => {
        editor.focus();
        editor.getSession().setUseWrapMode(true);
        editor.setHighlightActiveLine(this.props.highlightActiveLine);
    };

    handleChange = (src) => {
        try {
            this.props.onChange(src == null ? src : JSON.parse(src));
        } catch (e) {
            console.error(`error with src`, e);
        }
    };

    render() {
        return <AceEditor
            mode='json'
            theme='chrome'
            name='code'
            width='100%'
            maxLines={50}
            ref='ace'
            fontSize={12}
            readOnly={this.props.readOnly}
            showLineNumbers={this.props.lineNumbers}
            value={toString(this.props.value)}
            editorProps={{$blockScrolling: Infinity}}
            setOptions={{
                showLineNumbers: this.props.lineNumbers,
                showGutter: this.props.showGutter,
                useWorker: this.props.useWorker,
            }}
            onChange={this.handleChange}
            onLoad={this.handleLoad}
        />
    }
}
