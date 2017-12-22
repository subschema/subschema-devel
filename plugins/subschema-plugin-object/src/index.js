import React, { PureComponent } from 'react';
import PropTypes from 'subschema-prop-types';
import { noop, path as _path, toArray, unique, warning } from 'subschema-utils';
import UninjectedField from 'subschema-field';
import UninjectedFieldSet from 'subschema-fieldset';
import renderTemplate from 'subschema-rendertemplate';

export class ObjectType extends PureComponent {
    static displayName = 'ObjectType';

    static template = false;

    static inputClassName = ' ';

    static propTypes = {
        objectTemplate  : PropTypes.template,
        fallbackTemplate: PropTypes.template,
        schema          : PropTypes.schema,
        subSchema       : PropTypes.schema,
        onButtonClick   : PropTypes.event,
        onSubmit        : PropTypes.submit,
        buttons         : PropTypes.buttons,
        path            : PropTypes.path,
        fieldsets       : PropTypes.fieldset,
        fields          : PropTypes.fields,
        FieldSet        : PropTypes.injectClass,
        Field           : PropTypes.injectClass

    };

    static defaultProps = {
        onButtonClick   : noop,
        fallbackTemplate: 'ObjectTemplate',
        FieldSet        : UninjectedFieldSet,
        Field           : UninjectedField,
        subSchema       : {},
        value           : {}
    };

    static injectedPropTypes = {
        fallbackTemplate: PropTypes.template,
    };
    static injectedProps     = {
        value: "."
    };


    static contextTypes = PropTypes.contextTypes;


    addEditor(f, field, fields, Field, idx) {

        if (field == null) {
            warning(true,
                'No field found for %s probably a key in fields does not match in schema',
                f)
            return null;
        }

        f = typeof f === 'string' ? f : f.name || f;

        return <Field key={`field-${idx}`} path={_path(this.props.path, f)}
                      conditional={field.conditional}
                      transition={field.transition} field={field}
                      fields={fields}/>
    }

    makeFieldset(f, i, schema, FieldSet, Field) {
        return <FieldSet key={`fieldset-${i}`} {...f} field={f}
                         onButtonClick={this.handleButtonClick}>
            {f.fields ? this.makeFields(f.fields, schema, Field)
                : this.makeFieldsets(f.fieldsets, schema, FieldSet, Field)}
        </FieldSet>
    };


    makeFields(fields, schema, Field) {
        const fieldMap     = {};
        const mappedfields = toArray(fields).map((field) => {
            warning(typeof field === 'string',
                'Field is not a string, probably not nesting schema:{} correctly %s',
                field);
            const [f, rest] = field.split('.', 2);
            if (rest) {
                (fieldMap[f] || (fieldMap[f] = [])).push(rest);
            }
            return f;
        });

        return unique(mappedfields).map(
            (f, i) => this.addEditor(f, schema[f] || f, fieldMap[f], Field, i));
    }

    makeFieldsets(fieldsets, schema, FieldSet, Field) {
        if (fieldsets == null) {
            return null;
        }
        return fieldsets.map(
            (f, i) => this.makeFieldset(f, i, schema, FieldSet, Field));
    }

    renderSchema(schema, FieldSet, Field) {
        return this.makeFieldsets(schema.fieldsets, schema.schema, FieldSet,
            Field);
    }

    handleButtonClick = (e, action, ...rest) => {
        const { onSubmit, onButtonClick } = this.props;
        if (onButtonClick(e, action, ...rest) !== false) {
            if (action === 'submit') {
                onSubmit(e, ...rest);
            }
        }
    };


    render() {
        //capture the things that should not fall through.
        let { schema, subSchema, onSubmit, onButtonClick, submitButton, conditional, FieldSet, Field, children, objectTemplate, fallbackTemplate, template, ...props } = this.props;

        let { ...rschema } = schema
                             || subSchema;

        return renderTemplate({
            template     : rschema.template || template || objectTemplate
                           || fallbackTemplate,
            schema       : rschema,
            onButtonClick: this.handleButtonClick,
            ...props,
            children     : rschema != null ? children ? [this.renderSchema(
                rschema,
                FieldSet, Field)].concat(children) : this.renderSchema(rschema,
                FieldSet, Field) : children
        })

    }

}

export default ({
    type: {
        Object: ObjectType,
        ObjectType
    }
})
