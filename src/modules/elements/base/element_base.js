import { create_div } from 'lib/utils';
import { generate_id } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';
import Hooks from 'components/hooks';
import { get_4d_value } from 'src/modules/styles/styles_utils';

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

        const get_css_value = ()=>{

            const value = this.data[field.key] ?? null;
            if( value === null ) return null;
            
            if( field.type === 'num4d' ) {
                return get_4d_value(value);
            }

            return value;
        }
        
        field.apply_css = ()=>{

            if( !field.css_property ) return;

            const css_value = get_css_value();
            if( css_value === null ) return;
            
            const css_target = field.css_target ?? this.html;
            css_target.style[field.css_property] = css_value;
        }

        field.on_change = (value)=>{
            this.data[field.key] = value;
            field.apply_css();
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