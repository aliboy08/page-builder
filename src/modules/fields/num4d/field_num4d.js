import './field_num4d.scss';
import Field_Base from '../base/field_base';

export default class Field_Num4d extends Field_Base {

    constructor(field_args, element){

        super('num4d');

        this.field_args = field_args;

        this.html = this.get_html();
        
        this.init_element_interface(field_args, element)
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

        const value = data[this.key];
        if( !value ) return;

        for( const key in value ) {
            this.input[key].value = value[key];
        }

        console.log('num4d_load', value)
    }

    init_element_interface(field_args, element){

        this.key = field_args.key;
        
        if( typeof field_args.on_change === 'function' ) {
            let d;
            for( const key in this.input ) {
                this.input[key].addEventListener('change', ()=>{
                    clearTimeout(d)
                    d = setTimeout(()=>{
                        field_args.on_change(this.get_value());
                    })
                })
            }
        }

        this.load_value(element.data)
    }

    get_value(){

        return {
            top: this.input.top.value,
            right: this.input.right.value,
            bottom: this.input.bottom.value,
            left: this.input.left.value,
        }
    }
    
}