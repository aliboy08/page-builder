import Element_Base from '../base/element_base';
// import Element_Settings from '../base/element_settings';

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
        
        // this.settings = {
        //     fields: [
        //         {
        //             type: 'text',
        //             key: 'text',
        //             label: 'Text',
        //             on_change: (value)=>{
        //                 this.data.text = value;
        //                 this.html.textContent = value;
        //             }
        //         }
        //     ],
        // };
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
        
    }

    inner_html(){
        const data = this.data;
        return `${data.text}`;
    }

}