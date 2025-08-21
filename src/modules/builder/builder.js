import './builder.scss';
import { is_intersecting, create_div, get_el } from 'lib/utils';
import Draggable from 'components/draggable';
import Add_Zone from './add_zone/add_zone';
import Control_Panel from '../control_panel/control_panel';
import Popup from 'components/popup/popup';
import Elements_Manager from '../elements/manager/elements_manager';

export default class Builder {
    
    constructor(){

        this.container = get_el('.page_builder_content')

        this.elements_manager = new Elements_Manager();

        this.control_panel = new Control_Panel();

        this.control_panel.load_manager(this.elements_manager);
        
        this.init_items()
        // this.init_drop_zones();

        this.init_add_zones();
        this.init_popup();
    }
    
    init_add_zones(){

        const add_zone = new Add_Zone(this.container, 'prepend');

        // this.container.prepend(add_zone.el)
        
        // const bottom = new Add_Zone();
        // this.container.append(bottom.el)

    }

    init_popup(){
        
        const popup = new Popup({
            close_duration: 500,
        });

        document.addEventListener('add_zone_element', ({ data })=>{

            console.log('add_zone_element', data.el)

            this.elements_manager.set_target(data.el)

            popup.set_context('add_elements')
            
            this.elements_manager.load(popup.content, {
                draggable: false,
                on_select: ()=>popup.close(),
            })

            popup.open();

        })
        
    }

    init_items(){

        this.items = [];

        document.querySelectorAll('.container').forEach(item=>{
            this.items.push(this.init_item(item))
        })
    }

    init_item(item){

        const add_zone = new Add_Zone(item, 'after');

        // const draggable = new Draggable(item)
        // draggable.hooks.add('start', ()=>this.drag_start(item))
        // draggable.hooks.add('end', ()=>this.drag_end())
        // draggable.hooks.add('update', (drag_box)=>this.drag_update(drag_box))
        
        return item;
    }

    // init_drop_zones(){

    //     this.drop_zones = [];

    //     const add_drop_zone = (destination, method)=>{

    //         const con = create_div('drop_zone_container')
    //         const drop_zone = create_div('drop_zone', con)
    //         destination[method](con)

    //         this.drop_zones.push(drop_zone)

    //         return drop_zone
    //     }

    //     add_drop_zone(this.container, 'prepend');

    //     this.items.forEach(item=>{
    //         add_drop_zone(item, 'after')
    //     })
    // }
    
    // drag_start(current_item){

    //     this.current_item = current_item;

    //     this.container.dataset.state = 'drag_start';
        
    //     this.available_drop_zones = this.drop_zones.filter(drop_zone=>{
    //         if( drop_zone.parentElement.previousElementSibling === current_item ) return false;
    //         if( drop_zone.parentElement.nextElementSibling === current_item ) return false;

    //         const rect = drop_zone.getBoundingClientRect();
    //         drop_zone.top = rect.top + pageYOffset;
    //         drop_zone.bottom = rect.bottom + pageYOffset;

    //         return true;
    //     })

    // }

    // drag_end(){

    //     this.container.dataset.state = 'drag_end';
        
    //     if( this.drop_zone ) {
    //         this.apply_reorder();
    //         this.drop_zone.dataset.state = '';
    //     }
        
    //     this.drop_zone = null;
    // }
    
    // drag_update(drag_box){
        
    //     const drop_zone = this.get_drop_zone(drag_box);

    //     if( drop_zone ) {

    //         if( this.drop_zone ) {
    //             if( this.drop_zone === drop_zone ) return; 
    //             this.drop_zone.dataset.state = '';
    //         }

    //         this.drop_zone = drop_zone;
    //         drop_zone.dataset.state = 'drop_target';
    //     }

    //     if( this.drop_zone ) {
            
    //         const intersecting = is_intersecting(drag_box, this.drop_zone);
    //         this.drop_zone.dataset.state = intersecting ? 'drop_target' : '';

    //         if( !intersecting ) {
    //             this.drop_zone = null;
    //         }
    //     }
        
    // }

    // get_drop_zone(drag_box){
        
    //     for( const drop_zone of this.available_drop_zones ) {

    //         if( is_intersecting(drag_box, drop_zone) ) {
    //             return drop_zone;
    //         }
            
    //         if( is_intersecting(drag_box, drop_zone) ) {
    //             return drop_zone;
    //         }

    //     }
    // }

    // apply_reorder(){
        
    //     const current_item_dropzone = this.current_item.nextElementSibling;
        
    //     this.drop_zone.parentElement.after(this.current_item)
    //     this.current_item.after(current_item_dropzone)
    // }

}

