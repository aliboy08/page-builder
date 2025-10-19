import './control_panel.scss';
import Control_Panel from './control_panel';
import { hooks } from 'src/globals';

const control_panel = new Control_Panel();
hooks.do('control_panel/init', {control_panel})