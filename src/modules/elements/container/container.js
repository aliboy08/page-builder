import './container.scss';
import Element_Base from '../base/element_base';
import { create_div } from 'lib/utils';

export default class Element_Container extends Element_Base {

    constructor(id = null){

        super('container', id)

        this.el_children = [];

    }

    get_html(){
        
        const html = create_div(`container`);

        html.el_children = this.el_children;

        return html;
    }

}