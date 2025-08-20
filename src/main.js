import '@fontsource-variable/inter';

import './main.scss';
import Builder from './modules/builder/builder';
import Control_Panel from './modules/control_panel/control_panel';

init();
function init(){

    new Builder('.page_builder_content');
    new Control_Panel('.control_panel');
    
}