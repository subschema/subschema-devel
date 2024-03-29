import 'bootstrap/dist/css/bootstrap.css';
import Autocomplete from './Autocomplete.scss';
import AutocompleteItemTemplate from './AutocompleteItemTemplate-style';
import ListItemTemplate from './ListItemTemplate.scss';
import WizardProgressTemplate from './WizardProgressTemplate.scss';
import WizardTemplate from './WizardTemplate.scss';
import ButtonsTemplate from './ButtonsTemplate-style';
import CheckboxTemplate from './CheckboxTemplate-style';
import CheckboxesGroupTemplate from './CheckboxesGroupTemplate-style';
import EditorTemplate from './EditorTemplate-style';
import FormTemplate from './FormTemplate-style';
import RadioItemTemplate from './RadioItemTemplate-style';
import ModalTemplate from './ModalTemplate-style';
import NavTemplate from './NavTemplate-style';


export const styles = ({
    Autocomplete,
    AutocompleteItemTemplate,
    ButtonsTemplate,
    CheckboxTemplate,
    CheckboxesGroupTemplate,
    EditorTemplate,
    FormTemplate,
    NavTemplate,
    ListItemTemplate: Object.assign({
            moveUp       : 'glyphicon glyphicon-chevron-up btn-up',
            moveDown     : 'glyphicon glyphicon-chevron-down btn-down',
            delete       : 'glyphicon glyphicon-remove btn-delete',
            itemValue    : "item-value btn-edit",
            button       : 'btn btn-xs btn-default',
            listGroupItem: 'list-group-item',
            hasError     : 'has-error',
            help         : "help-block",
            clickable    : 'clickable',
            ctrlButtons  : 'btn-group'
        },
        ListItemTemplate),
    ModalTemplate,
    RadioItemTemplate,
    WizardProgressTemplate,
    WizardTemplate
});

export default ({ styles, });
