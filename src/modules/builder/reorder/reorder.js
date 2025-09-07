import './reorder.scss';
import { global_hooks } from 'src/global_hooks'
import { create_div } from 'lib/utils'
import Draggable from 'components/draggable';

export default class Elements_Reorder {
    
    constructor(){

        this.containers = [];

        this.state = '';

        global_hooks.add('element_after_render', (element)=>{

            if( element.type === 'container' ) {
                this.containers.push(element)
            }
            
            this.init_reorder(element)
        })

        document.addEventListener('pointermove', (e)=>{
            this.target_listener(e)
            this.no_target_listener(e)
            this.drop_listener(e);
        })
        
    }

    drop_listener(e){

        if( this.state !== 'drag_start' ) return;

        console.log('checking drop', this.target.element.name)

    }

    target_listener(e){

        if( this.target === e.target ) return;
            
        if( !e.target.classList.contains('reorder_element') ) return;

        if( this.target ) {
            this.target.element.reorder_handle.hide();
        }

        this.target = e.target;
        
        if( this.state !== 'drag_start' ) {
            this.target.element.reorder_handle.show();
        }
    }

    no_target_listener(e){

        if( !this.target ) return;

        if( e.target === this.target.element.reorder_handle ) return;

        if( e.target.classList.contains('reorder_element') ) return;

        this.target.element.reorder_handle.hide();

        this.target = null;
    }
    
    init_reorder(element){

        const handle = init_handle(element)

        const dragabble = new Draggable(handle)
        
        dragabble.hooks.add('start', ()=>{
            this.state = 'drag_start';
            element.html.dataset.state = 'reorder';
            // apply_reorder_start_styles(element)
        })

        dragabble.hooks.add('end', ()=>{
            this.state = 'drag_end';
            this.apply_reorder(element, this.target)
        })
    }

    apply_reorder(element, target){
        
        if( element === target.element ) return;

        // if( target.type === 'container' ) {
        //     target.html.append(element.html)
        // }
        // else {
        //     target.html.after(element.html)
        // }

        console.log('apply_reorder', { element, target })
    }
}

function init_handle(element){

    const handle = create_div('reorder_handle', element.html)
    element.html.classList.add('reorder_element')
    
    handle.show = ()=>{
        // handle.state = 'show';
        handle.style.display = '';
    }

    handle.hide = ()=>{
        // handle.state = 'hide';
        handle.style.display = 'none';
    }

    handle.hide();

    element.reorder_handle = handle;

    return handle;
}

function apply_reorder_start_styles(element){
    element.html.style.boxShadow = 'inset 0 0 0 1px rgba(0, 238, 107, 1)';
}