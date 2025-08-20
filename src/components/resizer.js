import { create_div } from 'lib/utils';
import drag from './drag';

export default class Resizer {

    constructor(el){

        this.el = el;

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
                this.el.style.width = (width + distance)+'px';
            },
            end: ()=>{
                console.log('end')
            }
        })

    }
    
}