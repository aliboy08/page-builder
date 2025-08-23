import './save.scss';

export default class Builder_Save {

    constructor(builder){
        this.builder = builder;
        this.button = this.init_button();
        builder.container.parentElement.prepend(this.button)
    }

    init_button(){

        const button = document.createElement('button')
        button.className = 'save_button';
        button.textContent = 'Save';

        button.addEventListener('click', ()=>{
            this.save();
        })

        return button;
    }

    save(){
        const data = this.get_data();
        localStorage.setItem('page_builder_data', JSON.stringify(data))
    }

    get_data(){

        const data = [];
        
        const get_elements_data = (parent, data)=>{

            parent.el_children.forEach(element=>{

                const element_data = element.get_data();

                get_children_data(element, element_data);

                data.push(element_data)

            })

        }

        const get_children_data = (element, element_data)=>{
            
            if( !element?.el_children?.length ) return;
            
            element_data.children = [];
            
            get_elements_data(element, element_data.children);
            
        }

        get_elements_data(this.builder.content, data);

        return data;
    }


}