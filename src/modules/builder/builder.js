import './builder.scss';
import { get_el } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';
import { init_element } from '../elements/manager';
import Element_Selector from './selector/selector';
import Elements_Reorder from './element_controls/reorder/reorder';
import Element_Controls from './element_controls/element_controls';

export default class Builder {
    
    constructor(args = {}){
        
        this.container = get_el(args.container ?? '#page_content');
        this.selector = new Element_Selector();
        
        this.init_content();

        new Elements_Reorder(this);

        this.init_element_controls();

        this.init_remove_element();
        
        global_hooks.add('render/elements', ({render_to, elements_data})=>{
            this.render_elements(render_to, elements_data);
        })

        global_hooks.add('render/element', ({render_to, element_data})=>{
            this.render_element(render_to, element_data);
        })

        global_hooks.do_queue('builder/init', {builder: this})
    }

    init_remove_element(){

        global_hooks.add('remove_element', ()=>this.remove_element())

        document.addEventListener('keydown', (e)=>{
            if( e.key !== 'Delete' ) return;
            this.remove_element()
        })
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
        
        global_hooks.add('element/render', (element)=>{
            element.controls = new Element_Controls(element)
            global_hooks.do('element_controls_init', element.controls)
        }, 100)
    }

    get_data(){

        const data = [];
        
        this.content.elements.forEach(element=>{
            data.push(element.get_data())
        })

        return data;
    }

    render_elements(render_to, elements_data){
        elements_data.forEach(element_data=>{
            this.render_element(render_to, element_data);
        })
    }

    render_element(render_to, element_data){

        const element = init_element(element_data);

        element.render_to(render_to)

        if( element_data?.elements?.length ) {
            this.render_elements(element, element_data.elements)
        }
    }
    
    clear(){
        const elements_to_remove = [...this.content.elements]
        elements_to_remove.forEach(element=>{
            element.remove()
        })
    }

    remove_element(element){
        if( !element ) element = this.selector.selected;
        if( !element ) return;
        element.remove();
    }

}