import './control_panel.scss';
import * as dom from 'lib/dom'
import { global_hooks, global_events } from 'src/global_hooks';

let render_item;

init();
function init(){
    global_events.on('control_panel/tabs/init', (tabs)=>{
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
    
    const btn = dom.button('Save Template', container)

    const input = dom.input(container)
    input.placeholder = 'Template Name';
    dom.wrap(input) 

    btn.onclick = ()=>{
        global_hooks.do('template/save', { name: input.value })
    }

    global_hooks.add('template/save/success', ({ template })=>{
        input.value = '';
        render_item(template);
    })
}

function render_items(container){

    const items_con = dom.div('template_items', container)

    render_item = (template)=>{

        const item_con = dom.div('item', items_con)

        dom.div('name', item_con, template.name)
        
        dom.div('load', item_con).onclick = ()=>{
            global_hooks.do('load_template', {template})
        }

        dom.div('remove', item_con).onclick = ()=>{
            item_con.remove();
            global_hooks.do('template/remove', {id: template.id})
        }
    }

    global_events.on('template/load_data', ({templates})=>{
        templates.forEach(template=>{
            render_item(template, items_con)
        })
    })
    
}