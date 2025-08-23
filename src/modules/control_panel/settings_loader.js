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
        
        if( !element.settings?.fields ) return;

        this.control_panel.body.innerHTML = '';

        this.render_fields(element);
    }

    render_fields(element){

        element.settings.fields.forEach(field_args=>{
            const field = new fields[field_args.type](field_args, element);
            this.control_panel.body.append(field.html);
        })
    }
    
}