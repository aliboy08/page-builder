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
        const data = this.builder.get_data();
        console.log(JSON.stringify(data))
    }

}