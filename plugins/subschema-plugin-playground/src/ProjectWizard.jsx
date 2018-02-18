import React, { Component } from 'react';
import ValueManager from 'subschema-valuemanager';
import { kebabCase } from 'subschema-utils';
import { saveAs } from 'browser-filesaver';
import { Form, loader } from 'subschema';

loader && loader.loaderType('Example');

//A simple Schema for this configuration
export const schema = {
    schema     : {
        samples    : {
            type: 'Select',

            options    : loader && loader.listExamples().map(({name:label}) => ({label,val:label})),
            placeholder: 'Custom Project'
        },
        jsName     : {
            type : "Text",
            title: 'JavaScript Variable Name',
            help : 'A javascript friendly version of your project name'
        },
        userOrOrg  : {
            type : "Text",
            title: "Username or organization",
            help : "Username or organization to publish module"
        },
        project    : {
            type     : 'Object',
            subSchema: {
                schema: {
                    name           : {
                        type: 'Text',
                        help: "NPM package name"
                    },
                    version        : {
                        type: 'Text',
                        help: "NPM package version"
                    },
                    repository     : {
                        type        : 'Text',
                        defaultValue: "https://github.com/{userOrOrg}/{project.name}"
                    },
                    "publishConfig": {
                        type     : 'Object',
                        subSchema: {
                            "registry": {
                                type        : "Text",
                                defaultValue: "https://registry.npmjs.org"
                            }

                        }
                    }
                }
            }
        },
        downloadBtn: {
            type    : "ExportButtons",
            template: false
        }
    },
    "template" : "WizardTemplate",
    "fieldsets": [{
        legend: "Choose a base sample",
        fields: "samples,userOrOrg"
    }, {
        legend: "Project",
        fields: "project"
    }, {
        legend : "Download",
        fields : "downloadBtn",
        buttons: [{
            action: "previous",
            label : "Previous"
        }]
    }]
};

export default class App extends Component {
    static defaultProps = {
        saveAs: saveAs,
        loader
    };

    constructor(props, ...rest) {
        super(props, ...rest);

        const valueManager = this.valueManager =
            props.valueManager || ValueManager({
                                        samples: 'Basic'
                                    });

        const loader = props.loader;
        valueManager.addListener('samples', function (value) {
            const sample = loader.loadExample(value) || {
                schema     : {},
                setupTxt   : '',
                props      : null,
                data       : {},
                errors     : {},
                description: ''
            };

            const { ...copy } = sample;

            this.update('sample', null);
            this.update('jsName', value);
            this.update('project.name',
                'example-' + kebabCase(copy.name || value));
            this.update('project.description', copy.description);
            this.update('project.version', '1.0.0');
            Object.keys(copy).forEach(k => this.update(`sample.${k}`, copy[k]));

        }, valueManager, true);
    }

    render() {
        return <div>
            <h3>Subschema Project Setup</h3>
            <Form schema={schema} valueManager={this.valueManager}
                  loader={this.props.loader}/>
        </div>
    }
}
