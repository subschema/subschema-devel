import React, { PureComponent } from 'react';
import Text from 'subschema-plugin-type-text';

export default class Password extends Text {
    static defaultProps = {
        ...Text.defaultProps,
        type: 'password'
    };

    render() {
        return <Text {...this.props}/>
    }

}
