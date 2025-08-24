import Element_Base from '../base/element_base';

export default class Element_Text_Editor extends Element_Base {

    constructor(id = null){

        super({
            type: 'text_editor',
            name: 'Text Editor',
            id,
        });
        
        this.data = {
            text: 'Text Editor',
        }
    }

    inner_html(){

        const data = this.data;

        return `${data.text}`;
    }


}