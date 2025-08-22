export default class Element_Remover {

    constructor(selector){
        
        document.addEventListener('keydown', (e)=>{
            if( e.key !== 'Delete' ) return;

            const el = selector.selected;
            if( el.classList.contains('page_element_adder') ) return;
            
            el.remove();
            selector.selected = null;
            console.log(selector.selected)
        })

    }


    
}