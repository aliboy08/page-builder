import './tabs.scss';
import { create_div } from 'lib/utils';
import Hooks from 'components/hooks';

export default class Tabs {

    constructor(args){
        
        this.hooks = new Hooks([
            'create_tab',
        ])

        if( Array.isArray(args) ) {
            this.init_html(args)
        }

    }
    
    init_html(args){

        const container = create_div('tabs');
        this.tabs_nav = create_div('tabs_nav', container);
        this.tabs_content = create_div('tabs_content', container);

        this.nav = {};
        
        args.forEach(tab=>this.create_tab(tab))
        
        this.set(Object.keys(this.nav)[0])
        
        this.container = container;
    }

    create_tab(tab){

        const nav = create_div('tab_nav', this.tabs_nav, tab.label);
        this.nav[tab.key] = nav;

        nav.content = create_div('tab_content', this.tabs_content)
        nav.content.style.display = 'none';

        nav.addEventListener('click', ()=>this.set(tab.key))

        this.hooks.do('create_tab')
    }

    set(key){

        if( this.current === key ) return;
        this.unset_previous();
        this.current = key;
        this.nav[this.current].classList.add('active')
        this.nav[this.current].content.style.display = '';

    }
    
    unset_previous(){
        if( !this.current ) return;
        this.nav[this.current].classList.remove('active')
        this.nav[this.current].content.style.display = 'none';
    }

    set_content(key, html){

        if( typeof html === 'string' ) {
            this.nav[key].content.innerHTML = html;
        }
        else {
            this.nav[key].content.innerHTML = '';
            this.nav[key].content.append(html)
        }
        
    }

}