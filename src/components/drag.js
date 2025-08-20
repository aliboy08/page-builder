export default function drag(el, args = {}){

    let x, dx, distance;
    
    const end = ()=>{

        document.removeEventListener('pointerup', end)
        document.removeEventListener('pointermove', drag)
        
        if( typeof args.end === 'function' ) {
            args.end()
        }
    }

    const drag = (e)=>{

        dx = e.pageX;

        distance = dx - x;

        if( typeof args.update === 'function' ) {
            args.update(distance)
        }
    }

    const start = (e)=>{

        e.preventDefault();
        
        x = e.pageX;

        document.addEventListener('pointerup', end)
        document.addEventListener('pointermove', drag)

        if( typeof args.start === 'function' ) {
            args.start()
        }
    }

    el.addEventListener('pointerdown', start)
}