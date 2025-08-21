import './elements_manager.scss'

import { create_div } from 'lib/utils';
import Element_Container from '../container/container';
import Element_Heading from '../heading/heading';
import Element_Text_Editor from '../text_editor/text_editor';

import Draggable from 'components/draggable';

const elements = {
    container: {
        name: 'Container',
        init: Element_Container,
    },
    heading: {
        name: 'Heading',
        init: Element_Heading,
    },
    text_editor: {
        name: 'Text Editor',
        init: Element_Text_Editor,
    },
}

export default class Elements_Manager {
    
    constructor(){}

    load(container, args = {}){
        
        container.innerHTML = '';

        const els_container = create_div('elements_manager_list', container);
        const els = this.create_els();

        els.forEach(el=>{

            els_container.append(el)

            this.init_el(el, args);
            
        })
        
    }

    create_els(){

        const els = [];

        for( const element_id in elements ) {

            const element = elements[element_id];

            const el = create_div('element')
            el.classList.add('element_'+ element_id)

            create_div('name', el, element.name)

            el.element_id = element_id;
            
            els.push(el)
        }

        return els;
    }

    init_el(el, args){

        el.addEventListener('click', ()=>{

            this.add_element(el)

            if( typeof args.on_select === 'function' ) {
                args.on_select();
            }

        })

        if( args.draggable !== false ) {
            new Draggable(el)
        }

    }

    add_element(el){

        const element = new elements[el.element_id].init();

        element.data = {
            text: 'Heading Element',
        }

        this.target.after(element.get_html())


    }

    set_target(el){
        this.target = el;
    }

}