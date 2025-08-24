import './control_panel.scss';
import { create_div } from 'lib/utils';
import Resizer from 'components/resizer';
import Control_Panel_Settings_Loader from './settings_loader';
import Tabs from 'components/tabs/tabs';
import { global_hooks } from 'src/global_hooks';

export default class Control_Panel {

    constructor(args = {}){
        
        this.parent_container = args.parent_container;
        this.init_html();
        this.init_tabs();
        this.init_resizer();
        this.init_selector();
        
        this.settings_loader = new Control_Panel_Settings_Loader(this);
    }
    
    init_html(){

        this.container = create_div('#builder_control_panel')
        this.container.className = 'control_panel';
        this.parent_container.prepend(this.container)

        this.inner = create_div('inner', this.container)
        // this.body = create_div('body', this.inner)
    }

    init_resizer(){

        const resizer = new Resizer(this.container);

        const update = (value)=>{
            this.parent_container.style.paddingLeft = value+'px';
        }

        update(this.container.offsetWidth)

        resizer.hooks.add('resize', update)
    }

    init_manager(manager){

        // manager.render_to(this.body)
        this.tabs.set_content('add_elements', manager.get_html())

        global_hooks.add('add_zone_click', ()=>{
            this.tabs.set('add_elements')
        })

    }

    init_tabs(){
            
        this.tabs = new Tabs([
            {
                key: 'add_elements',
                label: 'Add Elements',
            },
            {
                key: 'element_settings',
                label: 'Element Settings',
            }
        ]);

        this.inner.prepend(this.tabs.container)
    }

    init_selector(){

        // global_hooks.add('select_element', (element)=>{

        //     if( element.type === 'container' ) {
        //         this.tabs.set('add_elements')
        //     }
            
        // })
    }

}