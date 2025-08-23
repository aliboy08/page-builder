import './control_panel.scss';
import { get_el, create_div } from 'lib/utils';
import Resizer from 'components/resizer';
import { global_hooks } from 'src/global_hooks';
import Control_Panel_Settings_Loader from './settings_loader';

export default class Control_Panel {

    constructor(args = {}){
        
        this.parent_container = args.parent_container;
        this.init_html();
        this.init_resizer();

        this.settings_loader = new Control_Panel_Settings_Loader(this);
        
        
    }
    
    init_html(){

        this.container = create_div('#builder_control_panel')
        this.container.className = 'control_panel';
        this.parent_container.prepend(this.container)

        const inner = create_div('inner', this.container)
        this.body = create_div('body', inner)
    }

    init_resizer(){

        const resizer = new Resizer(this.container);

        const update = (value)=>{
            this.parent_container.style.paddingLeft = value+'px';
        }

        update(this.container.offsetWidth)

        resizer.hooks.add('resize', update)
    }

    init_manager(manager){
        manager.render_to(this.body)
    }
    // load_manager(manager){
    //     const container = this.container.querySelector('.body');
    //     manager.load(container);
    // }

}