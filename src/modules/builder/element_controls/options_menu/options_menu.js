import './context_menu.scss';

export default class Context_Menu {

    constructor(element){
    
        this.element = element;

        // element.html.addEventListener('contextmenu', (e)=>{
        //     e.stopPropagation();
        //     e.preventDefault();
        //     console.log('contextmenu', this.element)
        // })
    }

}