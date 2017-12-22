import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import { generate } from 'subschema-plugin-project';
import { saveAs as _saveAs } from 'browser-filesaver';
import { kebabCase } from 'subschema-utils';

export default class DownloadButton extends Component {

    static propTypes = {
        type      : PropTypes.oneOf(['project', 'page']),
        filename  : PropTypes.string.isRequired,
        editorCode: PropTypes.string
    };

    static defaultProps = {
        className       : '',
        buttonTxtPage   : 'Open as Page',
        buttonTxtProject: 'Download as Project',
        type            : 'page'
    };
    static saveAs       = _saveAs;
    static open         = function (blob, filename, done) {
        const url = URL.createObjectURL(blob), other = window.open(url);
        if (!other) {
            alert(
                "Looks like you have blockup popper, disable it and click again");
            return;
        } else if (other.addEventListener) {
            other.addEventListener('DOMContentLoaded', done);
            return;
        }
    };

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    label() {
        const { type, buttonTxtPage, buttonTxtProject } = this.props;
        return type === 'project' ? buttonTxtProject : buttonTxtPage;
    }

    handleDone = (e) => {
        this.setState({ done: true });
    };

    handleBlob = (blob) => {
        this.setState({ busy: false });

        var isPage = this.props.type === 'page';
        var ext    = this.props.type === 'project' ? 'zip' : 'html';
        if (isPage) {
            return DownloadButton.open(blob, `${this.props.filename}.${ext}`,
                this.handleDone);
        }
        try {
            DownloadButton.saveAs(blob, `${this.props.filename}.${ext}`, true);
        } catch (err) {
            console.log(err);
        } finally {
            this.handleDone();
        }
    };

    handleClick = (e) => {
        e && e.preventDefault();
        this.setState({ busy: true });
        const { errors, value, ...sample } = this.props.data;
        if (this.props.useData) {
            sample.value = value;
        }
        if (this.props.useErrors) {
            sample.errors = errors;
        }
        const ext      = this.props.type === 'project' ? 'zip' : 'html';
        const filename = kebabCase(this.props.filename);
        Promise.resolve(generate({
            jsName  : filename,
            title   : this.props.filename,
            project : {
                name       : kebabCase(this.props.filename),
                description: sample.description,
                version    : '1.0.0'
            },
            demo    : {},
            codeText: this.props.editorCode,
            ...sample
        }, this.props.type, `${ext}-blob`))
               .then(this.handleBlob, this.handleError);

    };

    handleError = (e) => {
        console.warn('error', e);
    };

    icon() {

        return `glyphicon ${this.props.type === 'project'
            ? 'glyphicon-download-alt' : 'glyphicon-open-file'}`

    }

    render() {
        return <button
            className={`btn btn-default ${this.props.className} ${this.state.busy
                ? 'btn-busy' : '' }`}
            onClick={this.handleClick}><i
            className={this.icon()}/>{' '}{this.label()}</button>
    }
}
