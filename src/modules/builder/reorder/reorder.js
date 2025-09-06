import './reorder.scss';
import { global_hooks } from 'src/global_hooks'
import { create_div } from 'lib/utils'
import Draggable from 'components/draggable';

export default class Elements_Reorder {
    
    constructor(){

        this.containers = [];

        this.state = '';
        this.target = null;

        global_hooks.add('element_after_render', (element)=>{

            if( element.type === 'container' ) {
                this.containers.push(element)
            }
            
            this.init_reorder(element)
        })
    }

    init_reorder(element){

        const handle = create_div('reorder_handle', element.html)
        element.html.classList.add('reorder_element')
        handle.style.display = 'none';

        const dragabble = new Draggable(handle)

        element.html.addEventListener('pointerenter', ()=>{
            this.target = element;
            if( this.state === 'drag_start' ) return;
            handle.style.display = '';
        })

        element.html.addEventListener('pointerleave', ()=>{
            handle.style.display = 'none';
        })
        
        dragabble.hooks.add('start', ()=>{
            this.state = 'drag_start';
        })
        dragabble.hooks.add('end', ()=>{
            this.state = 'drag_end';
            this.apply_reorder(element, this.target)
        })
    }

    apply_reorder(element, target){
        
        if( element === target ) return;

        if( target.type === 'container' ) {
            target.html.append(element.html)
        }
        else {
            target.html.after(element.html)
        }

        console.log('apply_reorder', { element, target })
    }
}