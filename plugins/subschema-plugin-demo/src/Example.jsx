import React, { Component } from "react";
import PropTypes from "subschema-prop-types";
import { SubschemaPlayground as UninjectedSubschemaPlayground } from "subschema-plugin-playground";
import { loader } from "./PropTypes";

export default class Example extends Component {

    static contextTypes = PropTypes.contextTypes;

    static propTypes = {
        example            : loader,
        SubschemaPlayground: PropTypes.injectClass,
        onSubmit           : PropTypes.valueEvent,
        pathname           : PropTypes.string,
    };

    static defaultProps = {
        SubschemaPlayground: UninjectedSubschemaPlayground,
        onSubmit           : "submit",
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
        const { example: { name, description } = {} } = this.props;

        return <div>
            <h3>{name}
                <div className='pull-right btn-group btn-group-xs'>
                    <button onClick={this.handleDataBtn}
                            className='btn btn-default'>Data
                    </button>
                    <button onClick={this.handleErrorsBtn}
                            className='btn btn-default'>Error
                    </button>

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
