import PropTypes, { customPropType } from "subschema-prop-types";

export const loader = customPropType(PropTypes.any, 'loader');

export default ({
    loader
});
