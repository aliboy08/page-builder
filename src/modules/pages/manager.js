import { global_hooks } from 'src/global_hooks';

export default class Pages_Manager {
    
    constructor(){

        global_hooks.add_queue('builder/init', ({builder})=>{
            this.builder = builder;
            this.init();
        })
    }

    init(){

        global_hooks.add('page/save', (args)=>{
            this.save(args)
        })

        global_hooks.add('page/remove', ({id})=>{
            this.remove(id)
        })

        global_hooks.add('page/load', ({page})=>{
            this.load(page)
        })

        this.init_data();
    }

    save(args){
        
        const page = {
            ...args,
            id: this.get_new_index(),
            data: this.builder.get_data(),
        }

        this.data.push(page);

        this.save_data();
        
        global_hooks.do('page/save/success', {page})
    }
    
    get_selected(){
        return page_builder.builder.selector.selected
    }

    init_data(){
        
        this.data = localStorage.getItem('page_builder/pages');

        if( this.data ) {
            this.data = JSON.parse(this.data)
        } else {
            this.data = [];
        }

        global_hooks.do_queue('pages_manager/load_data', { pages: this.data })
    }

    save_data(){
        localStorage.setItem('page_builder/pages', JSON.stringify(this.data))
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

    load(page){

        this.builder.clear();
        
        global_hooks.do('render/elements', {
            render_to: this.builder.content,
            elements_data: page.data,
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