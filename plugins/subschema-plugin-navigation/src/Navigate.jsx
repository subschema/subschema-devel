import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';

class NavigateItem extends Component {

    static propTypes = {
        id      : PropTypes.id,
        href    : PropTypes.expression,
        label   : PropTypes.expression,
        active  : PropTypes.bool,
        pathname: PropTypes.string,
        prefix  : PropTypes.string,
    };

    static defaultProps = {
        pathname: "",
        active  : false,
    };

    render() {
        const {
                  href,
                  label,
                  prefix,
                  pathname,
                  onClick
              }         = this.props;
        const className = `list-group-item ${( href === pathname ? 'active'
            : '')}`;
        return <a href={prefix + href}
                  onClick={onClick}
                  className={className}>{label}</a>
    }

}

export default class Navigate extends Component {

    static propTypes = {
        path    : PropTypes.path,
        pathname: PropTypes.value,
        Item    : PropTypes.injectClass,
        href    : PropTypes.string,
        val     : PropTypes.string,
        prefix  : PropTypes.string
    };

    static defaultProps = {
        pathname: "@pathname",
        Item    : NavigateItem,
        href    : '/{.val}',
        label   : '{.label}',
        prefix  : '#',
    };


    renderItems() {
        const { Item, value, path, href, prefix, label, pathname } = this.props;
        console.log('pathname', pathname);
        return value.map(
            (v, i) => <Item key={`nav-item-${i}`}
                            pathname={pathname}
                            href={href}
                            label={label}
                            prefix={prefix}
                            path={`${path}.${i}`}/>);
    }

    render() {
        return <div className="list-group left-nav">
            {this.renderItems()}
        </div>
    }
}
