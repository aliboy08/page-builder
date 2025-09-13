import { global_hooks, global_events } from 'src/global_hooks';
import Template_Manager from './manager';

const page_builder = window.page_builder;

init();
function init(){

    const manager = new Template_Manager();

    global_hooks.add('save_template', ({name})=>{
        
        const element = get_selected();
        if( !element ) return;
        
        const template = manager.add(element, name)
        global_hooks.do('save_template_success', {template})
    })
    
    global_hooks.add('load_template', ({template})=>{
        render_template(template);
    })

    global_hooks.add('template_remove', (template_id)=>{
        console.log('hook:template_remove:', template_id)
        manager.remove(template_id)
    })

    global_events.do('load_template_items', { templates: manager.data })
}

function get_selected(){
    return page_builder.builder.selector.selected
}

function render_template(template){
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