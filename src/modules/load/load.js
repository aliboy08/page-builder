import { global_events } from 'src/global_hooks';
import { init_element } from '../elements/manager';

let builder;

global_events.on('init', init)
function init(e){

    builder = e.builder;

    const data = localStorage.getItem('page_builder_data');
    
    load(data)
}

function load(data){

    if( !data ) return;

    data = JSON.parse(data)

    render_elements(builder.content, data);

    global_events.do('elements/loaded', { builder })
}

function render_elements(parent_element, elements_data){

    elements_data.forEach(element_data=>{

        const element = init_element(element_data);

        if( element_data.elements?.length ) {
            element.no_add_zone = true;
        }

        element.render_to(parent_element)

        if( element_data?.elements?.length ) {
            render_elements(element, element_data.elements)
        }
        
    })
}