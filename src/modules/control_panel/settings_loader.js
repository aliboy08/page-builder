import { global_hooks } from 'src/global_hooks';

import Field_Text from '../fields/text/field_text';

const fields = {
    text: Field_Text,
}

export default class Control_Panel_Settings_Loader {

    constructor(control_panel){

        this.control_panel = control_panel;

        global_hooks.add('select_element', (element)=>{
            this.load(element);
        })
    }

    load(element){
        
        if( !element.settings?.fields ) {
            this.control_panel.tabs.set_content('element_settings', '');
            return;
        }
        
        const html = this.get_fields_html(element);

        this.control_panel.tabs.set_content('element_settings', html)
        this.control_panel.tabs.set('element_settings')

    }
    
    get_fields_html(element){

        const fragment = new DocumentFragment();

        element.settings.fields.forEach(field_args=>{
            const field = new fields[field_args.type](field_args, element);
            fragment.append(field.html);
        })

        return fragment;
    }

}