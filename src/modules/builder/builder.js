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

        this.dropzones = [];

        const add_dropzone = (destination, method)=>{

            const el = create_div('drop_zone')
            destination[method](el)

            this.dropzones.push({
                el,
                rect: el.getBoundingClientRect(),
            })
            
        }

        add_dropzone(this.container, 'prepend');

        this.items.forEach(item=>{
            add_dropzone(item.el, 'after')
        })

    }

    init_drop_zone(item){

        // const container = wrap_div(item.el, 'drag_container')

        const drop_zone = create_div('drop_zone')
        item.el.after(drop_zone)
        
        // item.before = {
        //     el: before,
        //     rect: before.getBoundingClientRect(),
        // }

        // const after = create_div('drag_after')
        // container.append(after)

        // item.after = {
        //     el: after,
        //     rect: after.getBoundingClientRect(),
        // }
    }
    
    drag_start(current_item){

        this.container.dataset.state = 'drag_start';

        this.drag_targets = this.items.filter(item => item !== current_item)
    }

    drag_end(){

        this.container.dataset.state = 'drag_end';

        // this.drag_targets.forEach(target=>{
        //     target.before.el.dataset.state = '';
        //     target.after.el.dataset.state = '';
        // })

        if( this.drop_target ) {
            this.drop_target.dataset.state = '';
        }
        
        this.drop_target = null;

    }
    
    drag_update(drag_box){

        // const drop_target = this.get_drop_target(drag_box);
        // console.log(drop_target)

        // if( drop_target ) {

        //     if( this.drop_target ) {
        //         if( this.drop_target === drop_target ) return; 
        //         this.drop_target.dataset.state = '';
        //     }

        //     this.drop_target = drop_target;
        //     drop_target.dataset.state = 'drop_target';
        // }

    }

    get_drop_target(drag_box){
        
        for( const target of this.drag_targets ) {

            if( is_intersecting(drag_box, target.before.rect) ) {
                return target.before.el;
            }
            
            if( is_intersecting(drag_box, target.after.rect) ) {
                return target.after.el;
            }

        }
        
        return null;
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