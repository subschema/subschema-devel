import OptionsManager from './OptionsManager';
import { basename } from 'path';

export default new OptionsManager({
    prefix: basename(process.argv[1]).split('-').shift().toUpperCase()
});
