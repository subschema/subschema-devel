import React, {Component} from 'react';
import PropTypes from 'subschema-prop-types';
import {SwitchIOS} from 'react-native';

export default class Checkbox extends Component {
    static propTypes = {
        onChange: PropTypes.valueEvent
    };

    changeValue = (e)=> {
        var value = !this.props.value
        this.props.onChange(value ? true : false);
    };

    render() {
        const {value} = this.props;
        return (
            <SwitchIOS
                onValueChange={this.changeValue}
                value={!!value}/>
        );
    }
}