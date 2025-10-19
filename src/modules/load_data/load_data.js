import { hooks } from 'src/globals';

let builder;

hooks.add_queue('init', init)
function init(e){

    builder = e.builder;

    const data = localStorage.getItem('page_builder_data');
    load(data)
}

function load(data){

    if( !data ) return;

    data = JSON.parse(data)

    hooks.do('render/elements', {
        render_to: builder.content,
        elements_data: data,
    })
    
    hooks.do_queue('elements/loaded', { builder })
}