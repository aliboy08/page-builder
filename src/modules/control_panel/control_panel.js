import './control_panel.scss';
import * as dom from 'lib/dom';
import { create_div, get_el } from 'lib/utils';
import Resizer from 'components/resizer';
import Tabs from 'components/tabs/tabs';
import Content_Scroll from 'components/content_scroll/content_scroll';
import Fields_Manager from '../fields/fiields_manager';
import View_Switch from 'components/view_switch';
import { global_hooks } from 'src/global_hooks';

export default class Control_Panel {

    constructor(args = {}){
        
        this.parent_container = get_el(args.parent_container ?? '#page_builder');

        this.init_html();
        this.init_resizer();
        this.init_views();

        global_hooks.do_queue('control_panel/init', { control_panel: this })
    }
    
    init_html(){

        this.container = get_el('#control_panel')
        this.inner = create_div('inner scrollbar_style_1', this.container)
    }

    init_resizer(){

        const resizer = new Resizer(this.container);

        const update = (value)=>{
            this.parent_container.style.paddingLeft = value+'px';
        }

        update(this.container.offsetWidth)

        resizer.hooks.add('resize', update)
    }

    init_views(){

        this.view = new View_Switch({
            main: create_div('view_main', this.inner),
        }, this.inner);
        
        global_hooks.add_queue('top_bar/init', ({left})=>{
            // dom.button('Main', left, ()=>this.view.switch('main'))
            dom.button('Add Elements', left, ()=>this.view.switch('main'))
        })

        this.init_element_settings_view();
    }
    
    init_element_settings_view(){
        
        const container = create_div('view_element_settings', this.inner);
        this.view.register('element_settings', container)
        
        this.fields_manager = new Fields_Manager();

        const load_element_settings = (element)=>{
            container.innerHTML = '';
            create_div('element_name', container, element.name);
            container.append(this.init_element_tabs(element));
        }
        
        global_hooks.add('element/select', (element)=>{
            load_element_settings(element);
            this.view.switch('element_settings')
        })
    }

    init_element_tabs(element){

        const tabs = new Tabs([
            {
                key: 'settings',
                label: 'Settings',
            },
            {
                key: 'misc_settings',
                label: 'Misc',
            },
        ]);

        tabs.set_content( 'settings', 
            this.fields_manager.render_element_settings(element, 'fields_con', 'fields')
        )

        tabs.set_content( 'misc_settings', 
            this.fields_manager.render_element_settings(element, 'fields_con', 'common_fields')
        )
        
        const content_scroll = new Content_Scroll(tabs.tabs_nav);
        tabs.hooks.add('create_tab', ()=>content_scroll.update())

        global_hooks.do('control_panel/element/tabs', tabs)
        
        return tabs.container;
    }

}