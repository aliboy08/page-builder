import { create_div } from 'lib/utils';
import drag from './drag';
import Hooks from './hooks';

export default class Resizer {

    constructor(el, args = {}){

        this.el = el;
        this.args = args;
        this.direction = args.direction ?? 'right';

        this.hooks = new Hooks([
            'resize',
        ])

        this.init();
    }

    init(){
        
        const handle = create_div('resize_handle', this.el)

        let width;
        
        drag(handle, {
            start: ()=>{
                width = this.el.offsetWidth;
            },
            update: (distance)=>{

                let set_width = width;

                if( this.direction === 'right' ) {
                    set_width += distance;
                }
                else {
                    set_width -= distance;
                }
                
                this.el.style.width = set_width+'px';
            },
            end: ()=>{
                this.hooks.do('resize', this.el.offsetWidth)
            }
        })

    }
    
}