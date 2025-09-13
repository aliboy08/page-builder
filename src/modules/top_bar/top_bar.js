import { global_events } from 'src/global_hooks'
import * as dom from 'src/lib/dom'

init();
function init(){

    const container = dom.div('top_bar')
    dom.get('#page_builder').prepend(container)

    global_events.do('top_bar/init', { container })
}