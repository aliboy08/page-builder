import './structure.scss';
import { create_div } from 'lib/utils';
import Resizer from 'components/resizer';

export default class Elements_Structure {
    
    constructor(args = {}){

        this.parent_container = args.parent_container;
        this.init_html();
        this.init_resizer();

    }

    init_html(){

        this.container = create_div('#elements_structure')
        this.container.className = 'elements_structure';
        this.parent_container.append(this.container)

    }

    init_resizer(){
    
        const resizer = new Resizer(this.container, {
            direction: 'left',
        });

        const update = (value)=>{
            this.parent_container.style.paddingRight = value+'px';
        }

        update(this.container.offsetWidth)

        resizer.hooks.add('resize', update)
    }

}