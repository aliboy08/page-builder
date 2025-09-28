import { ucfirst } from 'lib/utils';

export function get_4d_value(raw_value, unit = 'px'){
    const value = [];
    for( const key in raw_value ) {
        value.push(raw_value[key] + unit); 
    }
    return value.join(' ');
}

export function apply_css(target, field, data){

    const value = data[field.key] ?? null;
    if( value === null ) return;

    if( field.type === 'num4d' ) {
        apply_4d_css(target, field.css_property, value);
    }
    else {
        target.style[field.css_property] = value;
    }
}

function apply_4d_css(target, css_property, css_value){

    for( const position in css_value ) {

        let position_value = css_value[position];

        if( !isNaN(position_value) && position_value ) {
            position_value += 'px'; // no unit, defualt px
        }
        
        target.style[css_property+ucfirst(position)] = position_value;
    }
}