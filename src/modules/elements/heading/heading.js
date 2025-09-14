import Element_Base from '../base/element_base';
import { el_change_type } from 'lib/utils';

export default class Element_Heading extends Element_Base {

    constructor(id = null){

        super({
            type: 'heading',
            name: 'Heading',
            id,
        });
        
        this.data = {
            text: 'Heading Element',
            markup: 'h2',
        }

        this.init_fields();
    }

    init_fields(){
    
        this.add_field({
            type: 'text',
            key: 'text',
            label: 'Text',
            on_change: (value)=>{
                this.html.textContent = value;
            }
        })

        this.add_field({
            type: 'color_picker',
            key: 'text_color',
            label: 'Text Color',
            css_property: 'color',
        })

        this.add_field({
            type: 'select',
            key: 'markup',
            label: 'Markup',
            default: true,
            choices: [
                'span', 'p', 'div',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
            ],
            on_change: (value)=>{
                this.heading = el_change_type(this.heading, value)
            }
        })
        
    }
    
    inner_html(){

        const markup = this.data.markup;

        const heading = document.createElement(markup)
        heading.className = 'heading';
        heading.textContent = this.data.text;

        this.heading = heading;

        return heading;
    }

}