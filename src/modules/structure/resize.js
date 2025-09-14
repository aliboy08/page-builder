import { get_el } from 'lib/utils';
import Resizer from 'components/resizer';

export default function init_structure_resize(){

    const parent_con = get_el('#page_builder');
    const container = get_el('#elements_structure');

    const resizer = new Resizer(container, {
        direction: 'left',
    });

    const update = (value)=>{
        parent_con.style.paddingRight = value+'px';
    }
    
    resizer.hooks.add('resize', update)
    update(container.offsetWidth)
}