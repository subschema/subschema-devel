import React, {Component} from "react";
import PropTypes from "subschema-prop-types";
import {SubschemaPlayground as UninjectedSubschemaPlayground} from "subschema-component-playground";
import {loader} from "./PropTypes";
export default class Example extends Component {

    static contextTypes = PropTypes.contextTypes;

    static propTypes = {
        example: loader,
        SubschemaPlayground: PropTypes.injectClass,
        useData: PropTypes.value,
        useErrors: PropTypes.value,
        onSubmit: PropTypes.valueEvent,
    };

    static defaultProps = {
        SubschemaPlayground: UninjectedSubschemaPlayground,
        onSubmit: "submit",
        useData: "@query.useData",
        useErrors: "@query.useErrors",
    };


    render() {
        const {example: {name, description}} = this.props;
        return <div>
            <h3>{name}</h3>
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
        const {SubschemaPlayground, UpdateValue} = this.props;
        const {name, schema, setupTxt, props, description, data, imports, errors} = this.props.example
        || {};
        return <div className='sample-example-playground'>
            <SubschemaPlayground key={'form-' + name}
                                 theme='monokai'
                                 expandTxt="Show Example Code"
                                 collapseTxt="Hide Example Code"
                                 filename={`Example ${name}`}
                                 useData={!!this.props.useData}
                                 useErrors={!!this.props.useErrors}
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
