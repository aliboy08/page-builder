import './control_panel.scss';
import * as dom from 'lib/dom'
import Template_Manager from '../manager/manager';

const manager = new Template_Manager();

let render_item;

init();
function init(){
    init_button();
    render_items();
}

function init_button(){

    const container = page_builder.control_panel.misc_controls;
    
    const btn = dom.button('Save Template', container)
    const input = dom.input(container)
    dom.wrap(input)

    btn.onclick = ()=>{

        const element = get_selected();
        if( !element ) return;

        const item_data = manager.add(element, input.value)
        render_item(item_data)

        input.value = '';
    }

    input.placeholder = 'Template Name';
}

function get_selected(){
    return page_builder.builder.selector.selected
}

function render_items(){

    const container = page_builder.control_panel.misc_controls;

    const items_con = dom.div('template_items', container)

    render_item = (item)=>{

        const item_con = dom.div('item', items_con)

        dom.div('name', item_con, item.name)
        
        dom.div('load', item_con).onclick = ()=>{
            load_template(item)
        }

        dom.div('remove', item_con).onclick = ()=>{
            manager.remove(item.id)
            item_con.remove();
        }
    }
    
    manager.data.forEach(item=>{
        render_item(item, items_con)
    })
}

function load_template(template){
    console.log('load_template', template)
    const render_to = get_render_to_element();
    page_builder.builder.content_loader.render_elements(render_to, [template.data])
}

function get_render_to_element(){

    const selected = get_selected();

    if( !selected ) {
        return page_builder.builder.content;
    }
    
    if( !selected.elements ) {
        return selected.parent;
    }

    return selected;
}