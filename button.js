import { Node } from "./Node.js";
export class Button extends Node {

    constructor(string, x, y, color) {
        super();
        this._string = string || "";
        this.string = this._string;
        this.view.style.color = "black";
        this.view.style.fontSize = "40px";
        this.view.style.position = "absolute";
        this.width = 100;
        this.height = 50;
        this.view.style.left = x + "px";
        this.view.style.top = y + "px";
        this.view.style.width = "150px";
        this.view.style.height = "60px";
        this.view.style.backgroundColor = color;
        this.view.style.justifyContent = "center";
        this.view.style.display = "flex";
        this.view.style.alignItems = "center";
        this.view.style.borderRadius = "500% 500% 400% 400%";
        this.clickAudio = new Audio("./audio/click_Btn.wav")
        this.view.addEventListener("click", () => {
            this.clickAudio.play();
        })

    }

    get string() {
        return this._string;
    }

    set string(value) {
        this._string = value;
        this.view.innerHTML = this._string;
    }
    showButton() {
        this.view.style.visibility = "visible";
        this.view.style.display = "flex";

    }
    hideButton() {
        this.view.style.display = "none";
        this.view.style.visibility = "hidden";
    }
}