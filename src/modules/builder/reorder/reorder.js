import './reorder.scss';
import { global_hooks } from 'src/global_hooks'
import { create_div } from 'lib/utils'
import Draggable from 'components/draggable';

export default class Elements_Reorder {
    
    constructor(){

        this.containers = [];

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

        const dragabble = new Draggable(handle)

        const container_hover = (e)=>{
            const target = e.target;
            const element = target.element
            console.log('container_hover', {target, element})
        }

        const start = ()=>{

            console.log('start')

            // this.containers.forEach(container=>{
            //     if( element === container ) return;
            //     container.html.addEventListener('pointerover', container_hover)
            // })
        }

        const end = ()=>{

            console.log('end')
            
            // this.containers.forEach(container=>{
            //     container.html.removeEventListener('pointerover', container_hover)
            // })
        }
        
        dragabble.hooks.add('start', start)
        dragabble.hooks.add('end', end)
    }

}

function get_drop_position(el, ){

}