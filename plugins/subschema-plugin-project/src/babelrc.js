const babelrc = {
    "presets": [
        //     "@babel/preset-env",
        'env',
        'react'
    ],
    "plugins":[
        'proposal-class-properties'
    ]
};

//const babelrc = require('mrbuilder-plugin-babel/babel-config');

module.exports = () => {

    console.log('babelrc ', JSON.stringify(babelrc, null, 2));

    return {
        cacheable: true,
        code     : `
     import '@babel/preset-env-standalone';
     
      

     export default ${JSON.stringify(babelrc)}
    
    `
    }
};
