import React, { PureComponent } from 'react';
import PropTypes from 'subschema-prop-types';
import { NavLink } from 'react-router-dom'

class NavigateItem extends PureComponent {

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
    };

    render() {
        return <NavLink to={this.props.href}
                        activeClassName='active'
                        className={'list-group-item'}>{this.props.label}</NavLink>
    }

}

export default class Navigate extends PureComponent {

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
