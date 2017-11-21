import React, { PureComponent } from 'react';
import { ObjectType  as UninjectedObjectType } from 'subschema-core';
import PropTypes from 'subschema-prop-types';
/**
 * Get a schema from a valueManager value.
 */
export default class DynamicSchema extends PureComponent {
    static  propTypes   = {
        ...UninjectedObjectType.propTypes,
        schema            : PropTypes.value,
        //These are just to swallow.
        field             : PropTypes.any,
        fieldsets         : PropTypes.any,
        InjectedObjectType: PropTypes.injectClass
    };
    static defaultProps = {
        ...UninjectedObjectType.defaultProps,
        InjectedObjectType: UninjectedObjectType
    };

    render() {
        const { InjectedObjectType, field, fieldsets, ...props } = this.props;
        return <InjectedObjectType {...props}/>
    }
}

