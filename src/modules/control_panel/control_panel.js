import './control_panel.scss';
import Resizer from 'components/resizer';
import { get_el } from 'lib/utils';

export default class Control_Panel {

    constructor(){
        this.container = get_el('.control_panel')
        this.parent_container = get_el('.page_builder_app')
        this.init_resizer();
    }

    init_resizer(){

        const resizer = new Resizer(this.container);

        const update_padding = (value)=>{
            this.parent_container.style.paddingLeft = value+'px';
        }

        update_padding(this.container.offsetWidth)

        resizer.hooks.add('resize', update_padding)
    }

}