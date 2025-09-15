import { global_hooks } from 'src/global_hooks'
import * as dom from 'src/lib/dom'

init();
function init(){

    const container = dom.get('#top_bar')

    global_hooks.do_queue('top_bar/init', { container })
}