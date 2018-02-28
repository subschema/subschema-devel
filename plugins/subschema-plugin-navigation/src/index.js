import _ToggleLink from './ToggleLink';
import _Routes from './Routes';
import _NavTemplate from './NavTemplate';
import _Navigate from './Navigate';
import _NotFound from './NotFound';
import _ULTemplate from './ULTemplate';
import _PropTypes from './PropTypes';
import _NavigationForm from './NavigationForm';
import _ToggleButton from './ToggleButton';

export const NavigationForm = _NavigationForm;
export const PropTypes      = _PropTypes;
export const ToggleLink     = _ToggleLink;
export const Routes         = _Routes;
export const NavTemplate    = _NavTemplate;
export const Navigate       = _Navigate;
export const NotFound       = _NotFound;
export const ULTemplate     = _ULTemplate;
export const ToggleButton   = _ToggleButton;

export const types     = {
    ToggleLink,
    Routes,
    Navigate,
    NotFound,
    ToggleButton,
};
export const templates = {
    NavTemplate,
    ULTemplate
};

export default ({ types, templates });
