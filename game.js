import { Label } from "./Label.js";
import { Sprite } from "./Sprite.js";
import { Card } from "./Card.js";
import { Node } from "./Node.js";
import { Button } from "./button.js";

let array =
    ["./img/0.jpg",
        "./img/0.jpg",
        "./img/1.jpg",
        "./img/1.jpg",
        "./img/2.jpg",
        "./img/2.jpg",
        "./img/3.jpg",
        "./img/3.jpg",
        "./img/4.jpg",
        "./img/4.jpg",
        "./img/5.jpg",
        "./img/5.jpg",
        "./img/6.jpg",
        "./img/6.jpg",
        "./img/7.jpg",
        "./img/7.jpg",
        "./img/8.jpg",
        "./img/8.jpg",
        "./img/9.jpg",
        "./img/9.jpg"];
function shuffle() {
    let array =
        ["./img/0.jpg",
            "./img/1.jpg",
            "./img/2.jpg",
            "./img/3.jpg",
            "./img/4.jpg",
            "./img/5.jpg",
            "./img/6.jpg",
            "./img/7.jpg",
            "./img/8.jpg",
            "./img/9.jpg",
            "./img/0.jpg",
            "./img/1.jpg",
            "./img/2.jpg",
            "./img/3.jpg",
            "./img/4.jpg",
            "./img/5.jpg",
            "./img/6.jpg",
            "./img/7.jpg",
            "./img/8.jpg",
            "./img/9.jpg"];
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export class Game extends Node {
    constructor() {
        super();
        this.canClick = true;
        this.listCard = [];
        this.score = 2000;
        this._score = null;
        this._btn = null;
        this.completed = [];
        this.temp = [];
        this.tempIndex = [];
    }
    createWrap(color) {
        this.view = document.createElement("div");
        document.body.appendChild(this.view);
        this.view.style.position = "absolute";
        this.view.style.backgroundColor = color;
        this.view.style.width = "510px";
        this.view.style.height = "410px";
        this.x = 340;
        this.y = 190;
        return this;
    }

    createLabelScore(score) {
        this._score = new Label("Score: " + score);
        document.body.appendChild(this._score.view);
        this._score.view.style.height = "70px";
        this._score.view.style.width = "300px";
        this._score.view.style.backgroundColor = "lightskyblue";
        this._score.view.style.top = "120px";
        this._score.view.style.left = "340px";
        this._score.view.style.borderRadius = "500px 500px 100px 100px";
        this._score.view.style.justifyContent = "center";
        this._score.view.style.alignItems = "center";
        this._score.view.style.display = "flex";

    }

    createTableCards() {
        const column = 5;
        let arr = [];
        const row = 4;
        let imgIndex
        //imgIndex = shuffle();
        imgIndex = array;
        let index = -1;
        let score = 5000;




        let div = this.createWrap("wheat");

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                ++index;
                let card = new Card(imgIndex[index], index + 1)
                card.createImg();
                card.createCover();
                card.createLabel();

                this.view.appendChild(card.view);
                let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
                card.x = 210;
                card.y = 160;
                tl.delay(0.1 * index)
                // tl.to(card, { duration: 2.5, ease: CustomEase.create("custom", "M0,0 C0.762,-0.47 0.358,0.822 0.642,1.03 0.69,1.065 0.988,1.198 1,1 "), y: - 500 });
                //tl.to(card, { x: 10 + 100 * j, y: 10 + 100 * i }, 1);
                tl.to(card, { duration: 4, ease: "elastic.out(1.5, 0.5)", x: 10 + 100 * j, y: 10 + 100 * i });
                card.view.addEventListener("mousedown", this.onClickCard.bind(this, card));
            }
        };
        this.createLabelScore(this.score);
        this._score.string = "Score: " + score;
        //div.style.display = "none";
    }
    onClickCard(card) {
        if (this.canClick) {
            card.children[2].hideLabel();
            card.hideCover();
            this.tempIndex.push(card.children[2].string);
            this.listCard.push(card);
            this.temp.push(card.path);
            if (this.tempIndex.length == 2) {
                this.canClick = false;
                if (this.tempIndex[0] === this.tempIndex[1]) {
                    // this.canClick = false
                    setTimeout(() => {
                        this.listCard[1].wrongCard();
                        this.listCard = [];
                        this.temp.length = [];
                        this.canClick = true;
                    }, 1500)
                } else {
                    if (this.temp.length >= 2 && this.listCard.length >= 2) {
                        this.canClick = false;
                        if (this.temp[0] === this.temp[1]) {
                            this.completed.push(this.listCard[0]);
                            this.completed.push(this.listCard[1]);
                            this.score += 1000;
                            this._score.string = "Score: " + this.score;
                            setTimeout(() => {
                                this.listCard[0].trueCard();
                                this.listCard[1].trueCard();
                                this.listCard = [];
                                this.temp.length = [];
                                this.canClick = true
                            }, 1000)

                        } else {
                            this.score -= 500;
                            this._score.string = "Score: " + this.score;
                            setTimeout(() => {
                                this.listCard[0].wrongCard();
                                this.listCard[1].wrongCard();
                                this.listCard = [];
                                this.temp.length = [];
                                this.canClick = true
                            }, 1000)
                        }
                        if (this.score <= 0) {
                            setTimeout(() => {
                                alert("Game Over")
                            }, 2000)
                        }
                        if (this.completed.length == 20 && this.score != 0) {
                            setTimeout(() => {
                                alert("Congratuated, your score is: " + this.score);
                            }, 2700)
                        }
                    }
                }
                this.tempIndex = [];
            }
        }
    }
}
let game = new Game();
let playBtn = new Button("Play", 520, 610, "wheat");
let replayBtn = new Button("Replay", 410, 610, "lightskyblue");
let retryBtn = new Button("Retry", 610, 610, "yellowgreen");
document.body.appendChild(playBtn.view);
document.body.appendChild(replayBtn.view);
document.body.appendChild(retryBtn.view);
replayBtn.hideButton();
retryBtn.hideButton();
game.createWrap("black");
playBtn.view.addEventListener("click", function () {
    playBtn.hideButton();
    retryBtn.showButton();
    replayBtn.showButton();
    game.createTableCards();

})
