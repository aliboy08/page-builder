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

        this.elements = [];

        this.element_class_name = 'el_con';
        
        this.init_fields();
    }
    
    init_fields(){
        
        this.add_field({
            type: 'text',
            key: 'min_height',
            label: 'Min Height',
            css_property: 'minHeight',
        })

        this.add_field({
            type: 'color_picker',
            key: 'background_color',
            label: 'Background Color',
            css_property: 'backgroundColor',
        })
        
    }
    
    after_render(){

        const inner = create_div('con_inner', this.html)

        this.elements_append_to = inner;

        global_hooks.do('element/container/render', { element: this })
        
    }

    after_child_render(){
        
        this?.add_zone?.update();
        
    }

}