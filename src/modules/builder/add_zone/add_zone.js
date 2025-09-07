import './add_zone.scss';
import { create_div } from 'lib/utils';

export default class Add_Zone {
    
    constructor(args = {}){
        
        const el = create_div('add_zone')
        this.el = el;

        if( args.append_to ) {
            args.append_to.append(el)
        }

        el.addEventListener('click', ()=>{
            el.dataset.state = 'selected';
        })

    }

}