export function lerp(start, end, amount) {
    return start + (end - start) * amount;
}

export function easing1(x){
    return 1 - Math.pow(1 - x, 5);
}

export function create_div(selector = '', target, text = '', method = 'append'){
    
    const div = document.createElement('div')
    
    if( selector ) {
        if( selector[0] === '#' ) {
            div.id = selector.slice(1, selector.length);
        } else {
            div.className = selector;
        }
    }
    
    if( text ) {
        div.textContent = text;
    }

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

export function get_pos(element) {

    if (!element.getClientRects().length) {
        return { top: 0, left: 0 };
    }

    const rect = element.getBoundingClientRect();
    const win = element.ownerDocument.defaultView;

    const top = rect.top + win.pageYOffset;
    const left = rect.left + win.pageXOffset;
    const bottom = top + rect.height;
    const right = left + rect.width;

    return ({ top, left, right, bottom });   
}

export function dispatch(event_name, data = {}, element = document){
    const event = new Event(event_name)
    event.data = data;
    element.dispatchEvent(event);
}

export function outside_click_handler(el, on_outside_click){

    const click_handler = (e)=>{
        if( !is_child(e.target, el) ) {
            on_outside_click();
            end();
        }
    }

    const start = ()=>{
        setTimeout(()=>{
            document.addEventListener('click', click_handler)
        }, 100);
    }

    const end = ()=>{
        document.removeEventListener('click', click_handler)
    }

    return { start, end }
}

export function is_child_of(target, parent){

    if( target.nodeName === 'BODY' ) return false;

    if( target == parent || target.parentElement == parent ) {
        return true;
    }
    
    return is_child_of(target.parentElement, parent);
}

export function generate_id(length=10){
    const characters = '1234567890abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for( let i = 1; i <= length; i++ ) {
        const index = Math.floor(Math.random() * characters.length);
        result += characters[index];
    }
    return result;
}

export function ucfirst(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}