import './add_zone.scss';
import { create_div } from 'lib/utils';
import { global_hooks } from 'src/global_hooks';

export default class Add_Zone {
    
    constructor(args = {}){

        this.args = args;

        if( args.element ) {
            this.element = args.element;
            this.element.add_zone = this;
        }

        if( args.init_html ) {
            this.init_html();
        }
    }
    
    unselect(){
        this.el.dataset.state = '';
        this.active = false;
    }

    select(){
        this.el.dataset.state = 'selected';
        this.active = true;
        global_hooks.do('add_zone/select', {add_zone: this})
    }

    init_html(){
        
        const el = create_div('add_zone')
        this.el = el;

        if( this.args?.append_to ) {
            this.args.append_to.append(el)
        }

        el.addEventListener('click', ()=>this.select())

        el.type = 'add_zone';
    }
    
    add(){

        if( this.active ) return;

        this.active = true;

        this.init_html();
    }

    remove(){

        if( !this.active ) return;
        
        this.el.remove();
        
        this.active = false;
    }

    update(){

        if( !this.element ) return;

        if( !this.element.elements.length ) {
            this.add();
        }
        else {
            this.remove();
        }
    }
    
}