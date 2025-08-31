import './field_num4d.scss';
import Field_Base from '../base/field_base';
// import { get_4d_value } from 'src/modules/styles/styles_utils';

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
        
    }

    init_element_interface(field_args, element){

        this.key = field_args.key;
        
        let d;

        for( const key in this.input ) {

            this.input[key].addEventListener('change', ()=>{

                clearTimeout(d)

                d = setTimeout(()=>{
                    const value = this.get_value();
                    // const css_value = get_4d_value(value);
                    field_args.on_change_base(value);
                })
            })
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