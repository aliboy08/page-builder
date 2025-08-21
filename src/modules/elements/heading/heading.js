import Element_Base from '../base/element_base';

export default class Element_Heading extends Element_Base {

    constructor(){
        
        super({
            id: 'heading',
            name: 'Heading',
        })

        console.log('Element_Heading init', this)
    }

    inner_html(){

        const data = this.data;

        return `${data.text}`;
    }

}