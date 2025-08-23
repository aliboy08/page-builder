class Temp {
    
    init_add_zones(){

        // const add_zone = new Add_Zone(this.container, 'prepend');

        // this.container.prepend(add_zone.el)
        
        // const bottom = new Add_Zone();
        // this.container.append(bottom.el)

    }


    init_item(item){

        // const add_zone = new Add_Zone(item, 'after');

        // const draggable = new Draggable(item)
        // draggable.hooks.add('start', ()=>this.drag_start(item))
        // draggable.hooks.add('end', ()=>this.drag_end())
        // draggable.hooks.add('update', (drag_box)=>this.drag_update(drag_box))
        
        // return item;
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

