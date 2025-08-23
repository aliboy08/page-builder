import '@fontsource-variable/inter';
import './main.scss';
// import Hooks from 'components/hooks';
import Builder from './modules/builder/builder';
import Control_Panel from './modules/control_panel/control_panel';
import Elements_Manager from './modules/elements_manager/elements_manager';

function init(){
    const container = document.querySelector('#page_builder');
    
    const manager = new Elements_Manager();

    const builder = new Builder('#page_content');
    builder.init_manager(manager)

    const control_panel = new Control_Panel({
        parent_container: container,
    });
    control_panel.init_manager(manager);
    
    const data = localStorage.getItem('page_builder_data');
    if( data ) builder.content_loader.load(data)
    
}
document.addEventListener('DOMContentLoaded', init)