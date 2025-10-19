import { get_el } from 'lib/utils';
import { hooks } from 'src/globals'

let body;

export default function init_structure_items_remove(){

    body = get_el('#elements_structure .structure_body')

    hooks.add('element/before_remove', (element)=>{
        remove(element)
    })
}

function remove(element){

    if( is_top_level(element) ) {
        return element.structure_el.parentElement.remove();
    }
    
    remove_children(element)
    element.structure_el.remove();
}

function is_top_level(element){
    return element.structure_el.parentElement.parentElement === body;
}

function remove_children(parent){
    if( !parent?.children?.length ) return;
    parent.children.forEach(child=>{
        remove(child)
    })
}