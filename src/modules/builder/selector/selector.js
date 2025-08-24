import './selector.scss';

import { global_hooks } from 'src/global_hooks';

export default class Element_Selector {
    
    constructor(){

        this.selected = null;

        this.throttling = false;

        global_hooks.add('element_after_render', (element)=>{
            this.init(element)
        })
    }

    init(element){
        
        element.html.addEventListener('click', ()=>{
            this.select(element)
        })
    }

    select(element){

        // throttle to simulate stop progration
        if( this.throttle() ) return;
        this.unselect_previous();
        
        this.selected = element;

        console.log('select', element)
        
        this.selected.html.dataset.state = 'selected';

        global_hooks.do('select_element', element)
    }

    unselect_previous(){
        if( !this.selected ) return;
        this.selected.html.dataset.state = '';
        this.selected = null;
    }    

    throttle(){

        if( this.throttling ) return true;

        this.throttling = true;

        setTimeout(()=>{
            this.throttling = false
        }, 50);
        
        return false;
    }
    
}