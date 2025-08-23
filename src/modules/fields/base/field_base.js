import { create_div } from 'lib/utils';

export default class Field_Base {

    constructor(type){
        this.type = type;
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