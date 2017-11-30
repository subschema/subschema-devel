const { expect } = require('chai');
const mod        = require('../subschema-webpack.config');

describe('susbchema-dev-less', function () {
    it('should load', function () {
        const webpack = {
            plugins: [],
            module : {
                rules: []
            }
        };
        let called    = [];
        mod.call({
            useStyle(...args) {
                called.push(...args);
                return args.filter(Boolean);
            }
        }, {}, webpack);
        console.log(JSON.stringify(webpack, null, 2));
        expect(called).to.have.length(3);
        expect(webpack.module.rules).to.have.length(1);
        expect(JSON.parse(JSON.stringify(webpack))).to.eql({
            "plugins": [],
            "module" : {
                "rules": [
                    {
                        "test"  : {},
                        "loader": [
                            {
                                "loader" : "css-loader",
                                "options": {
                                    "modules"       : true,
                                    "importLoaders" : 1,
                                    "localIdentName": "[name]__[local]___[hash:base64:5]"
                                }
                            },
                            {
                                "loader" : "less-loader",
                                "options": {
                                    "strictMath": true,
                                    "noIeCompat": true
                                }
                            },
                            {
                                "loader" : "postcss-loader",
                                "options": {
                                    "plugins": [
                                        null
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        });
    });
});
