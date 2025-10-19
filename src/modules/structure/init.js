import './structure.scss'

import { create_div } from 'lib/utils';
import { hooks } from 'src/globals';
import init_structure_resize from './resize';
import init_structure_items_toggle from './toggle';
import init_structure_items_remove from './remove';
import init_structure_items_select from './select';
import init_structure_items_reorder from './reorder';

let body;

init();
function init(){
    
    body = create_div('structure_body', '#elements_structure')

    init_structure_resize();
    init_structure_items_toggle();
    init_structure_items_remove();
    init_structure_items_select();
    init_structure_items_reorder();

    hooks.add_queue('elements/loaded', ({builder})=>{
        render_items(builder.content.elements);
    })

    hooks.add('element/render', render_item)
}

function render_items(elements){
    elements.forEach(element=>{
        render_item(element)
        if( element?.elements?.length ) {
            render_items(element.elements);
        }
    })
}

function render_item(element){
    
    const parent_con = element.parent?.structure_el?.children_con ?? body;
    const item_con = create_div('item_con', parent_con)
    const item = create_div('item', item_con, element.name)
    item.element = element;
    element.structure_el = item;
    
    if( element.type === 'container' ) {
        item.children_con = create_div('children', item_con)
    }
    
    item.addEventListener('click', ()=>{
        hooks.do('structure/click', element)
    })

    hooks.do('structure/item/render', { item })
}