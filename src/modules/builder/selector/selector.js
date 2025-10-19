import { hooks } from 'src/globals';

export default class Element_Selector {
    
    constructor(){

        this.selected = null;

        this.throttling = false;

        hooks.add('element/render', (element)=>{
            this.init(element)
        })

        hooks.add('structure/click', (element)=>{
            this.select(element)
        })
    }

    init(element){

        // if( !this.selected ) this.select(element)

        element.html.addEventListener('click', ()=>{
            this.select(element)
        })
        
    }

    select(element){

        // throttle to simulate stop progration
        if( this.throttle() ) return;
        
        this.unselect_previous();
        
        this.selected = element;
        
        this.selected.html.dataset.state = 'selected';
        hooks.do('element/select', element)
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