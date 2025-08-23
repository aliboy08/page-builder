import Field_Text from './text/field_text';

export default class Fields_Manager {
    
    constructor(){

        this.fields = {
            text: Field_Text,
        };

    }

    get_field_html(field_data, element_data){

        console.log('get_field_html', field_data, element_data)
        const field = new this.fields[field_data.type]();

        return field.render();
    }

}