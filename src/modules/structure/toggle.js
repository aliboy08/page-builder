import { hooks } from 'src/globals';
import { create_div } from 'lib/utils';

export default function init_structure_items_toggle(){
    hooks.add('structure/item/render', ({item})=>{
        if( item.element.type !== 'container' ) return;
        init_toggle(item)
    })
}

function init_toggle(item){
    const btn = create_div('toggle_btn', item)
    btn.addEventListener('click', (e)=>{
        e.stopPropagation()
        item.parentElement.classList.toggle('toggle_children')
    })
}