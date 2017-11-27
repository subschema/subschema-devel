import PropTypes from 'subschema-prop-types';
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

export default {
    resolver: {
        content: function (Clazz, key) {

            Clazz.contextTypes.injector = PropTypes.injector;
            Clazz::this.property(key, loadContent);

        }
    }
};
