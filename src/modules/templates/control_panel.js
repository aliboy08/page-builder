import * as dom from 'lib/dom'
import { global_hooks } from 'src/global_hooks';

let render_item;

init();
function init(){
    global_hooks.add_queue('control_panel/tabs/init', (tabs)=>{
        init_tabs(tabs);
    })
}

function init_tabs(tabs){

    tabs.create_tab({
        key: 'templates',
        label: 'Templates',
    });

    const container = dom.div('templates');
    init_controls(container);
    render_items(container);
    
    tabs.set_content('templates', container)
}

function init_controls(container){
    
    const con = dom.div('', container)
        
    const btn = dom.button('Save Template', dom.div('mb-5', con))

    const input = dom.input(dom.div('mb-5', con))
    input.placeholder = 'Template Name';

    btn.onclick = ()=>{
        global_hooks.do('template/save', { name: input.value })
    }

    global_hooks.add('template/save/success', ({ template })=>{
        input.value = '';
        render_item(template);
    })
}

function render_items(container){

    const items_con = dom.div('items_listing template_items', container)

    render_item = (template)=>{

        const item_con = dom.div('item_con', items_con)

        const item = dom.div('item', item_con)

        dom.div('name', item, template.name)
        
        dom.div('load_btn', item_con).onclick = ()=>{
            global_hooks.do('template/load', {template})
        }

        dom.div('remove_btn', item_con).onclick = ()=>{
            item_con.remove();
            global_hooks.do('template/remove', {id: template.id})
        }
    }

    global_hooks.add_queue('templates_manager/load_data', ({templates})=>{
        templates.forEach(template=>{
            render_item(template, items_con)
        })
    })
    
}