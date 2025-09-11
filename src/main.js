import '@fontsource-variable/inter';
import './main.scss';
import Builder from './modules/builder/builder';
import Control_Panel from './modules/control_panel/control_panel';
import Elements_Manager from './modules/elements_manager/elements_manager';
import Elements_Structure from './modules/structure/structure';
import { global_hooks } from './global_hooks';

function init(){
    
    const container = document.querySelector('#page_builder');
    
    const manager = new Elements_Manager();

    const builder = new Builder('#page_content');
    builder.init_manager(manager)

    const control_panel = new Control_Panel({
        parent_container: container,
    });
    control_panel.init_manager(manager);

    const structure = new Elements_Structure({
        parent_container: container,
    })
    
    const data = localStorage.getItem('page_builder_data');
    if( data ) builder.content_loader.load(data)
    
    window.page_builder = {
        builder,
        control_panel,
    }
    
    import('./modules/templates/init')

    global_hooks.do('init')
}

document.addEventListener('DOMContentLoaded', init)