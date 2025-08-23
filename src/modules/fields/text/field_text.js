import './field_text.scss';
import Field_Base from '../base/field_base';

export default class Field_Text extends Field_Base {

    constructor(field_args, element){

        super('text');

        this.html = this.get_html();
        this.init_element_interface(field_args, element)
    }

    inner_html(){
        
        const fragment = new DocumentFragment();

        const input = document.createElement('input')
        input.type = 'text';
        fragment.append(input)

        this.input = input;
        
        return fragment;
    }

    load_value(data){
        if( !data[this.key] ) return;
        this.input.value = data[this.key];
    }

    init_element_interface(field_args, element){

        this.key = field_args.key;
        
        if( typeof field_args.on_change === 'function' ) {
            this.input.addEventListener('change', ()=>{
                field_args.on_change(this.input.value);
            })
        }

        this.load_value(element.data)
    }
    
}