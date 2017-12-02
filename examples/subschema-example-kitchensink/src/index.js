module.exports = {
    description: "All the components with no options passed, just a place to make sure everything is here.   This may not be a good idea.",
    schema: {
        schema: {},
        fieldsets:[]
    },
    imports: {
        'subschema': ['loader']
    },
    props: ["loader"],
    setupTxt   : require('!!raw-loader!./setup.js')
};
