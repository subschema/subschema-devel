import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import route from '@funjs/route-parser/dist/index.umd';
import { Route } from 'react-router-dom'

function matcher(obj) {
    const arr = Object.keys(obj).map(function makeMatch(key) {
        return { match: route(key).match, component: obj[key] };
    });

    return function (path, resolve) {
        for (const cur of arr) {
            const props = cur.match(path);
            if (props) {
                if (!cur.Component) {
                    cur.Component = resolve(cur.component)
                }
                return [props, cur.Component];
            }
        }
        return null;
    }
}

export default class Routes extends Component {
    static template = false;

    static matcher = matcher;

    static contextTypes = {
        loader  : PropTypes.loader,
        injector: PropTypes.injector
    };

    static propTypes    = {
        notFound: PropTypes.type,
        routes  : PropTypes.object,
        pathname: PropTypes.value
    };
    static defaultProps = {
        pathname: "@pathname",
        notFound: "NotFound"
    };


    resolve = (component) => {
        if (typeof component == 'string') {
            const Component = this.context.loader.loadType(component);
            if (Component) {
                return this.context.injector.inject(Component);
            }
        }
        return component;
    };

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.log(error, info);
    }

    renderComponent = (props) => {
        const { match: { path, params }, location: { pathname } } = props;
        console.log('props', props);
        const component = this.props.routes[path];
        if (component) {
            const Component = this.resolve(component);
            return <Component key={pathname} {...params}/>
        }
        return null;
    };

    renderRoute(path) {
        return <Route key={path} path={path} render={this.renderComponent}/>
    };

    render() {
        const { pathname, routes } = this.props;

        return Object.keys(routes).map(this.renderRoute, this);

    }
}
