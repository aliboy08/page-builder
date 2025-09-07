import { create_div, generate_id } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';
import { apply_css } from 'src/modules/styles/styles_utils';

import init_element_overlay from './element_overlay';

import Hooks from 'components/hooks';

export default class Element_Base {

    constructor(args = {}){

        this.type = args.type;

        this.id = args.id || generate_id();

        this.name = args.name;

        this.data = {}

        this.settings = {
            fields: [],
        };

        // this.hooks = new Hooks([
        //     'after_render'
        // ])

        this._init_fields();
    }

    _init_fields(){
        
        this.add_field({
            type: 'text',
            key: 'class',
            label: 'Class',
        });

    }

    add_field(field){
        
        field.apply_css = ()=>{

            if( !field.css_property ) return;

            const css_target = field.css_target ?? this.html;

            apply_css(css_target, field, this.data);
        }

        field.on_change_base = (value)=>{

            this.data[field.key] = value;

            field.apply_css();

            if( typeof field.on_change === 'function' ) {
                field.on_change(value)
            }
        }
        
        this.settings.fields.push(field);
    }
    
    get_html(){

        const element_class_name =  this.element_class_name ?? 'element'
        
        const html = create_div(`${element_class_name} element_${this.type}`);
        
        if( typeof this.inner_html === 'function' ) {
            html.innerHTML = this.inner_html();
        }

        this.html = html;

        html.element = this;
        
        return html;
    }
    
    render_to(parent){
        
        this.parent = parent;

        parent.elements.push(this)

        parent.elements_append_to.append(this.get_html());
        
        if( typeof parent.after_child_render === 'function' ) {
            parent.after_child_render(this);
        }

        if( typeof this.after_render === 'function' ) {
            this.after_render()
        }
        
        this.load_styles();

        global_hooks.do('element_after_render', this)
        
        return this.html;
    }

    render_after(target){
        
        target.html.after(this.get_html())
        
        const insert_index = target.parent.elements.indexOf(target);
        target.parent.elements.splice(insert_index+1, 0, this)

        if( typeof this.after_render === 'function' ) {
            this.after_render()
        }
        
        this.load_styles();

        global_hooks.do('element_after_render', this)

        return this.html;
    }

    remove(){

        const index = this.parent.elements.indexOf(this)

        this.parent.elements.splice(index, 1)

        this.html.remove();
    }

    get_data(){
        return {
            id: this.id,
            type: this.type,
            data: this.data,
        }
    }

    load_styles(){

        this.settings.fields.forEach(field=>{
            field.apply_css();
        })
    }

    move_to(target_element){
        
    }
    
}