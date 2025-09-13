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
            'on_render'
        ])

        this._init_fields();

        this.hooks.add('on_render', ()=>this.on_render())
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

        const element_class_name =  this.element_class_name ?? 'el'
        
        const html = create_div(`${element_class_name} el_${this.type}`);
        
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

        global_hooks.do('element_render', this)

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
        this.settings.fields.forEach(field=>{
            field.apply_css();
        })
    }

    get_index(){
        return this.parent.elements.indexOf(this);
    }
    
}