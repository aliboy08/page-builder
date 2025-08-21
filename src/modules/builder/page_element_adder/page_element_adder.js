import './page_element_adder.scss';
import { create_div } from 'lib/utils';
import Popup from 'components/popup/popup';
import Elements_Manager from 'src/modules/elements_manager/elements_manager';

export default class Page_Element_Adder {
    
    constructor(container){
        
        this.el = create_div('page_element_adder', container)

        this.target = this.el;
        
        const popup = new Popup({
            close_duration: 500,
        });

        const elements_manager = new Elements_Manager({
            draggable: false,
        });

        elements_manager.hooks.add('select', (element)=>{
            this.render_element(element);
            popup.close();
        })
        
        this.el.addEventListener('click', ()=>{
            
            if( !this.popup_loaded ) {
                this.popup_loaded = 1;
                elements_manager.render_to(popup.content, {
                    draggable: false,
                })
            }

            popup.open();
        })
        
    }

    render_element(element){
        const html = element.get_html();
        this.target.after(html)
    }

    set_target(el){
        this.target = el;
    }
    
}