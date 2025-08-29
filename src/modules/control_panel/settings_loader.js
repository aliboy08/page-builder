import { global_hooks } from 'src/global_hooks';
import { create_div } from 'lib/utils';

import Field_Text from '../fields/text/field_text';
import Field_Num4d from '../fields/num4d/field_num4d';

const fields = {
    text: Field_Text,
    num4d: Field_Num4d,
}

export default class Control_Panel_Settings_Loader {

    constructor(control_panel){

        this.control_panel = control_panel;

        global_hooks.add('select_element', (element)=>{
            this.load(element);
        })
    }

    load(element){
        
        // if( !element.settings?.fields ) {
        //     this.control_panel.tabs.set_content('element_settings', '');
        //     return;
        // }
        
        const html = this.get_fields_html(element);

        this.control_panel.tabs.set_content('element_settings', html)
        this.control_panel.tabs.set('element_settings')

    }
    
    get_fields_html(element){

        console.log('get_fields_html', element)

        const container = create_div('element_settings');

        create_div('element_name', container, element.name + ' Settings')
        
        if( element?.settings?.fields ) {
            element.settings.fields.forEach(field_args=>{
                const field = new fields[field_args.type](field_args, element);
                container.append(field.html);
            })
        }
        
        return container;
    }

}