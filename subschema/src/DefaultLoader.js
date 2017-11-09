
import loaderFactory from 'subschema-loader';

//Automagically imported
import subschemaComponentAutocomplete from 'subschema-component-autocomplete';
import subschemaComponentForm from 'subschema-component-form';
import subschemaComponentList from 'subschema-component-list';
import subschemaComponentModal from 'subschema-component-modal';
import subschemaComponentWizard from 'subschema-component-wizard';
import subschemaCssBootstrap from 'subschema-css-bootstrap';
import subschemaProcessors from 'subschema-processors';
import subschemaCore from 'subschema-core';
import subschemaTransitions from 'subschema-transitions';
import subschemaValidators from 'subschema-validators';
//import subschemaComponentNavigation from 'subschema-component-navigation';
//import subschemaComponentPlayground from 'subschema-component-playground';
//import subschemaProject from 'subschema-project';
//import subschemaTestSamples from 'subschema-test-samples'

const loader = loaderFactory();
//Automagically added to importer
loader.addLoader(subschemaCore);
loader.addLoader(subschemaComponentAutocomplete);
loader.addLoader(subschemaComponentForm);
loader.addLoader(subschemaComponentList);
loader.addLoader(subschemaComponentModal);
loader.addLoader(subschemaComponentWizard);
loader.addLoader(subschemaCssBootstrap);
loader.addLoader(subschemaProcessors);
loader.addLoader(subschemaTransitions);
loader.addLoader(subschemaValidators);
//loader.addLoader(subschemaComponentNavigation);
//loader.addLoader(subschemaComponentPlayground);
//loader.addLoader(subschemaProject);
//loader.addLoader(subschemaTestSamples);

//Your Welcome.
export default loader;



// WEBPACK FOOTER //
// ../subschema/src/DefaultLoader.js
