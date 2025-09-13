import Hooks from 'components/hooks';

export const global_hooks = new Hooks([
    'select_element',
    'element_render',
    'element_remove',
    'parent_element_render',
    'element_controls_init',
    'structure_el_click',
    'reorder_element',

    // manager
    'elements_manager/select',

    // template
    'load_template_items',
    'save_template',
    'save_template_success',
    'load_template',
]);

const events = {};
const queue = {};
export const global_events = {
    on: (id, fn)=>{
        
        const args = events[id];

        if( args ) {
            // console.log('global_events:on:ready', {id, args})
            return fn(args)
        }
        
        if( !queue[id] ) {
            queue[id] = []
        }
        
        // console.log('global_events:on:queue', id)
        queue[id].push(fn)
    },
    do: (id, args)=>{
        
        events[id] = args;

        if( queue[id] ) {
            // console.log('global_events:do', {id, args})
            queue[id].forEach(fn=>fn(args))
            queue[id] = [];
        }
    }
};