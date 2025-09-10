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

        const get_parent_container = (element)=>{
            if( !element.parent.type ) return this.body;
            return element.parent.structure_el.children_con;
        }

        const init_toggle = (item)=>{
            const btn = create_div('toggle_btn', item)
            btn.addEventListener('click', (e)=>{
                e.stopPropagation()
                item.parentElement.classList.toggle('toggle_children')

            })
        }
        
        const add = (element)=>{
            
            const parent_con = get_parent_container(element);
            
            const item_con = create_div('item_con', parent_con)

            const item = create_div('item', item_con, element.name)
            
            if( element.type === 'container' ) {
                item.children_con = create_div('children', item_con)
                init_toggle(item)
            }

            item.element = element;
            element.structure_el = item;

            item.addEventListener('click', ()=>{
                global_hooks.do('structure_el_click', element)
            })
        }

        global_hooks.add('element_render', (element)=>{
            add(element)                                                                                           
        })

    }

    init_remove(){

        const is_top_level = (element)=>{
            return element.structure_el.parentElement.parentElement === this.body;
        }

        const remove_children = (parent)=>{
            if( !parent?.children?.length ) return;
            parent.children.forEach(child=>{
                remove(child)
            })
        }

        const remove = (element)=>{

            if( is_top_level(element) ) {
                return element.structure_el.parentElement.remove();
            }
            
            remove_children(element)
            element.structure_el.remove();
        }
        
        global_hooks.add('element_remove', (element)=>{
            remove(element)
        })
    }
    
    init_select(){

        let current = null;

        const open_parent = (item)=>{

            if( !item ) return;
            
            const item_con = item.parentElement;

            if( !item_con ) return;

            const children_con = item_con.parentElement;
            const is_first_level = children_con.classList.contains('structure_body');

            if( !is_first_level ) {
                children_con.parentElement.classList.add('toggle_children')
                open_parent(children_con.previousElementSibling);
            }
            else {
                item_con.classList.add('toggle_children')
            }
        }

        global_hooks.add('select_element', (element)=>{
            if( current ) current.classList.remove('selected');
            current = element.structure_el;
            current.classList.add('selected');
            setTimeout(()=>open_parent(current), 100)
        })

    }

}