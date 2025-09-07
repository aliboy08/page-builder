import { create_div } from 'lib/utils';

export default function init_element_overlay(element){

    const overlay = create_div('element_overlay', element.html)
    
    console.log('init_overlay', {html: element.html, overlay})
}

