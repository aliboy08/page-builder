import { hooks } from 'src/globals'
import * as dom from 'src/lib/dom'

init();
function init(){

    const container = dom.get('#top_bar')

    const left = dom.div('top_bar_left', container)
    const right = dom.div('top_bar_right', container)

    hooks.do_queue('top_bar/init', { container, left, right })
}