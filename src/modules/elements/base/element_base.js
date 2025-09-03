import { create_div, generate_id } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';
import { apply_css } from 'src/modules/styles/styles_utils';

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

        this.hooks = new Hooks([
            'after_render'
        ])

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
        
        const html = create_div(`element element_${this.type}`);

        html.innerHTML = this.inner_html();
        
        html.element = this;
        
        return html;
    }

    inner_html(){
        return '';
    }

    render_to(parent){

        const html = this.get_html();

        parent.append(html);

        this.html = html;
        
        global_hooks.do('element_after_render', this)
        
        // this.hooks.do('after_render');
        
        this.load_styles();
        
        return html;
    }

    remove(){

        console.log('element:base:remove', this)

        const index = this.el_parent.el_children.indexOf(this)
        this.el_parent.el_children.splice(index, 1)
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

}