import React, { PureComponent } from 'react';
import {Text} from 'subschema-plugin-type-text';

export class Password extends Text {
    static defaultProps = {
        ...Text.defaultProps,
        type: 'password'
    };

    render() {
        return <Text {...this.props}/>
    }

}

export default ({
    type: {
        Password
    }
});
