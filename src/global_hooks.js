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