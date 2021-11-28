//0: cover 1: img 2: label
import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";
import { Label } from "./Label.js";
export class Card extends Node {
    constructor(path, index) {
        super();
        this._path = path;
        this.string = index;
        this._card;
        this._img;
        this._label;
        this.active = true;
        this._isDelete = false;
    }
    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
        this.view.src = this.path;
    }
    createCover() {
        this._card = new Sprite('./img/cover.jpg');
        this.addChild(this._card);
        this._card.active = true;
        this.view.style.width = "90px";
        this.view.style.height = "90px";
        this.view.style.justifyContent = "center";
        this.view.style.display = "flex";
        this.view.style.alignItems = "center";
        this.view.className = "card_" + this.string;
        console.log(this.view.className);
        this.view.style.cursor = "pointer";
        //this.view.style.backgroundColor = "wheat";
    }
    createImg() {
        this._img = new Sprite(this._path);
        this.addChild(this._img);
        this._img.width = 90;
        this._img.height = 90;
    }
    createLabel() {
        this._label = new Label(this.string);
        this.addChild(this._label);
        this._label.active = true;
    }
    showCover() {
        this._card.view.style.visibility = "visible";
    }
    hideCover(isVisible) {
        if(isVisible === true){
            this._card.view.style.visibility = "hidden";

            let tl = gsap.timeline({ repeat: 0, duration: 0 })
            tl.to(this.view, { scaleX: 0, duration: 0.5 })
            tl.to(this.view, { scaleX: 1, duration: 0.5 })
        }

    }

    // showImage() {
    //     this.view.style.visibility = "visible";
    // }

    get isDelete() {
        return this._isDelete;
    }
    set isDelete(value) {
        this._isDelete = value;
    }
    trueCard() {
        setTimeout(() => {
            this._card.view.style.display = "none";
            this._img.view.style.display = "none";
            this._label.view.style.display = "none";
            this.view.style.display = "none";

        }, 1500)

        let tl = gsap.timeline({ repeat: 0, duration: 0 })
        tl.to(this.view, { scale: 1.5, duration: 1 })
        tl.to(this.view, { scale: 0.5, duration: 1.5 })

    }
    wrongCard() {
        this._card.view.style.visibility = "visible";
        this._img.view.style.visibility = "visible";
        this._label.view.style.visibility = "visible";

        let tl = gsap.timeline({ repeat: 0, duration: 0 })
        tl.to(this.view, { scaleX: 0, duration: 0.5 })
        tl.to(this.view, { scaleX: 1, duration: 0.5 })

    }

}



// let card = new Card("./img/cover.jpg", 5);
// console.log(card);;
// document.body.appendChild(card.view);
// card.createCover();
// rotation(card.view.className, 500, 500, 100, 100)
// gsap.to(card, { rotation: 200, x: 500, y: 500, stagger: 0.5, duration: 1, });
//gsap.to(card, { rotation: 27, x: 500, duration: 1 });
// function rotation(nameClass, x1, y1, x2, y2) {
//     TweenMax.staggerTo(
//         "." + nameClass,
//         0,
//         {
//             x: 1,
//             y: 2,
//         },
//         0
//     );
//     TweenMax.staggerTo(
//         "." + nameClass,
//         5,
//         {
//             rotation: 360,
//             x: x2,
//             y: y2,
//             cycle: {
//                 x: [200, 200, 200, -20, -250, -250, -250],
//                 y: [-30, 85, 200, 185, 200, 85, -30],
//             },
//         },
//         100
//     );

// }

// let index = 0;

// for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 5; j++) {

//         index++;
//         let card = new Card("./img/cover.jpg", index)
//         card.createImg();
//         card.createCover();
//         card.createLabel();
//         document.body.appendChild(card.view);
//         let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
//         tl.delay(0.1 * index)
//         rotation(card.view.className, 0, 0, 100 + 100 * j, 200 + 100 * i)
//         // gsap.fromTo("." + card.view.className, 5, {
//         //     x: 50,
//         //     opacity: 0.5
//         // }, {
//         //     rotation: 360,
//         //     x: 100 + 100 * j,
//         //     y: 200 + 100 * i,
//         //     opacity: 1
//         // });
//     }
// };