import './selector.scss';

import { global_hooks } from 'src/global_hooks';

export default class Element_Selector {
    
    constructor(){

        this.selected = null;
        this.selected_trigger = null;
        
        this.throttling = false;
        
        document.addEventListener('element_after_render', ({data})=>{
            this.init(data.html)
        })
    }

    init(el, args = {}){
        
        el.addEventListener('click', (e)=>{
            // e.stopPropagation();
            
            this.select(el, args)

            if( typeof args.on_click === 'function' ) {
                args.on_click();
            }
        })
    }

    select(el, args = {}){

        // throttle to simulate stop progration
        if( this.throttle() ) return;

        this.unselect_previous();

        let target = el;

        if( args.target ) {
            target = args.target;
            el.dataset.state = 'selected';
            this.selected_trigger = el;
        }
        
        this.selected = target;
        target.dataset.state = 'selected';

        if( target.element ) {
            global_hooks.do('select_element', target.element)
        }
        
    }
    
    unselect(el){

        el.dataset.state = '';

    }

    unselect_previous(){

        if( this.selected ) {
            this.unselect(this.selected)
        }

        if( this.selected_trigger ) {
            this.selected_trigger.dataset.state = '';
            this.selected_trigger = null;
        }
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