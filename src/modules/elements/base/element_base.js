import { create_div } from 'lib/utils';

export default class Element_Base {

    constructor(args = {}){
        this.id = args.id;
        this.name = args.name;
        // this.data = {}

        console.log('Element_Base init', this)

    }

    get_html(){
        
        const html = create_div(`element element_${this.id}`);

        html.innerHTML = this.inner_html();

        return html;
    }

    inner_html(){
        return '';
    }

}