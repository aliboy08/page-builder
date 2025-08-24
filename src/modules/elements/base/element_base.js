import { create_div } from 'lib/utils';
import { generate_id } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';

export default class Element_Base {

    constructor(args = {}){
        this.type = args.type;
        this.id = args.id || generate_id();
        this.name = args.name;
        this.data = {}
        this.settings = {};
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

    render_to(parent, method = 'append'){

        const html = this.get_html();
        
        // switch(method) {
        //     case 'append' : parent.append(html); break;
        //     case 'after' : parent.after(html); break;
        //     case 'before' : parent.before(html); break;
        //     case 'prepend' : parent.prepend(html); break;
        // }

        parent.append(html);

        this.html = html;

        global_hooks.do('element_after_render', this)
        
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

}