import {StyleSheet} from 'react-native';
import ButtonsTemplate from '././styles/ButtonsTemplate'
import CollectionCreateTemplate from '././styles/CollectionCreateTemplate'
import ContentItemTemplate from '././styles/ContentItemTemplate'
import EditorTemplate from '././styles/EditorTemplate'
import FieldSetTemplate from '././styles/FieldSetTemplate'
import FormTemplate from '././styles/FormTemplate'
import Global from '././styles/Global'
import List from '././styles/List'
import ListItemTemplate from '././styles/ListItemTemplate'
import ModalTemplate from '././styles/ModalTemplate'
import SlideButtonTemplate from '././styles/SlideButtonTemplate'
import Text from '././styles/Text'
import WizardTemplate from '././styles/WizardTemplate'

const Styles = {
    ButtonsTemplate,
    CollectionCreateTemplate,
    ContentItemTemplate,
    EditorTemplate,
    FieldSetTemplate,
    FormTemplate,
    Global,
    List,
    ListItemTemplate,
    ModalTemplate,
    SlideButtonTemplate,
    Text,
    Password:Text,
    WizardTemplate
};

function compile(styles) {

    const compiledStyles = {};
    Object.keys(styles).forEach(function (key) {
        const current = styles[key];
        const currentString = {};

        const compiled = Object.keys(current).filter(function (skey) {
            if (typeof current[skey] == 'string') {
                currentString[skey] = current[skey];
                return false;
            }
            return true;
        }).reduce(function (style, skey) {
            style[skey] = current[skey];
            return style;
        }, {});

        compiledStyles[key] = StyleSheet.create(compiled);
        Object.assign(compiledStyles[key], currentString);
    });
    return compiledStyles;
}

export default compile(Styles);