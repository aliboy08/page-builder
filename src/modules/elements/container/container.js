import Element_Base from '../base/element_base';
import { create_div } from 'lib/utils';

export default class Element_Container extends Element_Base {

    constructor(){

        super({
            id: 'container',
            name: 'Container',
        })

        this.data = {
            text: 'Container',
        }
    }

    get_html(){
        
        const html = create_div(`container`);

        html.innerHTML = this.inner_html();

        return html;
    }

    inner_html(){

        const data = this.data;

        return `${data.text}`;
    }

}