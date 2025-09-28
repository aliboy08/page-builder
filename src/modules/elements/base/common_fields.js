export function init_common_fields(element){

    const group = 'common_fields';
        
    element.add_field({
        type: 'text',
        key: 'class',
        label: 'Class',
        before_change: ()=>{
            if( element.data.class ) {
                element.html.classList.remove(element.data.class)
            }
        },
        on_change: (value)=>{
            element.html.classList.add(value)
        }
    }, group);

    element.add_field({
        type: 'num4d',
        key: 'padding',
        label: 'Padding',
        css_property: 'padding',
    }, group)

    element.add_field({
        type: 'num4d',
        key: 'margin',
        label: 'Margin',
        css_property: 'margin',
    }, group)

    element.add_field({
        type: 'text',
        key: 'width',
        label: 'Width',
        css_property: 'width',
    }, group)

    element.add_field({
        type: 'color_picker',
        key: 'background_color',
        label: 'Background Color',
        css_property: 'backgroundColor',
    }, group)
        
}