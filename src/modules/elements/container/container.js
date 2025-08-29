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

        this.settings = {
            fields: [
                {
                    type: 'num4d',
                    key: 'margin',
                    label: 'Margin',
                    on_change: (value)=>{
                        // this.data.text = value;
                        // this.html.textContent = value;
                    }
                }
            ],
        };
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