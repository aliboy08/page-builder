import '@fontsource-variable/inter';
import './main.scss';
import Builder from './modules/builder/builder';
import Control_Panel from './modules/control_panel/control_panel';
// import Elements_Structure from './modules/structure/structure';
import { global_hooks } from './global_hooks';

import './modules/elements/manager';

function init(){
    
    const container = document.querySelector('#page_builder');
    
    const builder = new Builder('#page_content');

    const control_panel = new Control_Panel({
        parent_container: container,
    });
    
    // new Elements_Structure({
    //     parent_container: container,
    // })

    global_hooks.do_queue('init', { control_panel, builder })
    
    import('./modules/structure/init')
    import('./modules/top_bar/top_bar')
    import('./modules/templates/init')
    import('./modules/builder/add_zone/init')
    import('./modules/save/save')
    import('./modules/load/load')
}

document.addEventListener('DOMContentLoaded', init)