import React, {Component} from "react";
import UninjectedContent from "subschema-core/lib/Content";
import PropTypes from "subschema-prop-types";

export default class RadioItemTemplate extends Component {
    static propTypes = {
        label: PropTypes.any,
        labelHTML: PropTypes.any,
        checked: PropTypes.bool,
        checkedClass: PropTypes.string,
        id: PropTypes.id,
        path: PropTypes.path,
        Content: PropTypes.injectClass,
        style: PropTypes.style
    };

    static defaultProps = {
        Content: UninjectedContent,
        namespaceClass: "radio",
        checkedClass: "",
        uncheckedClass: "",
        labelType: 'label',
        wrapperType: 'div'
    };

    render() {
        let {Content, label, namespaceClass, labelHTML, children, checked, checkedClass, uncheckedClass, id, path} = this.props;
        id = id || path;
        label = labelHTML ? labelHTML : label;
        checkedClass = checkedClass || '';
        label = typeof label === 'string' ? {
            className: [namespaceClass, checked ? checkedClass : uncheckedClass].join(' '),
            type: this.props.wrapperType,
            content: [{
                type: this.props.labelType,
                className: '',
                htmlFor: id,
                //true -outputs child.
                content: [true, label]
            }]
        } : label;
        return (<Content content={label}>
            {children}
        </Content>);
    }
}
