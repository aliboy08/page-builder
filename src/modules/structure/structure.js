import './structure.scss';
import { create_div } from 'lib/utils';
import Resizer from 'components/resizer';
import { global_hooks } from 'src/global_hooks';

export default class Elements_Structure {
    
    constructor(args = {}){

        this.parent_container = args.parent_container;

        this.init_html();
        this.init_resizer();

        this.items = {};

        global_hooks.add('element_after_render', (element)=>{
            this.add_item(element);
        })

        global_hooks.add('element_remove', (element)=>{
            this.remove_item(element)
        })
    }

    init_html(){

        this.container = create_div('#elements_structure')
        this.container.className = 'elements_structure';
        this.parent_container.append(this.container)

        this.body = create_div('structure_body', this.container)
    }

    init_resizer(){
    
        const resizer = new Resizer(this.container, {
            direction: 'left',
        });

        const update = (value)=>{
            this.parent_container.style.paddingRight = value+'px';
        }

        update(this.container.offsetWidth)

        resizer.hooks.add('resize', update)
    }

    add_item(element){

        console.log(element)

        const parent_item = this.get_parent_item(element);
        const item = create_div('item', parent_item, element.name)
        
        if( element.type === 'container' ) {
            item.children_con = create_div('children', item)
        }

        item.element = element;
        
        element.structure_el = item;
    }

    remove_item(element){
        element.structure_el.remove();
    }

    get_parent_item(element){
        if( !element.parent ) return this.body;
        return element.parent.structure_el.children_con;
    }

}