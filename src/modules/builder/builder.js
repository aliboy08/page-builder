import './builder.scss';
import { get_el } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';
import Element_Selector from './selector/selector';
import Element_Remover from './remover/remover';
import Element_Inserter from './insert/element_inserter';
import Elements_Reorder from './element_controls/reorder/reorder';
import Builder_Save from './save/save';
import Builder_Content_Loader from './load/content_loader';
import Add_Zone from './add_zone/add_zone';
import Element_Controls from './element_controls/element_controls';

export default class Builder {
    
    constructor(selector = '#page_content'){
        
        this.container = get_el(selector);
        this.selector = new Element_Selector();
        
        new Element_Remover(this);
        const save = new Builder_Save(this);
        new Element_Inserter();

        window.get_data = ()=>save.get_data()

        this.content_loader = new Builder_Content_Loader(this);

        this.init_content();
        this.init_add_zone();

        new Elements_Reorder(this);

        this.init_element_controls();
    }

    init_content(){
        
        this.content = get_el('#page_content_body')
        this.content.elements = [];
        this.content.elements_append_to = this.content;
        this.content.update_add_zone = ()=>{};
    }

    init_add_zone(){
        
        const add_zone = new Add_Zone()
        this.content.after(add_zone.el)
        this.global_add_zone = add_zone;
        
        add_zone.el.addEventListener('click', ()=>{
            this.selector.unselect_previous();
            global_hooks.do('add_zone_click')
            add_zone.active = true;
        })
        
        global_hooks.add('select_element', ()=>{
            add_zone.el.dataset.state = '';
            add_zone.active = false;
        })
    }

    init_manager(manager){
        
        const render_element = (element)=>{
            
            const selected = this.selector.selected;
            
            if( selected ) {

                if( selected.elements ) {
                    element.render_to(selected)
                } else {
                    element.render_after(selected)
                }
                
            }
            else {
                element.render_to(this.content)
            }
        }
        
        manager.hooks.add('select', (element)=>{

            render_element(element)

            if( this.global_add_zone.active ) {
                this.selector.select(element)
            }
        })

        this.manager = manager;
    }

    init_element_controls(){
        global_hooks.add('element_render', (element)=>{
            element.controls = new Element_Controls(element)
            global_hooks.do('element_controls_init', element.controls)
        }, 100)
    }
    
}