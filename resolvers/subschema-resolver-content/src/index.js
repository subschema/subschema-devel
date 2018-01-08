import PropTypes from 'subschema-prop-types';
import React from 'react';
import { Content as UninjectedContent } from 'subschema-plugin-content';

export const settings = {
    Content: UninjectedContent
};

export function loadContent(content, key, props, { injector }) {
    if (content === false || content == null) {
        return null;
    }
    const Content = injector.inject(settings.Content);
    return {
        Content: Content,
        content: content
    }
}

export function loadRenderedContent(content, key, props, { injector }){
    if (content === false || content == null) {
        return null;
    }
    const Content = injector.inject(settings.Content);
    const {type, ...rcontent} = content;
    return <Content type={type} content={rcontent}/>
}

export default {
    resolver: {
        renderedContent(Clazz, key) {
            Clazz.contextTypes.injector = PropTypes.injector;
            Clazz::this.property(key, loadRenderedContent);
        },
        content(Clazz, key) {

            Clazz.contextTypes.injector = PropTypes.injector;
            Clazz::this.property(key, loadContent);

        }
    }
};
