import React, { Component } from "react";
import PropTypes from "subschema-prop-types";
import { SubschemaPlayground as UninjectedSubschemaPlayground } from "subschema-plugin-playground";
import { loader } from "./PropTypes";

const isEmpty = (v) => {
    if (!v) {
        return true;
    }
    if (v.length === 0) {
        return true;
    }
    return Object.keys(v).length === 0;
};

export default class Example extends Component {

    static contextTypes = PropTypes.contextTypes;

    static propTypes = {
        example            : loader,
        SubschemaPlayground: PropTypes.injectClass,
        onSubmit           : PropTypes.valueEvent,
        name               : PropTypes.value,
    };


    static defaultProps = {
        SubschemaPlayground: UninjectedSubschemaPlayground,
        onSubmit           : "submit",
        name               : "@pathname"
    };

    state = {
        useData  : false,
        useErrors: false
    };

    handleDataBtn = () => {
        this.setState({ useData: !this.state.useData });
    };

    handleErrorsBtn = () => {
        this.setState({ useErrors: !this.state.useErrors });
    };

    render() {
        //So examples matches /:  which matches everything, so its possible
        //to get here when you don't mean to.  So example will be empty.
        if (!this.props.example) {
            return null;
        }
        const { example: { title, description, data, errors } = {} } = this.props;
        const { useData, useErrors }                                 = this.state;
        return <div>
            <h3>{title || this.props.name.replace(/^\//, '')}
                <div className='pull-right btn-group btn-group-xs'>
                    { isEmpty(data) ? null : <button key='data' onClick={this.handleDataBtn}
                            className={`btn btn-outline-secondary ${useData
                                ? 'active' : ''}`}>Data
                    </button>}
                    {isEmpty(errors) ? null : <button key='error' onClick={this.handleErrorsBtn}
                            className={`btn btn-outline-danger ${useErrors
                                ? 'active' : ''}`}>Error
                    </button>}

                </div>
            </h3>
            <p>{description}</p>

            {this.renderEdit()}

        </div>
    }

    handleSubmit = (e, err, value) => {
        e && e.preventDefault();
        console.log(err, value);
        const error = err && Object.keys(err).length;
        this.props.onSubmit({
            error: error ? err : null,
            value
        });
    };

    renderEdit() {
        const { SubschemaPlayground, UpdateValue, example } = this.props;
        const {
                  name = example, schema, setupTxt,
                  props, description, data, imports, errors
              }                                             = this.props.example
                                                              || {};
        return <div className='sample-example-playground'>
            <SubschemaPlayground key={'form-' + example}
                                 theme='monokai'
                                 expandTxt="Show Example Code"
                                 collapseTxt="Hide Example Code"
                                 filename={`Example ${name}`}
                                 useData={this.state.useData}
                                 useErrors={this.state.useErrors}
                                 collapsableCode={true}
                                 setupTxt={setupTxt}
                                 value={data}
                                 errors={errors}
                                 imports={imports}
                                 props={props}
                                 description={description}
                                 schema={schema}
                                 onSubmit={this.handleSubmit}

            />
        </div>
    }
}
