import './color_picker.scss';
import Field_Base from '../base/field_base';

export default class Field_Color_Picker extends Field_Base {

    constructor(field_args, element){

        super('color_picker');

        this.field_args = field_args;

        this.html = this.get_html();

        this.load_value(element.data)
    }

    inner_html(){

        const { key, label } = this.field_args;

        const fragment = new DocumentFragment();
        
        this.create_label(label, fragment);

        const input_con = this.create_div('input_con', fragment)

        const color_input = this.create_input(key + '_color_picker', input_con, 'color');
        const input = this.create_input(key, input_con);
        
        this.set = (value)=>{

            color_input.value = value;
            input.value = value;

            this.field_args.on_change_base(value);
        }
        
        color_input.addEventListener('change', ()=>this.set(color_input.value))
        input.addEventListener('change', ()=>this.set(input.value))

        this.create_input_clear(input_con, ()=>this.set(''))
        
        return fragment;
    }

    load_value(data){

        if( !data[this.key] ) return;
        
        this.color_input.value = data[this.key];
        this.input.value = data[this.key];
    }
    
}