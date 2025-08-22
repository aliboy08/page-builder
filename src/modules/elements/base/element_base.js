import { create_div } from 'lib/utils';
import { dispatch } from 'lib/utils';

export default class Element_Base {

    constructor(args = {}){
        this.id = args.id;
        this.name = args.name;
        this.data = {}
    }

    get_html(){
        
        const html = create_div(`element element_${this.id}`);

        html.innerHTML = this.inner_html();

        return html;
    }

    inner_html(){
        return '';
    }

    render(target, method = 'append'){

        const html = this.get_html();

        dispatch('element_before_render', { html })

        if( method === 'after' ) {
            target.after(html)
        }
        else if( method === 'before' ) {
            target.before(html)
        }
        else {
            target.append(html)
        }

        dispatch('element_after_render', { html })
    }

}