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
        this.init_tabs();
        this.init_resizer();
        this.init_settings();
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

    init_manager(manager){
        
        this.tabs.set_content('add_elements', manager.get_html())

        global_hooks.add('add_zone/select', ()=>{
            this.set_tab('add_elements')
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
            },
        ]);
        
        this.inner.prepend(this.tabs.container)
        
        const content_scroll = new Content_Scroll(this.tabs.tabs_nav);
        this.tabs.hooks.add('create_tab', ()=>{
            content_scroll.update();
        })

        global_hooks.do_queue('control_panel/tabs/init', this.tabs)
    }

    set_tab(key){

        clearTimeout(this.set_tab_debounce)

        this.set_tab_debounce = setTimeout(()=>{
            this.tabs.set(key)
        }, 100);
    }

    init_settings(){
        
        const fields_manager = new Fields_Manager();

        const load_element_settings = (element)=>{
            
            const container = create_div('element_settings');
            create_div('element_name', container, element.name);

            fields_manager.render_element_settings(element, container)
            
            this.tabs.set_content('element_settings', container)
            this.set_tab('element_settings')
        }
        
        global_hooks.add('element/select', (element)=>{
            load_element_settings(element);
        })

    }

    init_views(){

        this.view = new View_Switch({
            main: this.tabs.container,
            element: this.get_element_settings_html(),
        }, this.inner);
        
        global_hooks.add_queue('top_bar/init', ({left})=>{
            // dom.button('Main', left, ()=>this.view.switch('main'))
            dom.button('Add Elements', left, ()=>this.view.switch('main'))
            dom.button('Element', left, ()=>this.view.switch('element'))
        })

    }

    get_element_settings_html(){
        const container = create_div('element_settings', this.inner);
        create_div('', container, 'Element Settings');
        return container;
    }

}