import {Component} from 'react';
import PropTypes from 'subschema-prop-types';
import {Select} from 'subschema-plugin-type-select';
import {loader} from 'subschema';

class SelectListen extends Component {
    static propTypes = {
        ...Select.propTypes,
        options: PropTypes.listener
    };

    render() {
        let value = this.props.value;
        if (value == null && this.props.options) {
            value = this.props.options[0].val;
        }
        return <Select {...this.props} value={value}/>
    }
}
loader.addType('SelectListen', SelectListen);
