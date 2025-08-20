import './control_panel.scss';
import Resizer from 'components/resizer';
import { get_el } from 'lib/utils';

export default class Control_Panel {

    constructor(){

        this.container = get_el('.control_panel')
        this.init_resizer();
    }

    init_resizer(){

        const resizer = new Resizer(this.container);

    }

}