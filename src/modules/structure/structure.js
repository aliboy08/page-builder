import './structure.scss';
import { create_div } from 'lib/utils';
import Resizer from 'components/resizer';
import { global_hooks } from 'src/global_hooks';

export default class Elements_Structure {
    
    constructor(args = {}){

        this.parent_container = args.parent_container;

        this.items = {};

        this.init_html();
        this.init_resizer();
        this.init_add();
        this.init_remove();
        this.init_select();
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

    init_add(){

        const get_parent_item = (element)=>{
            if( !element.parent ) return this.body;
            return element.parent.structure_el.children_con;
        }
        
        const add = (element)=>{

            const parent_item = get_parent_item(element);

            const item = create_div('item', parent_item)
            
            if( element.type === 'container' ) {

                item.parent_el = create_div('item parent', item, element.name)

                item.children_con = create_div('children', item)
            }
            else {
                item.textContent = element.name;
            }

            item.element = element;

            item.addEventListener('click', ()=>{
                element.html.click();
            })
            
            element.structure_el = item;
        }

        global_hooks.add('element_after_render', (element)=>{
            add(element)
        })

    }

    init_remove(){

        const remove = (element)=>{
            element.structure_el.remove();
        }

        global_hooks.add('element_remove', (element)=>{
            remove(element)
        })
    }
    
    init_select(){

        let current = null;

        global_hooks.add('select_element', (element)=>{
            if( current ) current.classList.remove('selected');

            current = element.structure_el.parent_el ?? element.structure_el;
            
            current.classList.add('selected');
        })

    }

}