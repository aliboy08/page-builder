import './structure.scss'
import { create_div, get_el } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';
import Resizer from 'components/resizer';

let body;

init();
function init(){
    init_html();
    init_resize();
    global_hooks.add_queue('elements/loaded', load_items)
}

function init_resize(){

    const parent_con = get_el('#page_builder');
    const container = get_el('#elements_structure');

    const resizer = new Resizer(container, {
        direction: 'left',
    });

    const update = (value)=>{
        parent_con.style.paddingRight = value+'px';
    }
    
    resizer.hooks.add('resize', update)
    update(container.offsetWidth)
}

function init_html(){
    body = create_div('structure_body', '#elements_structure')
}

function load_items({builder}){

    const render_items = (elements)=>{
        elements.forEach(element=>{
            render_item(element)
            if( element?.elements?.length ) {
                render_items(element.elements);
            }
        })
    }

    render_items(builder.content.elements);
    
    global_hooks.add('element/render', render_item)
}

function render_item(element){
    
    const parent_con = get_parent_container(element);
    const item_con = create_div('item_con', parent_con)
    const item = create_div('item', item_con, element.name)
    
    if( element.type === 'container' ) {
        item.children_con = create_div('children', item_con)
        init_toggle(item)
    }

    item.element = element;
    element.structure_el = item;

    item.addEventListener('click', ()=>{
        global_hooks.do('structure/click', element)
    })
}

function get_parent_container(element){
    if( !element.parent.structure_el ) return body;
    return element.parent.structure_el.children_con;
}

function init_toggle(item){
    const btn = create_div('toggle_btn', item)
    btn.addEventListener('click', (e)=>{
        e.stopPropagation()
        item.parentElement.classList.toggle('toggle_children')
    })
}