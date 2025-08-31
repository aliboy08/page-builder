import Field_Text from './text/field_text';
import Field_Num4d from './num4d/field_num4d';
import Field_Color_Picker from './color_picker/color_picker';
import Field_Textarea from './textarea/field_textarea';

const field_types = {
    text: Field_Text,
    num4d: Field_Num4d,
    color_picker: Field_Color_Picker,
    textarea: Field_Textarea,
}

export default class Fields_Manager {

    render_element_settings(element, container){

        if( !element?.settings?.fields ) return;

        element.settings.fields.forEach(field_args=>{
            
            const field = new field_types[field_args.type](field_args, element);

            container.append(field.html);

        })
    }

}