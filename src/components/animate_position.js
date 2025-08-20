import { lerp, easing1 } from 'lib/utils';

export default class Animate_Position {

    constructor(el, args = {}){

        this.el = el;
        this.lerp_amount = args.lerp ?? .1

        this.stop = false;

        if( !el.pos ) {
            el.pos = {
                x: 0,
                y: 0,
            }
        }

        this.x = 0;
        this.y = 0;

        if( args.animate !== false ) {
            this.animate();
        }
    }

    update(){

        this.x = lerp(this.x, this.el.pos.x, this.lerp_amount)
        this.y = lerp(this.y, this.el.pos.y, this.lerp_amount)

        this.el.style.transform = `translate3d(${this.x}px,${this.y}px,0)`;
    }

    animate(){
        
        const loop = ()=>{
            if( this.stop ) return;
            this.update();
            requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop)
    }
    
    end(){
        this.stop = true;
    }

    // animate_to_raw(dx, dy, duration = 1000, callback = null){
        
    //     const start_x = this.el.pos.x;
    //     const start_y = this.el.pos.y;

    //     const delta_x = dx - start_x;
    //     const delta_y = dy - start_y;

    //     const start_time = performance.now();

    //     const loop = (time)=>{
            
    //         const elapsed_time = time - start_time;

    //         const progress = Math.min(elapsed_time / duration, 1)

    //         const eased_progress = easing1(progress)

    //         const x = start_x + (delta_x * eased_progress)
    //         const y = start_y + (delta_y * eased_progress)

    //         this.el.style.transform = `translate3d(${x}px,${y}px,0)`;

    //         // this.update();
    //         if( elapsed_time < duration ) {
    //             requestAnimationFrame(loop)
    //         }
    //         else {
    //             if( typeof callback === 'function' ) {
    //                 callback();
    //             }
    //         }
            
    //     }
        
    //     requestAnimationFrame(loop)
    // }

    // to(x, y, duration = 400, callback, args = {}){
        
    //     this.el.pos = {x, y}
        
    //     const easing = args.easing ?? 'cubic-bezier(0, 0.6, 0.151, 1.03)';

    //     const initial_transition = this.el.style.transition;

    //     this.el.style.transition = `transform ${duration}ms ${easing}`;
    //     this.el.style.transform = `translate3d(${x}px,${y}px,0)`;

    //     setTimeout(()=>{
            
    //         this.el.style.transition = initial_transition;
    //         if( typeof callback === 'function' ) callback();
    //     }, duration)
        
    // }

}

