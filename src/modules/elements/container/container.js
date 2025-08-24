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
        
        const inner = create_div('con_inner', con)
        
        // con.render_target = inner;
        // inner.el_children = this.el_children;
        // inner.element = this;

        this.inner = inner;

        return con;
    }

    render_child(child_element){

        child_element.html = child_element.get_html();

        this.inner.append(child_element.html);
        this.children.push(child_element)

        global_hooks.do('element_after_render', child_element)
    }

}