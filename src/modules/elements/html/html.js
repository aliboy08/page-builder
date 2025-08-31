import Element_Base from '../base/element_base';

export default class Element_HTML extends Element_Base {

    constructor(id = null){

        super({
            type: 'html',
            name: 'HTML',
            id,
        });
        
        this.data = {
            html_markup: 'HTML Content',
        }

        this.init_fields();
    }

    init_fields(){
    
        this.add_field({
            type: 'textarea',
            key: 'html_markup',
            label: 'HTML Markup',
            on_change: (value)=>{
                this.html.innerHTML = value;
            }
        })
        
    }

    inner_html(){
        const data = this.data;
        return `${data.html_markup}`;
    }

}