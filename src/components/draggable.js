import { create_div } from 'lib/utils';
import Hooks from './hooks';
// import Animate_Position from './animate_position';

export default class Draggable {
    
    constructor(el, args = {}){
        this.args = args;
        this.el = el;
        this.init();

        this.hooks = new Hooks([
            'start',
            'end',
            'update',
        ]);
    }

    init(){
        this.el.addEventListener('pointerdown', (e)=>this.start(e))
    }

    start(e){
        
        e.preventDefault();
        
        this.el.dataset.state = 'grabbed';
        
        const indicator = this.create_indicator(e);
        indicator.update(e.pageX, e.pageY)

        this.hooks.do('start')

        const end = ()=>{

            this.el.dataset.state = '';
            
            indicator.remove();
            
            document.removeEventListener('pointerup', end)
            document.removeEventListener('pointermove', update_position)

            this.hooks.do('end')
        }

        const update_position = ({pageX, pageY})=>{
            indicator.update(pageX, pageY)
            this.hooks.do('update', indicator.box)
        }

        document.addEventListener('pointerup', end)
        document.addEventListener('pointermove', update_position)
    }

    // activate(){
    //     this.el.dataset.state = 'dragging';
    // }

    // deactivate(){
    //     this.el.dataset.state = '';
    // }

    // get_clone(){
    //     if( this.clone ) return this.clone;
    //     this.clone = this.create_clone();
    //     return this.clone;
    // }

    create_indicator(){

        const indicator = create_div('drag_indicator', document.body)
        
        const w = indicator.offsetWidth/2;
        const h = indicator.offsetHeight/2;

        indicator.box = {
            width: indicator.offsetWidth,
            height: indicator.offsetHeight,
            x: 0,
            y: 0,
            top: 0,
            bottom: 0,
        }
        
        indicator.update = (x, y)=>{

            indicator.box.x = x - w;
            indicator.box.y = y - h;
            indicator.box.top = indicator.box.y;
            indicator.box.bottom = y + h;
            
            indicator.style.left = indicator.box.x+'px';
            indicator.style.top = indicator.box.y+'px';
        }

        return indicator;
    }
    
    // create_clone(){

    //     const clone = create_div('drag_clone', this.el)
        
    //     const rect = clone.getBoundingClientRect();
        
    //     clone.pos = {
    //         x: 0,
    //         y: 0,
    //     }
        
    //     const get_pos = (x, y)=>{
    //         return {
    //             x: x - rect.x - rect.width/2,
    //             y: y - rect.y - rect.height/2,
    //         }
    //     }
        
    //     clone.update_pos = (x, y)=>{
    //         clone.pos = get_pos(x, y)
    //     }
        
    //     return clone;
    // }
}
