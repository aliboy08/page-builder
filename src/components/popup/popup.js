import './popup.scss';
import { create_div, outside_click_handler } from 'lib/utils';

export default class Popup {

    constructor(args = {}){
        this.args = args;
        this.close_duration = args.close_duration ?? 0;
    }

    init(){

        if( this.initialized ) return;
        this.initialized = true;
        
        this.container = create_div('popup', document.body)
        this.container.style.display = 'none';

        const inner = create_div('popup_inner', this.container)

        this.content = create_div('popup_content', inner)

        this.outside_click = outside_click_handler(inner, ()=>this.close())

        create_div('close', inner).onclick = ()=>this.close();
    }
    
    open(){
        this.init();
        this.container.style.display = '';
        this.outside_click.start();
    }

    close(){
        
        this.container.dataset.state = 'closing';
        this.outside_click.end();

        setTimeout(()=>{
            this.container.style.display = 'none';
            this.container.dataset.state = 'closed';
        }, this.close_duration)
        
    }

}