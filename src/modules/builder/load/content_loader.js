export default class Builder_Content_Loader {

    constructor(builder){
        this.builder = builder;
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

                parent_element.render_child(element);

                if( element_data?.children?.length ) {
                    render_elements(element, element_data.children)
                }
                
            })
            
        }

        render_elements(this.builder, elements_data);
        
    }
}