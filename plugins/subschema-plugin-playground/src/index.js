import _DisplayValueAndErrors from './DisplayValueAndErrors';
import _Editor from './Editor';
import _SubschemaPlayground from './SubschemaPlayground';
import _DownloadButton from './DownloadButton';
import _ExportButtons from './ExportButtons';
import _validators from './validators';
import _SchemaEditor from './SchemaEditor';
import _ProjectWizard, {schema as _schema} from './ProjectWizard';


export const schema                = _schema;
export const validators            = _validators;
export const DisplayValueAndErrors = _DisplayValueAndErrors;
export const Editor                = _Editor;
export const SubschemaPlayground   = _SubschemaPlayground;
export const DownloadButton        = _DownloadButton;
export const ExportButtons         = _ExportButtons;
export const SchemaEditor          = _SchemaEditor;
export const ProjectWizard         = _ProjectWizard;
export const types                 = {
    DisplayValueAndErrors,
    Editor,
    DownloadButton,
    ExportButtons,
    SubschemaPlayground,
    SchemaEditor,
    ProjectWizard
};

export default ({ types, validators });
