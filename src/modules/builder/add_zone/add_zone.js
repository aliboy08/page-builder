import './add_zone.scss';
import { create_div } from 'lib/utils'

export default class Add_Zone {

    constructor(args = {}){
        this.args = args;
        this.init();
    }

    init(){

        const el = create_div('add_zone');
        this.el = el;

        el.addEventListener('click', ()=>{
            console.log('popup')
        })
    }

}