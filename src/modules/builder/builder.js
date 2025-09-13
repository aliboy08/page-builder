import './builder.scss';
import { get_el } from 'lib/utils';
import { global_hooks, global_events } from 'src/global_hooks';
import Element_Selector from './selector/selector';
import Element_Remover from './remover/remover';
import Elements_Reorder from './element_controls/reorder/reorder';
import Element_Controls from './element_controls/element_controls';

export default class Builder {
    
    constructor(selector = '#page_content'){
        
        this.container = get_el(selector);
        this.selector = new Element_Selector();
        
        new Element_Remover(this);

        this.init_content();

        new Elements_Reorder(this);

        this.init_element_controls();

        global_events.do('builder/init', {builder: this})
    }

    init_content(){
        
        this.content = get_el('#page_content_body')
        this.content.elements = [];
        this.content.elements_append_to = this.content;
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