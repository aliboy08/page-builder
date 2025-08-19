import './builder.scss';
import Draggable from 'components/draggable';
import { wrap_div, create_div, get_el } from 'lib/utils';

export default class Builder {
    
    constructor(container){

        this.container = get_el(container)

        this.init_items()
        this.init_drop_zones();
    }

    init_items(){

        this.items = [];

        document.querySelectorAll('.container').forEach(el=>{
            this.items.push(this.init_item(el))
        })
    }

    init_item(el){

        const item = {
            el,
        };
        
        const draggable = new Draggable(el)

        draggable.hooks.add('start', ()=>this.drag_start(item))
        draggable.hooks.add('end', ()=>this.drag_end())
        draggable.hooks.add('update', (drag_box)=>this.drag_update(drag_box))
        
        return item
    }

    init_drop_zones(){

        this.drop_zones = [];

        const add_drop_zone = (destination, method)=>{

            const con = create_div('drop_zone_container')
            const el = create_div('drop_zone', con)
            destination[method](con)
            
            this.drop_zones.push({
                el,
                rect: el.getBoundingClientRect(),
            })
            
        }

        add_drop_zone(this.container, 'prepend');

        this.items.forEach(item=>{
            add_drop_zone(item.el, 'after')
        })

        console.log(this.drop_zones)

    }
    
    drag_start(current_item){

        this.container.dataset.state = 'drag_start';
    }

    drag_end(){

        this.container.dataset.state = 'drag_end';

        if( this.drop_zone ) {
            this.drop_zone.dataset.state = '';
        }
        
        this.drop_zone = null;

    }
    
    drag_update(drag_box){
        
        const current_drop_zone = this.get_drop_zone(drag_box);

        if( current_drop_zone ) {

            if( this.drop_zone ) {
                if( this.drop_zone === current_drop_zone ) return; 
                this.drop_zone.dataset.state = '';
            }

            this.drop_zone = current_drop_zone;
            current_drop_zone.dataset.state = 'drop_target';
        }

    }

    get_drop_zone(drag_box){
        
        for( const drop_zone of this.drop_zones ) {

            if( is_intersecting(drag_box, drop_zone.rect) ) {
                return drop_zone.el;
            }
            
            if( is_intersecting(drag_box, drop_zone.rect) ) {
                return drop_zone.el;
            }

        }
    }

    // get_drop_target_el(drag_box, target){
        
    //     if( this.is_intersecting(drag_box, target.before) ) {
    //         return target.before.el;
    //     }

    //     if( this.is_intersecting(drag_box, target.after) ) {
    //         return target.after.el;
    //     }

    //     return null;
    // }

    // is_intersecting(drag_box, target){

    //     if( drag_box.bottom < target.rect.top ) return false;
    //     if( drag_box.top > target.rect.bottom ) return false;

    //     // console.log('hit', drag_box, target)
        
    //     return true;
    // }

}

function is_intersecting(box1, box2){
    if( box1.bottom < box2.top ) return false;
    if( box1.top > box2.bottom ) return false;
    return true;
}