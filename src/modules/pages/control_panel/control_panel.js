import './control_panel.scss';
import { global_hooks } from 'src/global_hooks';
import * as dom from 'lib/dom';

let render_item;

global_hooks.add_queue('control_panel/tabs/init', (tabs)=>{
    init_tabs(tabs);
})

function init_tabs(tabs){

    tabs.create_tab({
        key: 'pages',
        label: 'Pages',
    });

    const container = dom.div('pages');
    init_controls(container);
    render_items(container);
    
    tabs.set_content('pages', container)
}

function init_controls(container){
    
    const btn = dom.button('Save Page', container)

    const page_name = dom.input(container)
    page_name.placeholder = 'Page Name';
    dom.wrap(page_name)

    const page_slug = dom.input(container)
    page_slug.placeholder = 'Page Slug';
    dom.wrap(page_slug)

    btn.onclick = ()=>{
        global_hooks.do('page/save', {
            name: page_name.value,
            slug: page_slug.value,
        })
    }

    global_hooks.add('page/save/success', ({ page })=>{
        page_name.value = '';
        page_slug.value = '';
        render_item(page);
    })
}

function render_items(container){

    let current;

    const items_con = dom.div('page_items', container)

    render_item = (page)=>{

        const item_con = dom.div('item', items_con)

        dom.div('name', item_con, page.name)
        
        dom.div('load', item_con).onclick = ()=>{
            set_current(item_con)
            global_hooks.do('page/load', {page})
        }

        dom.div('remove', item_con).onclick = ()=>{
            item_con.remove();
            global_hooks.do('page/remove', {id: page.id})
        }

        return item_con;
    }

    const set_current = (item)=>{
        if( current ) current.classList.remove('current')
        current = item;
        item.classList.add('current');
    }

    global_hooks.add_queue('pages_manager/load_data', ({pages, current_page})=>{

        pages.forEach(page=>{
            
            const item = render_item(page, items_con)

            if( page.slug === current_page.slug ) {
                set_current(item)
            }
        })

    })
    
}