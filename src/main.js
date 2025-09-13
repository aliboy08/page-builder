import '@fontsource-variable/inter';
import './main.scss';
import Builder from './modules/builder/builder';
import Control_Panel from './modules/control_panel/control_panel';
import Elements_Manager from './modules/elements_manager/elements_manager';
import Elements_Structure from './modules/structure/structure';
import { global_events } from './global_hooks';

function init(){
    
    const container = document.querySelector('#page_builder');
    
    const elements_manager = new Elements_Manager();

    const builder = new Builder('#page_content');
    builder.init_manager(elements_manager)

    const control_panel = new Control_Panel({
        parent_container: container,
    });
    control_panel.init_manager(elements_manager);

    const structure = new Elements_Structure({
        parent_container: container,
    })
    
    window.page_builder = {
        builder,
        control_panel,
    }

    global_events.do('init', { control_panel, builder, elements_manager })
    
    import('./modules/top_bar/top_bar')
    import('./modules/templates/init')
    import('./modules/builder/add_zone/init')
    import('./modules/save/save')
    import('./modules/load/load')
}

document.addEventListener('DOMContentLoaded', init)