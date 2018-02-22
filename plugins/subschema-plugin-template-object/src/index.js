import React, { Component } from 'react';

export class ObjectTemplate extends Component {
    static displayName = 'ObjectTemplate';

    render() {
        const { children, className, fieldAttrs, ...rest } = this.props;
        return (<div className={className} {...fieldAttrs}>
            {children}
        </div>);
    }
}

export default ({
    template: {
        ObjectTemplate
    }
});
