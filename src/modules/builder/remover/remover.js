export default class Element_Remover {

    constructor(main){

        const selector = main.selector;
        
        document.addEventListener('keydown', (e)=>{

            if( e.key !== 'Delete' ) return;
            if( !selector.selected ) return;

            const element = selector.selected;
            
            if( element.remove ) {
                element.remove();
            }
        })

    }
    
}