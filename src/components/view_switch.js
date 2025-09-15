export default class View_Switch {

    constructor(views, container) {
        this.container = container;
        this.views = views;
        this.current = views.main;
    }

    switch(view){
        this.current.style.display = 'none';
        this.current = this.views[view];
        this.current.style.display = '';
    }

    register(key, html){
        html.style.display = 'none';
        this.container.append(html)
        this.views[key] = html;
    }

}