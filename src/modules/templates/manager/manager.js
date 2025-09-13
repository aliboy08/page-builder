import { global_hooks, global_events } from 'src/global_hooks';

export default class Templates_Manager {
    
    constructor(){

        global_events.on('builder/init', ({builder})=>{
            this.builder = builder;
            this.init();
        })
    }

    init(){

        global_hooks.add('template/save', ({name})=>{
            this.save_template(name)
        })

        global_hooks.add('template/remove', ({id})=>{
            this.remove(id)
        })

        global_hooks.add('template/render', ({template})=>{
            this.render(template)
        })

        this.init_data();
    }

    save_template(name){
        
        if( !name ) return;

        const element = this.get_selected();

        if( !element ) return;
        
        const data = {
            name,
            id: this.get_new_index(),
            data: element.get_data(),
        }

        this.data.push(data);

        this.save();
        
        global_hooks.do('template/save/success', {template: data})
    }
    
    get_selected(){
        return page_builder.builder.selector.selected
    }

    init_data(){
        
        this.data = localStorage.getItem('page_builder_templates');

        if( this.data ) {
            this.data = JSON.parse(this.data)
        } else {
            this.data = [];
        }

        global_events.do('template/load_data', { templates: this.data })
    }

    save(){
        localStorage.setItem('page_builder_templates', JSON.stringify(this.data))
    }
    
    get_new_index(){
        if( !this.data.length ) return 1;
        return this.data[this.data.length-1].id + 1;
    }

    remove(id){
        
        const index = this.data.findIndex(i=>i.id===id);
        if( index === -1 ) return;
        this.data.splice(index, 1);

        this.save();
    }

    render(template){

        const render_to = this.get_render_to_element();

        this.builder.content_loader.render_elements(render_to, [template.data])

    }

    get_render_to_element(){

        const selected = this.get_selected();

        if( !selected ) {
            return this.builder.content;
        }

        if( !selected.elements ) {
            return selected.parent;
        }

        return selected;
    }

}