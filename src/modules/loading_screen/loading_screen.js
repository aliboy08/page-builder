import './loading_screen.scss';
import { hooks } from 'src/globals';
import { get_el } from 'lib/utils';

const el = get_el('#loading_screen')

hooks.add('ready', ()=>{
    el.classList.add('out')
    setTimeout(()=>{
        el.remove();
    }, 300)
})