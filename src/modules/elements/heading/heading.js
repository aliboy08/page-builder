import Element_Base from '../base/element_base';

export default class Element_Heading extends Element_Base {

    constructor(id = null){

        super({
            type: 'heading',
            name: 'Heading',
            id,
        });
        
        this.data = {
            text: 'Heading Element',
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
            ]
        })
        
    }

    inner_html(){
        const data = this.data;
        return `${data.text}`;
    }

}