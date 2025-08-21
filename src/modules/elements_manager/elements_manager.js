import './elements_manager.scss'

import { create_div } from 'lib/utils';
import Element_Container from '../elements/container/container';
import Element_Heading from '../elements/heading/heading';
import Element_Text_Editor from '../elements/text_editor/text_editor';

import Draggable from 'components/draggable';
import Hooks from 'components/hooks';


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

    constructor(args = {}){
        
        this.hooks = new Hooks([
            'select',
        ])

        this.args = args;
        this.is_draggable = args.draggable ?? true;
    }
    
    render_to(container, args = {}){

        if( args.clear ) {
            container.innerHTML = '';
        }

        const els_container = create_div('elements_manager_list', container);
        
        this.is_draggable = args.draggable ?? this.is_draggable;

        this.create_els().forEach(el=>{
            els_container.append(el)
            this.init_el(el);
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

    init_el(el){

        
        el.addEventListener('click', ()=>{
            
            const element = new elements[el.element_id].init();

            this.hooks.do('select', element)
            // this.add_element(el)

            // if( typeof args.on_select === 'function' ) {
            //     args.on_select();
            // }

        })

        if( this.is_draggable ) {
            new Draggable(el)
        }

    }

    // add_element(el){

    //     const element = new elements[el.element_id].init();

    //     element.data = {
    //         text: 'Heading Element',
    //     }

    //     this.target.after(element.get_html())

    // }

}