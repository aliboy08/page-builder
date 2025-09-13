import { global_events } from 'src/global_hooks';

let builder, elements_manager

global_events.on('init', init)
function init(e){

    builder = e.builder;
    elements_manager = e.elements_manager;

    const data = localStorage.getItem('page_builder_data');
    
    load(data)
}

function load(data){

    if( !data ) return;

    data = JSON.parse(data)

    render_elements(builder.content, data);
}

function render_elements(parent_element, elements_data){

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

function load_element(element_data){

    const constructor = elements_manager.elements[element_data.type].init;
    const element = new constructor(element_data.id);
    element.data = element_data.data;

    return element;
}