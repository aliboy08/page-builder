import { global_hooks } from 'src/global_hooks';

let builder;

global_hooks.add_queue('init', init)
function init(e){

    builder = e.builder;

    const data = localStorage.getItem('page_builder_data');
    load(data)
}

function load(data){

    if( !data ) return;

    data = JSON.parse(data)

    global_hooks.do('render/elements', {
        render_to: builder.content,
        elements_data: data,
    })
    
    global_hooks.do_queue('elements/loaded', { builder })
}