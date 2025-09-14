import { global_hooks } from 'src/global_hooks';

export default class Templates_Manager {
    
    constructor(){

        global_hooks.add_queue('builder/init', ({builder})=>{
            this.builder = builder;
            this.init();
        })
    }

    init(){

        global_hooks.add('template/save', ({name})=>{
            this.save(name)
        })

        global_hooks.add('template/remove', ({id})=>{
            this.remove(id)
        })

        global_hooks.add('template/load', ({template})=>{
            this.render(template)
        })

        this.init_data();
    }

    save(name){
        
        if( !name ) return;

        const element = this.get_selected();

        if( !element ) return;
        
        const data = {
            name,
            id: this.get_new_index(),
            data: element.get_data(),
        }

        this.data.push(data);

        this.save_data();
        
        global_hooks.do('template/save/success', {template: data})
    }
    
    get_selected(){
        return this.builder.selector.selected
    }

    init_data(){
        
        this.data = localStorage.getItem('page_builder/templates');

        if( this.data ) {
            this.data = JSON.parse(this.data)
        } else {
            this.data = [];
        }

        global_hooks.do_queue('templates_manager/load_data', { templates: this.data })
    }

    save_data(){
        localStorage.setItem('page_builder/templates', JSON.stringify(this.data))
    }
    
    get_new_index(){
        if( !this.data.length ) return 1;
        return this.data[this.data.length-1].id + 1;
    }

    remove(id){
        
        const index = this.data.findIndex(i=>i.id===id);
        if( index === -1 ) return;
        this.data.splice(index, 1);

        this.save_data();
    }

    render(template){
        
        global_hooks.do('render/element', {
            render_to: this.get_render_to_element(),
            element_data: template.data
        })
        
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