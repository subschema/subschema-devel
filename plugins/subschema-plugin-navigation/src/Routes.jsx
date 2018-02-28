import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import { Route } from 'react-router-dom'


export default class Routes extends Component {
    static template = false;


    static contextTypes = {
        loader  : PropTypes.loader,
        injector: PropTypes.injector
    };

    static propTypes = {
        notFound: PropTypes.type,
        routes  : PropTypes.oneOfType([
            PropTypes.objectOf(PropTypes.string),
            PropTypes.objectOf(
                PropTypes.shape({
                    component: PropTypes.oneOfType(
                        [PropTypes.string, PropTypes.instanceOf(
                            Component)]),
                    exact    : PropTypes.bool,
                    strict   : PropTypes.bool,
                    sensitive: PropTypes.bool,
                }))
        ]),
        pathname: PropTypes.value,
        exact   : PropTypes.bool,
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
        const value                                               = this.props.routes[path];
        const component                                           = typeof value
                                                                    === 'string'
            ? value : value && value.component;
        if (component) {
            const Component = this.resolve(component);
            return <Component key={pathname} {...params}/>
        }
        return null;
    };

    renderRoute(path) {
        const props = typeof this.props.routes[path] === 'string' ? {
            path
        } : {
            path,
            ...this.props.routes[path],
            component: null,
        };


        return <Route key={props.path}
                      {...{ exact: this.props.exact }}
                      {...props}
                      render={this.renderComponent}/>
    };

    render() {
        return Object.keys(this.props.routes).map(this.renderRoute, this);
    }
}
