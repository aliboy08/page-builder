import { create_div } from 'lib/utils';

export default class Element_Controls {
    
    constructor(element){

        this.element = element;
        this.init();
    }
    
    init(){

        this.html = create_div('el_controls', this.element.html)
        this.html.controls = this;

        this.buttons_con = create_div('buttons_con', this.html)
    
        this.init_template_save();
    }

    init_template_save(){

        const btn = create_div('btn template_save_btn', this.buttons_con);
        btn.addEventListener('click', ()=>{

            const data = this.element.get_data();

            console.log('template_save', data)
        })
        
    }
}