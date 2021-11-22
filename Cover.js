import { Node } from "./Node.js";
export class Cover extends Node {
    constructor(image, index) {
        super();
        this.image = image;
        this.index = index;
        this.isDeleted = false;
        this.isClick = false;
        this.view.style.backgroundColor = "orange";
        this.view.style.width = "88px";
        this.view.style.height = "88px";
        this.view.style.border = "2px solid black";
        this.view.style.display = "flex";
        this.view.style.alignItems = "center";
        this.view.style.justifyContent = "center";
    }


    open() {
        if (!this.isDeleted) {
            this.view.style.backgroundImage = this.image;
            this.view.style.backgroundSize = "contain";
            // this.view.style.backgroundColor = "red";

        }
    }
    close() {
        if (!this.isDeleted) {
            this.view.style.backgroundColor = "orange";
            this.view.style.backgroundImage = "none";
        }
    }
    delete() {
        this.view.style.backgroundColor = "black";
        this.view.style.backgroundImage = "none";
        this.isDeleted = true;
    }
}