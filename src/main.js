import '@fontsource-variable/inter';
import './main.scss';
import Builder from './modules/builder/builder';
import Control_Panel from './modules/control_panel/control_panel';
import { global_hooks } from './global_hooks';

import './modules/elements/manager';

function init(){
    
    const builder = new Builder();
    const control_panel = new Control_Panel();

    global_hooks.do_queue('init', { control_panel, builder })
    
    import('./modules/builder/add_zone/init')
    import('./modules/structure/init')
    import('./modules/top_bar/top_bar')
    import('./modules/templates/init')
    import('./modules/pages/init')
    import('./modules/save/save')
    import('./modules/load/load')
}

document.addEventListener('DOMContentLoaded', init)