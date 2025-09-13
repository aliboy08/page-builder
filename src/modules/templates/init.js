import { global_hooks } from 'src/global_hooks';

if( window.page_builder ) {
    init();
}
else {
    global_hooks.add('init', init)
}

function init(){
    import('./control_panel/control_panel')
    import('./manager/init')
}