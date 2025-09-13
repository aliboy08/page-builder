const events = {

};

export const global_events = {

    on: (event_name, args)=>{


    },

    do: (event_name, args)=>{

    }

}

export function init(id){
    if( modules.includes(id) ) return;
    modules.push(id)
    run_queue(id);
}

export function on_init(id, fn){
    
    if( modules.includes(id) ) {
        return fn();
    }

    if( !queue[id] ) {
        queue[id] = []
    }

    queue[id].push(fn)
}

function run_queue(id){
    if( !queue[id] ) return;
    queue[id].forEach(fn=>fn())
    queue[id] = [];
}
