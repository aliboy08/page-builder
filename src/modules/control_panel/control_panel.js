import './control_panel.scss';
import { get_el } from 'lib/utils';
import Resizer from 'components/resizer';

export default class Control_Panel {

    constructor(){
        this.container = get_el('.control_panel')
        this.init_resizer();
    }

    init_resizer(){

        const resizer = new Resizer(this.container);

        const parent = get_el('.page_builder')

        const update = (value)=>{
            parent.style.paddingLeft = value+'px';
        }

        update(this.container.offsetWidth)

        resizer.hooks.add('resize', update)
    }

    load_manager(manager){
        const container = this.container.querySelector('.body');
        manager.load(container);
    }

}