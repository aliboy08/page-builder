import Add_Zone from './add_zone'
import { global_hooks } from 'src/global_hooks'

let control_panel, builder;

global_hooks.add_queue('init', init)

function init(e){

    builder = e.builder;
    control_panel = e.control_panel;
    
    init_main_add_zone();
    init_container_add_zone();
}

function init_main_add_zone(){

    const add_zone = new Add_Zone({
        append_to: builder.content,
        init_html: true,
    })

    builder.content.after(add_zone.el)
            
    add_zone.el.addEventListener('click', ()=>{
        builder.selector.unselect_previous();
    })
    
    global_hooks.add('select_element', ()=>{
        add_zone.unselect()
    })

    global_hooks.add('elements_manager/select', ({element})=>{
        if( add_zone.active ) {
            builder.selector.select(element)
        }
    })
}

function init_container_add_zone(){

    const init_children = (element)=>{
        if( !element.elements ) return;
        element.elements.forEach(init_container)
    }

    const init_container = (element)=>{

        if( element.type !== 'container' ) return;

        const add_zone = new Add_Zone({
            element,
            append_to: element.elements_append_to,
        })

        add_zone.update();
        
        init_children(element);
    }

    builder.content.elements.forEach(init_container)
    
    global_hooks.add('element/container/render', ({element})=>{
        init_container(element)
    })

    global_hooks.add('element/remove', (element)=>{
        element?.parent?.add_zone?.update();
    })

    global_hooks.add('add_zone/select', ({add_zone})=>{
        setTimeout(()=>{
            control_panel.set_tab('add_elements');
        }, 10)
    })

}