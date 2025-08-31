import './field_textarea.scss';
import Field_Base from '../base/field_base';

export default class Field_Textarea extends Field_Base {

    constructor(field_args, element){

        super('textarea');

        this.field_args = field_args;

        this.html = this.get_html();

        this.init_element_interface(field_args, element)
    }

    inner_html(){

        const { key, label } = this.field_args;

        const fragment = new DocumentFragment();
        
        this.create_label(label, fragment);

        // this.input = this.create_input(key, fragment);
        this.input = document.createElement('textarea');
        this.input.name = key;
        fragment.append(this.input)
        
        return fragment;
    }

    load_value(data){

        if( !data[this.key] ) return;

        this.input.value = data[this.key];
    }

    init_element_interface(field_args, element){

        this.key = field_args.key;
        
        this.input.addEventListener('change', ()=>{
            field_args.on_change_base(this.input.value);
        })
        
        this.load_value(element.data)
    }
    
}