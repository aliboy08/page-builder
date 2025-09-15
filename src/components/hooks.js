export default class Hooks {

    constructor(action_names = []){

        this.actions = {};
        this.filters = {};
        this.queue = {};
        
        action_names.forEach(action_name=>{
            this.actions[action_name] = {};
        })
    }
    
    add(action_name, fn, priority = 10){
        
        if( typeof fn !== 'function' ) return;

        if( !this.actions[action_name] ) {
            this.actions[action_name] = {};
        }

        if( typeof this.actions[action_name][priority] === 'undefined' ) {
            this.actions[action_name][priority] = [];
        }

        this.actions[action_name][priority].push(fn);
    }

    do(action_name, args){

        if( !this.actions[action_name] ) return;
        
        for( const priority in this.actions[action_name] ) {
            this.actions[action_name][priority].forEach(action=>{
                action(args)
            })
        }
        
    }

    add_queue(action_name, fn){

        const queue = this.queue[action_name];
        if( queue?.run ) {
            return fn(queue.args);
        }

        if( !this.queue[action_name] ) {
            this.queue[action_name] = {
                actions: []
            }
        }
        
        this.queue[action_name].actions.push(fn)
    }

    do_queue(action_name, args){
        
        if( !this.queue[action_name] ) {
            this.queue[action_name] = {
                actions: [],
            }
        }
        
        this.queue[action_name].run = true;
        this.queue[action_name].args = args;

        if( this.queue[action_name].actions?.length ) {
            this.queue[action_name].actions.forEach(fn=>fn(args))
            this.queue[action_name].actions = [];
        }
    }

    add_action(action_name){
        this.actions[action_name] = {};
    }

    add_filter(filter_name, fn, priority = 10){
        
        if( !this.filters[filter_name] ) {
            this.filters[filter_name] = {};
        }

        priority = to_string(priority)

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
            if( !this.actions[key] ) return;
            this.actions[key] = [];
            return;
        }
        
        // clear all
        for( const key in this.actions ) {
            this.actions[key] = [];
        }
    }

}