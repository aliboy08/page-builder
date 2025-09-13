export default class Template_Manager {
    
    constructor(){
        this.init_data();
    }

    init_data(){
        
        this.data = localStorage.getItem('page_builder_templates');

        if( this.data ) {
            this.data = JSON.parse(this.data)
        } else {
            this.data = [];
        }
        
    }

    add(element, name){

        const data = {
            name,
            id: this.get_new_index(),
            data: element.get_data(),
        }

        this.data.push(data);

        this.save();

        return data;
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

}