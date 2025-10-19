import * as dom from 'src/lib/dom'
import { hooks } from 'src/globals';

let builder;

hooks.add_queue('init', init)
function init(e){
    builder = e.builder;
    hooks.add_queue('top_bar/init', init_button)
}

function init_button({right}){
    
    const btn = dom.button('Save', right, save, 'save_button');

    hooks.add('save/complete', ()=>{
        btn.textContent = 'Saved';
        btn.dataset.state = 'saved';
        setTimeout(()=>{
            btn.textContent = 'Save';
            btn.dataset.state = '';
        }, 1500)
    })
}

function save(){

    const data = get_data();

    console.log('save', data)

    localStorage.setItem('page_builder_data', JSON.stringify(data))

    hooks.do('save/complete', { data })
}

function get_data(){

    const data = [];
        
    const get_elements_data = (parent, data)=>{

        parent.elements.forEach(element=>{

            const element_data = element.get_data();
            
            data.push(element_data)

            get_children_data(element, element_data);
            
        })

    }

    const get_children_data = (parent, element_data)=>{
        
        if( !parent?.elements?.length ) return;

        element_data.elements = [];

        get_elements_data(parent, element_data.elements);
        
    }
    
    get_elements_data(builder.content, data);

    return data;
}