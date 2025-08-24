export default class Element_Remover {

    constructor(selector){
        
        document.addEventListener('keydown', (e)=>{
            if( e.key !== 'Delete' ) return;
            if( !selector.selected ) return;

            const element = selector.selected;
            console.log('element_remover', element)

            if( element.remove ) {
                element.remove();
            }
        })

    }
    
}