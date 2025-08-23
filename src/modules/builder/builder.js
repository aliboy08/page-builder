import './builder.scss';
import { is_intersecting, create_div, get_el } from 'lib/utils';
// import Draggable from 'components/draggable';
// import Popup from 'components/popup/popup';
// import Hooks from 'components/hooks';
// import Page_Element_Adder from './page_element_adder/page_element_adder';
import Element_Selector from './selector/selector';
import Element_Remover from './remover/remover';
import Builder_Save from './save/save';

export default class Builder {
    
    constructor(selector = '#page_content'){
        
        this.container = get_el(selector);
        this.selector = new Element_Selector();

        new Element_Remover(this.selector);
        new Builder_Save(this);

        this.init_content();
    }

    init_content(){
        
        const content = get_el('#page_content_body')
        this.content = content;
        content.el_children = [];

        this.selector.selected = content;

        const add_zone = create_div('add_zone')
        content.after(add_zone)
        
        this.selector.init(add_zone, {
            target: content,
        });
        
    }

    init_manager(manager){
        
        const render_element = (element)=>{
            const location = this.selector.selected;
            if( !location?.el_children ) return;
            element.render(location)
        }
        
        manager.hooks.add('select', (element)=>{
            render_element(element)
        })

        this.manager = manager;
    }

    get_data(){

        const data = [];
        
        console.log(this.content.el_children)

        const get_elements_data = (parent, data)=>{

            parent.el_children.forEach(element=>{

                const element_data = element.get_data();

                get_children_data(element, element_data);

                data.push(element_data)

            })

        }

        const get_children_data = (element, element_data)=>{
            
            if( !element?.el_children?.length ) return;
            
            element_data.children = [];
            
            get_elements_data(element, element_data.children);
            
        }

        get_elements_data(this.content, data);

        return data;
    }

    load(elements_data){
        
        elements_data = JSON.parse(elements_data)
        
        const render_elements = (elements_data, parent)=>{

            elements_data.forEach(element_data=>{

                const constructor = this.manager.elements[element_data.type].init;
                const element = new constructor(element_data.id);
                const element_html = element.render(parent)
                
                render_children(element_data, element_html);
            })
            
        }

        const render_children = (element_data, parent)=>{
            if( !element_data.children?.length ) return;
            render_elements(element_data.children, parent);
        }
        
        render_elements(elements_data, this.content);

        console.log(this.content.el_children)
        
    }
    
}