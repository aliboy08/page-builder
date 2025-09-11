export function button(text, container = null, onclick = null, selector = ''){
    const btn = document.createElement('button')
    btn.textContent = text;
    if( onclick ) btn.addEventListener('click', onclick)

    set_selector(btn, selector)

    if( container ) container.append(btn)
        
    return btn;
}

export function div(selector = '', container, text = '', method = 'append'){
    
    const div = document.createElement('div')
    
    set_selector(div, selector)
    
    if( text ) {
        div.textContent = text;
    }

    if( container ) {
        container[method](div)
    }

    return div;
}

export function input(container = null, name="", type="text", className){
    const input = document.createElement('input')
    input.name = name;
    input.type = type;
    if( className ) input.className = className;
    if( container ) container.append(input)
    return input;
}

export function wrap( target, selector = '') {

    const div = document.createElement('div')
    set_selector(div, selector)

    target.after(div)
    div.append(target)

    return div;
}

function set_selector(el, value){
    if( !value ) return;

    if( value[0] === '#' ) {
        el.id = value;
    } else {
        el.className = value;
    }
    
}