import { hooks } from 'src/globals';
import { get_el } from 'lib/utils';

let body;
let current = null;

export default function init_structure_items_select(){
    body = get_el('#elements_structure .structure_body')
    hooks.add('element/select', select)
}

function select(element){

    if( current ) current.classList.remove('selected');
    current = element.structure_el;
    current.classList.add('selected');

    setTimeout(()=>open_parent(current), 100)
}

function open_parent(item){

    if( !item ) return;
            
    const item_con = item.parentElement;

    if( !item_con ) return;

    const children_con = item_con.parentElement;
    const is_first_level = children_con === body;

    if( !is_first_level ) {
        children_con.parentElement.classList.add('toggle_children')
        open_parent(children_con.previousElementSibling);
    }
    else {
        item_con.classList.add('toggle_children')
    }

}