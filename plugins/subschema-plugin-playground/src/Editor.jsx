import React, {Component} from "react";
import PropTypes from "subschema-prop-types";
import AceEditor from "react-ace";
import "brace/theme/chrome";
import "brace/theme/monokai";
import "brace/mode/javascript";
import "brace/mode/json";
import "brace/mode/jsx";

const mapErrors = (error) => {
    const row = error.loc && (error.loc.line - 1) || 0;
    const column = error.loc && error.loc.column || 0;
    const text = error && error.message;

    return {
        row,
        column,
        text,
        type: "error"
    };
};
/**
 * Don't use the built in warnings because babel will have
 * different allowed inputs.
 */
export default class Editor extends Component {

    static propTypes = {
        theme: PropTypes.string,
        readOnly: PropTypes.bool,
        external: PropTypes.bool,
        codeText: PropTypes.string,
        onChange: PropTypes.func,
        style: PropTypes.object,
        className: PropTypes.string,
        mode: PropTypes.string,
        lineNumbers: PropTypes.bool,
        lineWrapping: PropTypes.bool,
        smartIndent: PropTypes.bool,
        matchBrackets: PropTypes.bool,
        useWorker: PropTypes.bool,
        errors: PropTypes.array,
        firstLineNumber: PropTypes.number,
        maxLines: PropTypes.number,
        highlightActiveLine: PropTypes.bool,
        useWrapMode: PropTypes.bool

    };
    static defaultProps = {
        theme: 'chrome',
        useWorker: false,
        firstLineNumber: 1,
        mode: 'javascript',
        lineNumbers: false,
        lineWrapping: true,
        smartIndent: false,
        matchBrackets: true,
        codeText: '',
        useWrapMode: true
    };
    handleLoad = (editor) => {
        editor.focus();
        editor.getSession().setUseWrapMode(this.props.useWrapMode);
        editor.setHighlightActiveLine(this.props.highlightActiveLine);
        this._editor = editor;
        if (this.props.errors) {
            this.addErrors(this.props);
        }
    };

    componentWillReceiveProps(props) {
        if (this.props.errors != props.errors) {
            this.addErrors(props);
        }
    }

    addErrors({errors}) {
        if (!this._editor)
            return;
        errors = errors || [];
        const session = this._editor.getSession();
        session.setAnnotations(errors.map(mapErrors));
    }

    render() {
        return <AceEditor
            mode={this.props.mode}
            theme={this.props.theme}
            onChange={this.props.onChange}
            name='editor'
            readOnly={this.props.readOnly}
            lineNumbers={true}
            value={this.props.codeText.trim()}
            editorProps={{$blockScrolling: true}}
            maxLines={this.props.maxLines}
            width="100%"
            setOptions={{
                firstLineNumber: this.props.firstLineNumber,
                highlightActiveLine: this.props.highlightActiveLine,
                useWorker: this.props.useWorker
            }}
            onLoad={this.handleLoad}
        />

    }
}
