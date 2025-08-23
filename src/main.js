import '@fontsource-variable/inter';
import './main.scss';
// import Hooks from 'components/hooks';
import Builder from './modules/builder/builder';
import Control_Panel from './modules/control_panel/control_panel';
import Elements_Manager from './modules/elements_manager/elements_manager';
import Hooks from 'components/hooks';

function init(){

    window.builder_hooks = new Hooks([]);

    const container = document.querySelector('#page_builder');
    
    const manager = new Elements_Manager();

    const builder = new Builder('#page_content');
    builder.init_manager(manager)

    const control_panel = new Control_Panel({
        parent_container: container,
    });
    control_panel.init_manager(manager);
    
    const data = '[{"id":"xio7f7jz8l","type":"container","data":{},"children":[{"id":"ch7eiddkpv","type":"heading","data":{"text":"Heading Element"}},{"id":"sqb9qq50c4","type":"container","data":{},"children":[{"id":"36teay8rz4","type":"heading","data":{"text":"Heading Element"}},{"id":"rxvft1saf0","type":"heading","data":{"text":"Heading Element"}}]}]},{"id":"e8vf8x05cp","type":"container","data":{},"children":[{"id":"nyaf11ctbx","type":"container","data":{},"children":[{"id":"f3uyogki64","type":"heading","data":{"text":"Heading Element"}},{"id":"6mojvf9urt","type":"heading","data":{"text":"Heading Element"}},{"id":"clq3mu2p2k","type":"container","data":{},"children":[{"id":"w88nymmdfd","type":"heading","data":{"text":"Heading Element"}}]}]}]}]';

    builder.load(data);
    
}
document.addEventListener('DOMContentLoaded', init)