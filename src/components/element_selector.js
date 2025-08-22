export default class Element_Selector {
    
    constructor(){

        this.selected = null;
        this.throttling = false;
        
        document.addEventListener('element_after_render', ({data})=>{
            this.init(data.html)
        })
    }

    init(el){

        el.addEventListener('click', (e)=>{
            // e.stopPropagation();
            this.select(el)
        })
    }

    select(el){

        // throttle to simulate stop progration
        if( this.throttle() ) return; 
        
        this.unselect_previous();

        this.selected = el;
        el.dataset.state = 'selected';
    }
    
    unselect(el){
        el.dataset.state = '';
    }

    unselect_previous(){
        if( this.selected ) {
            this.unselect(this.selected)
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