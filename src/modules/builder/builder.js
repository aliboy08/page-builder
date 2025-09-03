import './builder.scss';
import { create_div, get_el } from 'lib/utils';
import Element_Selector from './selector/selector';
import Element_Remover from './remover/remover';
import Element_Inserter from './insert/element_inserter';
import Elements_Reorder from './reorder/reorder';
import Builder_Save from './save/save';
import Builder_Content_Loader from './load/content_loader';
import { global_hooks } from 'src/global_hooks';

export default class Builder {
    
    constructor(selector = '#page_content'){
        
        this.container = get_el(selector);
        this.selector = new Element_Selector();
        
        new Element_Remover(this);
        new Builder_Save(this);
        new Element_Inserter();

        this.content_loader = new Builder_Content_Loader(this);

        this.init_content();
        this.init_add_zone();

        new Elements_Reorder();
    }

    init_content(){
        
        this.content = get_el('#page_content_body')

        this.children = [];

        this.render_child = (element)=>{

            this.children.push(element)
            element.render_to(this.content)
            
            global_hooks.do('parent_element_render', element)
            
            element.remove = ()=>{

                console.log('builder:child:remove', element)

                global_hooks.do('element_remove', element)

                const index = this.children.indexOf(element);
                this.children.splice(index, 1);
                element.html.remove();
                element = null;
            }
        }
        
    }

    init_add_zone(){

        const add_zone = create_div('add_zone')
        this.content.after(add_zone)
        
        add_zone.addEventListener('click', ()=>{
            this.selector.unselect_previous();
            add_zone.dataset.state = 'selected';
            global_hooks.do('add_zone_click')
        })

        global_hooks.add('select_element', ()=>{
            add_zone.dataset.state = '';
        })
    }

    init_manager(manager){
        
        const render_element = (element)=>{
            
            if( this.selector.selected ) {
                if( this.selector.selected.render_child ) {
                    this.selector.selected.render_child(element)
                }
            }
            else {
                this.render_child(element)
            }
        }
        
        manager.hooks.add('select', (element)=>{
            render_element(element)
        })

        this.manager = manager;
    }
    
}