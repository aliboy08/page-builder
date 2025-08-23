import './add_zone.scss';
import { create_div } from 'lib/utils';
// import Popup from 'components/popup/popup';
// import Elements_Manager from 'src/modules/elements_manager/elements_manager';

export default class Page_Element_Adder {
    
    constructor(container){
        this.el = create_div('page_element_adder', container)
        this.target = container;
    }

    render_element(element){
        const html = element.get_html();
        this.target.before(html)
    }

    set_target(el){
        this.target = el;
    }
    
}