import './container.scss';
import Element_Base from '../base/element_base';
import { create_div } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';

export default class Element_Container extends Element_Base {

    constructor(id = null){

        super('container', id)

        this.children = [];
    }

    get_html(){
        
        const con = create_div(`con`);

        this.inner = create_div('con_inner', con)

        return con;
    }

    render_child(child_element){

        child_element.html = child_element.get_html();

        this.inner.append(child_element.html);
        this.children.push(child_element)

        child_element.parent = this;

        child_element.remove = ()=>{
            const index = this.children.indexOf(child_element);
            this.children.splice(index, 1);
            child_element.html.remove();
            child_element = null;
        }

        global_hooks.do('element_after_render', child_element)
    }
    
}