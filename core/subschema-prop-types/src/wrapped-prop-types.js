const ignore = ['checkPropTypes', 'PropTypes'];

const genExport = key => `export const ${key} = customPropType(_PropTypes['${key}'], '${key}')`;

const generate = ({ propTypes }) => {
    const types = Object.keys(propTypes).filter(v => !ignore.includes(v));
    const code  = `

import * as _PropTypes from 'internal-prop-types';
import customPropType from './customPropType';
    
//exports
${types.map(genExport)
       .join(';\n')};

export const PropTypes = {
        ${types.join(',\n')}
};

export const checkPropTypes = checkPropTypes;

    
export default ({
${types.join(',\n')},
checkPropTypes,
PropTypes,
});

`;

    return {
        code
    };
};

module.exports = generate;
if (require.main === module) {
    console.log(generate({ propTypes: require('prop-types') }).code)
}

