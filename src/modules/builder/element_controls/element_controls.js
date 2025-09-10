import { create_div } from 'lib/utils';

export default class Element_Controls {
    
    constructor(element){
        this.element = element;
        this.init();
    }
    
    init(){
        this.html = create_div('el_controls', this.element.html)
        this.html.controls = this;
        // this.init_reorder();
    }

    // init_reorder(){
    //     const handle = create_div('reorder_handle')
    // }

}