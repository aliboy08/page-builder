import './add_zone.scss';
import { create_div, get_pos, dispatch } from 'lib/utils';

const height = 30;

export default class Add_Zone {

    constructor(parent, method = 'after'){
        
        this.parent = parent;
        this.el = create_div('add_zone');

        this['add_'+method]();

        this.el.style.height = height + 'px';
        
        this.el.addEventListener('click', ()=>{
            dispatch('add_zone_element', {el: this.el});
        })
    }

    add_prepend(){
        this.parent.prepend(this.el);
    }

    add_after(){
        this.parent.after(this.el);
        const top = get_pos(this.parent).bottom - height / 2;
        this.el.style.top = top + 'px';
    }
    
}