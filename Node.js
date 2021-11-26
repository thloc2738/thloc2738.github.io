export class Node {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        //this._active = true;
        this.children = [];
        this.initView();
        this.view.style.position = "absolute";
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.view.style.left = this._x + 'px';
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.view.style.top = this._y + 'px';
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.view.style.height = this._height + "px";
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this.view.style.width = this._width + "px";
    }
    initView() {
        this.view = document.createElement('div');
    }

    on(event, listener) {
        this.view.addEventListener(event, listener)
    }

    addChild(node) {
        this.children.push(node);
        this.view.appendChild(node.view);
    }
}