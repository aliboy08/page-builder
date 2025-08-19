export function lerp(start, end, amount) {
    return start + (end - start) * amount;
}

export function easing1(x){
    return 1 - Math.pow(1 - x, 5);
}

export function create_div(class_name = '', target, method = 'append'){
    
    const div = document.createElement('div')
    div.className = class_name;

    if( target ) {
        target[method](div)
    }

    return div;
}

export function wrap_div(el, class_name = ''){
    const wrap = create_div(class_name);
    el.after(wrap)
    wrap.append(el)
    return wrap;
}

export function get_el(element, multiple = false, parent = document) {
	if ( typeof element === 'string' ) {
		if (multiple) {
			return parent.querySelectorAll(element);
		} else {
			return parent.querySelector(element);
		}
	}
	return element;
}

// export function is_intersecting(rect1, rect2){
//     return (
//         rect1.x < rect2.x + rect2.width &&
//         rect1.x + rect1.width > rect2.x &&
//         rect1.y < rect2.y + rect2.height &&
//         rect1.y + rect1.height > rect2.y
//     );
// }

export function is_intersecting(box1, box2){
    if( box1.bottom < box2.top ) return false;
    if( box1.top > box2.bottom ) return false;
    return true;
}