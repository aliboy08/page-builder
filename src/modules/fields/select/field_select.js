// import './field_select.scss';
import Field_Base from '../base/field_base';

export default class Field_Select extends Field_Base {

    constructor(field_args, element){

        super('select');

        this.field_args = field_args;

        this.html = this.get_html();

        this.init_element_interface(field_args, element)
    }

    inner_html(){

        const { key, label } = this.field_args;

        const fragment = new DocumentFragment();
        
        this.create_label(label, fragment);

        const select = document.createElement('select');
        select.name = key;
        fragment.append(select);

        init_choices(select, this.field_args)
        
        this.input = select;
        
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

function init_choices(select, field_args){
    
    if( typeof field_args.choices !== 'object' ) return;

    const choices = [];

    const create_option = (value, text)=>{
        const option = document.createElement('option')
        option.value = value;
        option.textContent = text;
        select.append(option)
    }

    if( field_args.default ) {
        create_option('', 'Default')
    }

    if( Array.isArray(field_args.choices) ) {
        field_args.choices.forEach(choice=>{
            choices.push({
                text: choice,
                value: choice,
            })
        })
    }
    else {
        for( const value in field_args.choices ) {
            choices.push({
                text: field_args.choices[value],
                value,
            })
        }
    }
    
    choices.forEach(choice=>{
        create_option(choice.value, choice.text)
    })
    
}