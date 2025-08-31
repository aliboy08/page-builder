import { create_div } from 'lib/utils';

export default class Field_Base {

    constructor(type){

        this.type = type;

        this.create_div = create_div;
        this.create_label = create_label;
        this.create_input = create_input;
        this.create_input_clear = create_input_clear;
    }

    get_html(){

        this.html = create_div(`field field_${this.type}`);

        if( this.inner_html ) {
            this.html.append(this.inner_html());
        }

        return this.html;
    }

    load_value(){}

    init_element_interface(){}
}

function create_label(text, container){
    const label = create_div('field_label', container, text);
    return label;
}

function create_input(key, container, type = 'text'){
    const input = document.createElement('input');
    input.type = type;
    input.name = key;
    container.append(input)
    return input
}

function create_input_clear(container, onclick){
    const el = this.create_div('clear_input', container)
    if( typeof onclick === 'function' ) {
        el.addEventListener('click', ()=>{
            onclick();
        })
    }
    return el;
}