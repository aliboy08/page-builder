export default class Hooks {

    constructor(action_keys){

        this.action_keys = action_keys;
        this.actions = {};
        this.filters = {};
        
        action_keys.forEach(action_key=>{
            this.actions[action_key] = [];
        })
    }
    
    add(action_name, fn, priority = 10){

        if( !this.actions[action_name] ) return;
        if( typeof fn !== 'function' ) return;

        if( typeof this.actions[action_name][priority] === 'undefined' ) {
            this.actions[action_name][priority] = [];
        }

        this.actions[action_name][priority].push(fn);
    }

    do(action_name, args){

        if( !this.actions[action_name] ) return;

        this.actions[action_name].forEach(priority=>{
            priority.forEach(action=>action(args));
        });
    }

    add_action(action_name){
        this.actions[action_name] = [];
    }

    add_filter(filter_name, fn, priority = 10){

        if( !this.filters[filter_name] ) {
            this.filters[filter_name] = {};
        }

        if( !this.filters[filter_name][priority] ) {
            this.filters[filter_name][priority] = [];
        }
        
        this.filters[filter_name][priority].push(fn);
    }

    apply_filters(filter_name, value, args){

        if( !this.filters[filter_name] ) return value;

        for( const priority in this.filters[filter_name] ) {
            for( const fn of this.filters[filter_name][priority] ) {
                value = fn(value, args)
            }
        }
        return value;
    }

    clear(key){
        if( key ) {
            if( !this.actions[action_key] ) return;
            this.actions[action_key] = [];
        } else {
            // clear all
            this.action_keys.forEach(action_key=>{
                this.actions[action_key] = [];
            })
        }
    }

}