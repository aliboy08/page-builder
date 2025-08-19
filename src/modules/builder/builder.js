import './builder.scss';
import Draggable from 'components/draggable';
import { is_intersecting, create_div, get_el } from 'lib/utils';

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
            const drop_zone = create_div('drop_zone', con)
            destination[method](con)

            this.drop_zones.push(drop_zone)

            return drop_zone
        }

        add_drop_zone(this.container, 'prepend');

        this.items.forEach(item=>{
            const d = add_drop_zone(item.el, 'after')
            d.textContent = item.el.textContent;
        })
    }
    
    drag_start(current_item){

        this.current_item = current_item;

        this.container.dataset.state = 'drag_start';
        
        this.available_drop_zones = this.drop_zones.filter(drop_zone=>{
            if( drop_zone.parentElement.previousElementSibling === current_item.el ) return false;
            if( drop_zone.parentElement.nextElementSibling === current_item.el ) return false;

            const rect = drop_zone.getBoundingClientRect();
            drop_zone.top = rect.top + pageYOffset;
            drop_zone.bottom = rect.bottom + pageYOffset;

            return true;
        })

    }

    drag_end(){

        this.container.dataset.state = 'drag_end';
        
        if( this.drop_zone ) {

            this.apply_reorder();
            
            // this.reposition(this.current_item.el, this.drop_zone.parentElement)
            this.drop_zone.dataset.state = '';
            
        }
        
        // this.drop_zone = null;

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

        if( this.drop_zone ) {
            const intersecting = is_intersecting(drag_box, this.drop_zone);
            this.drop_zone.dataset.state = intersecting ? 'drop_target' : '';

            if( !intersecting ) {
                this.drop_zone = null;
            }
        }
        
    }

    get_drop_zone(drag_box){
        
        for( const drop_zone of this.available_drop_zones ) {

            if( is_intersecting(drag_box, drop_zone) ) {
                return drop_zone;
            }
            
            if( is_intersecting(drag_box, drop_zone) ) {
                return drop_zone;
            }

        }
    }

    apply_reorder(){
        
        const current_item_dropzone = this.current_item.el.nextElementSibling;
        
        this.drop_zone.parentElement.after(this.current_item.el)
        this.current_item.el.after(current_item_dropzone)
    }

}

