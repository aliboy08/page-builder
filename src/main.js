import '@fontsource-variable/inter';
import './modules/loading_screen/loading_screen';
import { hooks } from './globals';
import { sync_load_modules } from 'lib/utils';

if( import.meta.hot ) {
    import.meta.hot.accept();
}

let builder, control_panel
hooks.add('builder/init', init)
hooks.add('control_panel/init', init)

function init(e){
    if( e.builder ) builder = e.builder;
    if( e.control_panel ) control_panel = e.control_panel;
    if( builder && control_panel ) {
        hooks.do_queue('init', { builder, control_panel })
    }
}

const main_modules = [
    ()=>import('./main.scss'),
    ()=>import('./modules/builder/init'),
    ()=>import('./modules/control_panel/init'),
    ()=>import('./modules/elements/manager'),
    ()=>import('./modules/structure/init'),
    ()=>import('./modules/top_bar/init'),
]

sync_load_modules(main_modules, ()=>{
    setTimeout(()=>hooks.do('ready'), 300)
})

import('./modules/templates/init')
import('./modules/pages/init')
import('./modules/save/save')
import('./modules/load_data/load_data')