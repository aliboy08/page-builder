import './reorder.scss'
import { global_hooks } from 'src/global_hooks'
import { create_div } from 'lib/utils'
import Draggable from 'components/draggable';

export default class Elements_Reorder {
    
    constructor(main){

        this.state = '';
        this.main = main;

        global_hooks.add('element_render', (element)=>{
            this.init_reorder(element)
        }, 200)

        document.addEventListener('pointermove', (e)=>{
            this.target_listener(e)
            this.no_target_listener(e)
            this.last_hover = e.target;
        })
        
    }

    init_reorder(element){

        const handle = this.init_handle(element)
        this.init_drop_zones(element);

        const dragabble = new Draggable(handle)
        
        dragabble.hooks.add('start', ()=>{
            this.start();
            element.html.dataset.state = 'reorder';
            // apply_reorder_start_styles(controls.element)
        })

        dragabble.hooks.add('end', ()=>{
            this.end();
            element.html.dataset.state = 'reorder_end';
            this.apply_reorder(element)
        })
    }

    start(){
        this.state = 'start';
        this.main.container.classList.add('reorder_start')
    }

    end(){
        this.state = 'end';
        this.main.container.classList.remove('reorder_start')
    }

    init_handle(element){

        const handle = create_div('reorder_handle', element.controls.html)
        
        handle.show = ()=>{
            handle.style.display = '';
        }

        handle.hide = ()=>{
            handle.style.display = 'none';
        }

        handle.hide();

        element.reorder_handle = handle;

        return handle;
    }

    init_drop_zones(element){
        ['top', 'right', 'bottom', 'left'].forEach(position=>{
            const drop_zone = create_div(`drop_zone ${position}`, element.controls.html);
            drop_zone.element = element;
            drop_zone.addEventListener('pointerenter', ()=>{
                if( this.state !== 'start' ) return;
                this.drop_target = element;
                this.drop_position = position;
            })
        })
    }

    target_listener(e){

        if( this.target === e.target ) return;

        if( !e.target.element ) return;
        
        if( this.target ) {
            this.target.element.reorder_handle.hide();
        }

        this.target = e.target;
        
        if( this.state !== 'start' ) {
            this.target.element.reorder_handle.show();
        }

    }

    drop_listener(e){
        if( this.state !== 'start' ) return;
        this.last_hover_el = e.target;
    }

    no_target_listener(e){

        if( !this.target ) return;
        if( e.target === this.target ) return;
        if( e.target.element ) return;
        if( e.target === this.target.element.reorder_handle ) return;

        this.target.element.reorder_handle.hide();

        this.target = null;
    }
    
    apply_reorder(element){
        
        console.log('apply_reorder', {
            drop_target: this.drop_target,
            drop_position: this.drop_position,
        })
        
        if( !this.last_hover.element ) return;
        if( this.drop_target === element ) return;
        
        if( this.drop_position === 'top' || this.drop_position === 'left') {
            this.reposition_before(element, this.drop_target)
        }
        
        if( this.drop_position === 'bottom' || this.drop_position === 'right') {
            this.reposition_after(element, this.drop_target)
        }
    }

    reposition_before(element, drop_target){
        element.parent.elements.splice(element.get_index(), 1)
        drop_target.html.before(element.html)
        drop_target.parent.elements.splice(drop_target.get_index(), 0, element)
        element.parent = drop_target.parent;
    }
    
    reposition_after(element, drop_target){
        element.parent.elements.splice(element.get_index(), 1)
        drop_target.html.after(element.html)
        drop_target.parent.elements.splice(drop_target.get_index()+1, 0, element)
        element.parent = drop_target.parent;
    }

}