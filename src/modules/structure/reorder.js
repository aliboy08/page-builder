import { global_hooks } from 'src/global_hooks';

export default function init_structure_items_reorder(){
    global_hooks.add('element/reorder', reorder_item)
}

function reorder_item({element, drop_target, drop_position}){
    if( drop_position === 'top' || drop_position === 'right' ) {
        drop_target.structure_el.before(element.structure_el);
    }
    else if( drop_position === 'bottom' || drop_position === 'left' ) {
        drop_target.structure_el.after(element.structure_el);
    }
}