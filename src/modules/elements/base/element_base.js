import { create_div, generate_id } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';
import { apply_css } from 'src/modules/styles/styles_utils';
import Hooks from 'components/hooks';
import { init_common_fields } from './common_fields';

export default class Element_Base {

    constructor(args = {}){

        this.type = args.type;

        this.id = args.id || generate_id();

        this.name = args.name;

        this.data = {}

        this.settings = {
            fields: [],
            common_fields: [],
        };

        this.hooks = new Hooks([
            'on_render'
        ])

        init_common_fields(this)

        this.hooks.add('on_render', ()=>this.on_render())
    }
    
    add_field(field, group = 'fields'){
        
        field.apply_css = ()=>{

            if( !field.css_property ) return;

            const css_target = field.css_target ?? this.html;

            apply_css(css_target, field, this.data);
        }

        // field.apply_css_var = ()=>{

        //     if( !field.var_key ) return;
        //     // console.log('apply_css_var')

        // }

        field.on_change_base = (value)=>{

            if( typeof field.before_change === 'function' ) {
                field.before_change()
            }

            this.data[field.key] = value;

            field.apply_css();
            // field.apply_css_var();

            if( typeof field.on_change === 'function' ) {
                field.on_change(value)
            }
        }

        this.settings[group].push(field)
    }
    
    get_html(){

        const element_class_name =  this.element_class_name ?? 'el'
        
        const html = create_div(`${element_class_name} el_${this.type}`);

        if( this.data.class ) {
            html.classList.add(this.data.class)
        }

        this.html = html;

        html.element = this;
        
        if( typeof this.inner_html === 'function' ) {

            const inner_html = this.inner_html();

            if( typeof inner_html === 'string' ) {
                html.innerHTML = inner_html;
            }
            else if ( inner_html.nodeName ) {
                html.append(inner_html)
            }
            
        }
        
        return html;
    }
    
    render_to(parent){
        
        this.parent = parent;

        parent.elements.push(this)

        parent.elements_append_to.append(this.get_html());
        
        this.hooks.do('on_render')

        if( typeof parent.after_child_render === 'function' ) {
            parent.after_child_render(this);
        }
        
        return this.html;
    }

    render_after(target){

        target.html.after(this.get_html())
        
        const insert_index = target.parent.elements.indexOf(target);

        target.parent.elements.splice(insert_index+1, 0, this)

        this.hooks.do('on_render')

        return this.html;
    }

    on_render(){
        
        this.load_styles();

        global_hooks.do('element/render', this)

        if( typeof this.after_render === 'function' ) {
            this.after_render()
        }
    }

    remove(){
        
        global_hooks.do('element/before_remove', this)

        const index = this.parent.elements.indexOf(this)

        this.parent.elements.splice(index, 1)

        this.html.remove();

        global_hooks.do('element/remove', this)
    }

    get_data(){

        const data = {
            id: this.id,
            type: this.type,
            data: this.data,
        }

        if( this.elements ) {
            data.elements = this.get_children_data();
        }

        return data;
    }

    get_children_data(){

        if( !this.elements ) return [];

        const children = [];

        this.elements.forEach(element=>{
            children.push(element.get_data())
        })

        return children;
    }

    load_styles(){

        this.settings.common_fields.forEach(field=>{
            field.apply_css();
        })

        this.settings.fields.forEach(field=>{
            field.apply_css();
        })
    }

    get_index(){
        return this.parent.elements.indexOf(this);
    }
    
}