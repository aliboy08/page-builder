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

        const save_indicator = ()=>{
            button.textContent = 'Saved';
            button.dataset.state = 'saved';
            setTimeout(()=>{
                button.textContent = 'Save';
                button.dataset.state = '';
            }, 1500)
        }

        button.addEventListener('click', ()=>{
            this.save();
            save_indicator();
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

            parent.children.forEach(element=>{

                const element_data = element.get_data();
                data.push(element_data)

                get_children_data(element, element_data);
                
            })

        }

        const get_children_data = (parent, element_data)=>{
            
            if( !parent?.children?.length ) return;

            element_data.children = [];

            get_elements_data(parent, element_data.children);
            
        }
        
        get_elements_data(this.builder, data);

        return data;
    }

}