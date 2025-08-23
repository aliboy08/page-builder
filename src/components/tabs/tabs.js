import './tabs.scss';
import { create_div } from 'lib/utils';

export default class Tabs {

    constructor(args){
        
        if( Array.isArray(args) ) {
            this.create_html(args)
        }

    }
    
    create_html(args){

        const container = create_div('tabs');

        const tabs_nav = create_div('tabs_nav', container);
        const tabs_content = create_div('tabs_content', container);

        this.nav = {};
        
        args.forEach(tab=>{

            const nav = create_div('tab_nav', tabs_nav, tab.label);
            this.nav[tab.key] = nav;

            nav.content = create_div('tab_content', tabs_content)
            nav.content.style.display = 'none';
            nav.content.textContent = tab.key;

            nav.addEventListener('click', ()=>this.set(tab.key))
        })
        

        this.set(Object.keys(this.nav)[0])
        
        this.container = container;
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

}