export default class Element_Remover {

    constructor(selector){
        
        document.addEventListener('keydown', (e)=>{
            if( e.key !== 'Delete' ) return;

            const target = selector.selected;
            if( !target.element ) return;
            if( target.id === 'page_content_body' ) return;
            
            target.element.remove();
            selector.selected = null;
        })

    }
    
}