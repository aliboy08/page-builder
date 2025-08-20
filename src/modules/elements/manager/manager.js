import './manager.scss'

import Element_Container from '../container/container';
import Element_Heading from '../heading/heading';
import Element_Text_Editor from '../text_editor/text_editor';

import Draggable from 'components/draggable';

export default class Elements_Manager {
    
    constructor(){
        this.init_elements();
    }

    init_elements(){

        this.elements = [
            {
                id: 'container',
                name: 'Container',
                contructor: Element_Container,
            },
            {
                id: 'heading',
                name: 'Heading',
                contructor: Element_Heading,
            },
            {
                id: 'text_editor',
                name: 'Text Editor',
                contructor: Element_Text_Editor,
            },
        ]

    }

    load(container){

        container.innerHTML = this.get_html();
        
        container.querySelectorAll('.element').forEach(el=>{
            new Draggable(el)
        })

    }

    get_html(){

        let html = '';
        
        for( const element of this.elements ) {
            html += `<div class="element element_${element.id}">
                <div class="name">${element.name}</div>
            </div>`;
        }
    
        return '<div class="elements">'+ html + '</div>';

    }

}