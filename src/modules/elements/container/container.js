import './container.scss';
import Element_Base from '../base/element_base';
import { create_div } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';

export default class Element_Container extends Element_Base {

    constructor(id = null){

        super({
            type: 'container',
            name: 'Container',
            id,
        });

        this.children = [];
        
        this.init_fields();
    }
    
    init_fields(){

        this.add_field({
            type: 'num4d',
            key: 'padding',
            label: 'Padding',
            css_property: 'padding',
        })

        this.add_field({
            type: 'num4d',
            key: 'margin',
            label: 'Margin',
            css_property: 'margin',
        })

        this.add_field({
            type: 'text',
            key: 'min_height',
            label: 'Min Height',
            css_property: 'minHeight',
        })

        this.add_field({
            type: 'color_picker',
            key: 'background',
            label: 'Background',
            css_property: 'background',
        })
        
    }

    get_html(){
        
        const con = create_div(`con`);

        this.inner = create_div('con_inner', con)
        
        if( !this.no_add_zone ) {
            this.add_zone = create_div('add_zone', this.inner)
        }
        
        return con;
    }

    render_child(child_element){

        if( this.add_zone ) {
            this.add_zone.remove();
        }

        child_element.html = child_element.get_html();

        this.inner.append(child_element.html);
        this.children.push(child_element)

        child_element.parent = this;

        child_element.remove = ()=>{

            global_hooks.do('element_remove', child_element)

            const index = this.children.indexOf(child_element);
            this.children.splice(index, 1);
            child_element.html.remove();
            child_element = null;
        }

        global_hooks.do('element_after_render', child_element)
    }
    
}