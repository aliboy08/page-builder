import './container.scss';
import Element_Base from '../base/element_base';
import { create_div } from 'lib/utils';
import Add_Zone from 'src/modules/builder/add_zone/add_zone';

export default class Element_Container extends Element_Base {

    constructor(id = null){

        super({
            type: 'container',
            name: 'Container',
            id,
        });

        this.elements = [];

        this.element_class_name = 'container';
        
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
            key: 'background_color',
            label: 'Background Color',
            css_property: 'backgroundColor',
        })
        
    }
    
    after_render(){

        const inner = create_div('con_inner', this.html)

        this.elements_append_to = inner;

        if( !this.no_add_zone ) {
            this.add_zone = new Add_Zone({
                append_to: inner,
            })
        }
        
    }

    after_child_render(){

        if( this.add_zone ) {
            this.add_zone.el.remove();
            this.add_zone = null;
        }

    }

}