export function get_4d_value(raw_value, unit = 'px'){
    const value = [];
    for( const key in raw_value ) {
        value.push(raw_value[key] + unit); 
    }
    return value.join(' ');
}