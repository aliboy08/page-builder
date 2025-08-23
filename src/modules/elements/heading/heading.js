import Element_Base from '../base/element_base';

export default class Element_Heading extends Element_Base {

    constructor(id = null){

        super('heading', id)

        this.data = {
            text: 'Heading Element',
        }
    }

    inner_html(){

        const data = this.data;

        return `${data.text}`;
    }

}