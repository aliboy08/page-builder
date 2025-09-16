import { create_div } from 'lib/utils'
import { global_hooks } from 'src/global_hooks'

import Element_Container from './container/container'
import Element_Heading from './heading/heading'
import Element_Text_Editor from './text_editor/text_editor'
import Element_HTML from './html/html'

const types = {
    container: {
        name: 'Container',
        init: Element_Container,
    },
    heading: {
        name: 'Heading',
        init: Element_Heading,
    },
    text_editor: {
        name: 'Text Editor',
        init: Element_Text_Editor,
    },
    html: {
        name: 'HTML',
        init: Element_HTML,
    },
}

let builder, control_panel;

global_hooks.add_queue('control_panel/init', (e)=>{
    control_panel = e.control_panel;
    control_panel.view.views.main.append(get_elements_list_html())
})

global_hooks.add_queue('builder/init', (e)=>{
    builder = e.builder;
})

function get_elements_list_html(){

    const html = create_div('elements');

    for( const type in types ) {

        const el = create_div('element element_'+type, html)
        create_div('name', el, types[type].name)
        
        el.addEventListener('click', ()=>{
            const element = new types[type].init();
            render_element(element)
            global_hooks.do('elements_manager/select', { element })
        })
        
    }
    
    return html;
}

function render_element(element){

    const selected = builder.selector.selected;
            
    if( selected ) {

        if( selected.elements ) {
            element.render_to(selected)
        } else {
            element.render_after(selected)
        }
        
    }
    else {
        element.render_to(builder.content)
    }

}

export function init_element(element_data){

    const element = new types[element_data.type].init(element_data.id);
    element.data = element_data.data;

    return element;
}