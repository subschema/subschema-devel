import React, { PureComponent } from 'react';
import PropTypes from 'subschema-prop-types';
import { newSubschemaContext } from 'subschema';
import { Example } from 'subschema-plugin-demo';
import _importer from 'subschema-plugin-autoloader/importer';

const importer = _importer();
const ctx      = () => {
    //eslint-disable-next-line no-unused-vars
    const { valueManager, loader, injector, ...rest } = newSubschemaContext();
    loader.loaderType('Example');
    return {
        valueManager, loader, injector
    }
};

class InlineExample extends Example {
    static propTypes = {
        ...Example.propTypes,
        example: PropTypes.object,
        name   : PropTypes.string,
    }
}

export default class InlinePlayground extends PureComponent {

    static childContextTypes = PropTypes.contextTypes;

    static context = ctx();

    getChildContext() {
        return InlinePlayground.context;
    }

    componentWillMount() {
        this.SubschemaExample = InlinePlayground.context.injector.inject(InlineExample);
    }

    handleSubmit = () => {
        console.log('submit')
    };

    render() {
        const { SubschemaExample } = this;
        const example        = importer(this.props.name);
        return (<SubschemaExample {...this.props} name='' example={example.default || example}
                           onSubmit={this.handleSubmit}/>)
    }
}
window.InlinePlayground = InlinePlayground;
