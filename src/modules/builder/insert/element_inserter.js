import './element_inserter.scss';
import { global_hooks } from 'src/global_hooks';

export default class Element_Inserter {

    constructor(){

        // global_hooks.add('parent_element_render', (element)=>{
        //     this.init_inserter(element);
        // })
    }

    init_inserter(element){

        console.log('parent_element_render', element)

    }

}