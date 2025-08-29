import './field_num4d.scss';
import Field_Base from '../base/field_base';

export default class Field_Num4d extends Field_Base {

    constructor(field_args, element){

        super('num4d');

        this.field_args = field_args;

        this.html = this.get_html();
        
        // this.init_element_interface(field_args, element)
    }

    inner_html(){

        const { key, label } = this.field_args; 
        
        const fragment = new DocumentFragment();

        this.create_label(label, fragment);
        
        const field_con = this.create_div('inputs_con', fragment)

        this.input = {
            top: this.create_input(key+'_top', field_con),
            right: this.create_input(key+'_right', field_con),
            bottom: this.create_input(key+'_bottom', field_con),
            left: this.create_input(key+'_left', field_con),
        }
        
        return fragment;
    }

    load_value(data){

        if( !data[this.key] ) return;

        this.input.value = data[this.key];
    }

    // init_element_interface(field_args, element){

    //     this.key = field_args.key;
        
    //     if( typeof field_args.on_change === 'function' ) {
    //         this.input.addEventListener('change', ()=>{
    //             field_args.on_change(this.input.value);
    //         })
    //     }

    //     this.load_value(element.data)
    // }
    
}