export default class Builder_Content_Loader {

    constructor(builder){
        this.builder = builder;
    }

    load(elements_data){
        
        elements_data = JSON.parse(elements_data)
        
        const manager = this.builder.manager;
        
        const render_elements = (elements_data, parent)=>{

            elements_data.forEach(element_data=>{

                const constructor = manager.elements[element_data.type].init;
                const element = new constructor(element_data.id);

                element.data = element_data.data;

                const element_html = element.render(parent)
                
                render_children(element_data, element_html);
            })
            
        }

        const render_children = (element_data, parent)=>{
            if( !element_data.children?.length ) return;
            render_elements(element_data.children, parent);
        }
        
        render_elements(elements_data, this.builder.content);
        
    }
}