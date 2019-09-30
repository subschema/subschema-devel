const lerna                   = require('lerna');
const path                    = require('path');
const style                   = require('mrbuilder-plugin-react-styleguidist');
const {lernaFilteredPackages} = require('mrbuilder-utils');
const code                    = (v, type = 'js static') => {
    return `
${"```"}${type}
${v}
${"```"}
`
};

module.exports = async function (options, webpack, om) {
    const filteredPackages = await lernaFilteredPackages();
    const sections         = {
        subschema: [],
        plugins  : [],
        presets  : [],
        core     : [],
        resolvers: [],
        examples : [],
        misc     : []
    };
    const components       = [
        {
            name    : "Overview",
            content : "../subschema/Readme.md",
            sections: [{
                name      : "Schema",
                content   : "../subschema/docs/Schema.md",
                components: []
            }, {
                content   : "../subschema/docs/How-it-works.md",
                components: []
            }, {
                name      : "ValueManager",
                content   : "../subschema/docs/ValueManager.md",
                components: []
            }, {
                name      : "FAQ",
                content   : "../subschema/docs/FAQ.md",
                components: []
            }, {
                name      : "Third Party Components",
                content   : "../subschema/docs/Third-Party-Components.md",
                components: []
            }, {
                name      : "Loaders",
                content   : "../subschema/docs/Loaders.md",
                components: []
            }, {
                name      : "Styling",
                content   : "../subschema/docs/Styling.md",
                components: []

            }]
        },

        {
            name      : 'Core',
            content   : '../subschema/docs/Core.md',
            components: sections.core
        }, {
            name      : 'Plugins',
            content   : '../subschema/docs/Plugins.md',
            components: sections.plugins
        }, {
            name      : 'Examples',
            content   : '../subschema/docs/Examples.md',
            components: sections.examples
        }, {
            name      : 'Presets',
            content   : '../subschema/docs/Presets.md',
            components: sections.presets,

        }, {
            name      : 'Resolvers',
            content   : '../subschema/docs/Resolvers.md',
            components: sections.resolvers
        }
    ];

    console.log(filteredPackages);
    for (const pkg of filteredPackages) {
        pkg._package = require(`${pkg.location}/package.json`);
        const base   = pkg.location.replace(/.*\/subschema-devel\//, '');
        let sec      = base.split(path.sep)[0];
        const conf   = {};
        let desc     = [pkg.name, conf];
        switch (sec) {
            case 'subschema':
            case 'docs':
                break;
            case 'examples':
                conf.description = `
pkg._package.description || pkg.description || ''}
<InlinePlayground name='${pkg.name}'/>
`;
                conf.components  = [];
                sections.examples.push(desc);
                break;
            case 'presets':
                conf.description = `Configuration

\`\`\`json
${JSON.stringify(pkg._package.subschema, null, 2)}
\`\`\`
`;
                conf.components  = [];
                sections.presets.push(desc);
                break;
            case 'core':
            case 'resolvers':
            case 'plugins':

            default :
                (sections[sec] || sections.misc).push(desc);
        }
    }

    return (style({
        context             : {
            'Form'               : require.resolve('./Form.js'),
            'loader'             : require.resolve('./loader.js'),
            'SubschemaPlayground': require.resolve('./SubschemaPlayground'),
            'InlinePlayground'   : require.resolve('./InlinePlayground')
        },
        styleguideComponents: {
            'Markdown/Markdown': require.resolve('./Markdown')
        },
        sections            : components,
        showUsage           : true,
        title               : 'Subschema'
    }, webpack, om));
}
;
