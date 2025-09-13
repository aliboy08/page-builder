import { global_events } from 'src/global_hooks';

export default class Builder_Content_Loader {

    constructor(builder){

        this.builder = builder;

        global_events.on('init', ()=>{
            const data = localStorage.getItem('page_builder_data');
            this.load(data)
            global_events.do('builder/content/load')
        })
    }

    load(elements_data){
        
        elements_data = JSON.parse(elements_data)
        
        const manager = this.builder.manager;

        const load_element = (element_data)=>{
            const constructor = manager.elements[element_data.type].init;
            const element = new constructor(element_data.id);
            element.data = element_data.data;
            return element;
        }

        const render_elements = (parent_element, elements_data)=>{
            
            elements_data.forEach(element_data=>{

                const element = load_element(element_data);

                if( element_data.elements?.length ) {
                    element.no_add_zone = true;
                }

                element.render_to(parent_element)

                if( element_data?.elements?.length ) {
                    render_elements(element, element_data.elements)
                }
                
            })
            
        }
        
        this.render_elements = render_elements;

        render_elements(this.builder.content, elements_data);
        
    }
}