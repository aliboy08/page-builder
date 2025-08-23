import './builder.scss';
import { is_intersecting, create_div, get_el } from 'lib/utils';
// import Draggable from 'components/draggable';
// import Popup from 'components/popup/popup';
// import Hooks from 'components/hooks';
// import Page_Element_Adder from './page_element_adder/page_element_adder';
import Element_Selector from './selector/selector';
import Element_Remover from './remover/remover';
import Builder_Save from './save/save';
import Builder_Content_Loader from './load/content_loader';
import { global_hooks } from 'src/global_hooks';

export default class Builder {
    
    constructor(selector = '#page_content'){
        
        this.container = get_el(selector);
        this.selector = new Element_Selector();

        new Element_Remover(this.selector);
        new Builder_Save(this);

        this.content_loader = new Builder_Content_Loader(this);

        this.init_content();
    }

    init_content(){
        
        const content = get_el('#page_content_body')
        this.content = content;
        content.el_children = [];

        this.selector.selected = content;

        const add_zone = create_div('add_zone')
        content.after(add_zone)
        
        this.selector.init(add_zone, {
            target: content,
        });

        add_zone.addEventListener('click', ()=>{
            global_hooks.do('add_zone_click')
        })
        
    }

    init_manager(manager){
        
        const render_element = (element)=>{
            const location = this.selector.selected;
            if( !location?.el_children ) return;
            element.render(location)
        }
        
        manager.hooks.add('select', (element)=>{
            render_element(element)
        })

        this.manager = manager;
    }
    
}