import { create_div } from 'lib/utils';

export default class Content_Scroll {
    
    constructor(element){
        this.element = element
        this.active = false;
        this.update();
    }

    get_children_total_width(){
        
        let total = 0;

        for( const child of this.element.children ) {
            total += child.offsetWidth;
        }

        return total;
    }
    
    update(){

        this.container_width = this.element.offsetWidth;
        this.children_width = this.get_children_total_width();
        this.scroll_limit = this.children_width - this.container_width;
        
        if( this.scroll_limit > 0 ) {
            this.enable();
        }
        else {
            this.disable();
        }
    }

    enable(){

        if( this.active ) return;
        this.active = true;

        this.element.style.transition = 'transform .1s ease';
        this.element.style.overflow = 'visible';
        this.element.style.minWidth = this.children_width + 'px';

        this.init_controls();
    }

    disable(){

        if( !this.active ) return;
        this.active = false;

        this.element.style.transition = '';
        this.element.style.overflow = '';
        this.element.style.minWidth = '';

        this.remove_controls();
    }

    init_controls(){
        
        const con = create_div('scroll_controls')
        this.element.after(con)
        con.append(this.element)

        const btn_left = create_div('scroll_control left', con)
        const btn_right = create_div('scroll_control right', con)
        
        let x = 0;
        let dx = this.container_width / 2;
        
        let limit = this.scroll_limit;

        const scroll = (dx)=>{
            x = x + dx;
            update(x);
        }

        const update = (x)=>{
            
            if( x < 0 ) x = 0;
            if( x > limit ) x = limit;
            
            btn_left.style.display = x <= 0 ? 'none' : '';
            btn_right.style.display = x >= limit ? 'none' : '';
        
            this.element.style.transform = `translate(-${x}px)`;
        }

        update(0);

        btn_left.onclick = ()=>scroll(-dx)
        btn_right.onclick = ()=>scroll(dx)

        this.remove_controls = ()=>{
            this.element.classList.remove('scroll_controls_init')
            left.remove();
            right.remove();
        }
    }

}