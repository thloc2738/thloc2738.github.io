import { Label } from "./Label.js";
import { Sprite } from "./Sprite.js";
import { Card } from "./Card.js";
import { Node } from "./Node.js";
import { Button } from "./button.js";



export class Game extends Node {
    constructor() {
        super();
        this.canClick = true;
        this.listCard = [];
        this.score = null;
        this._score = null;
        this._btn = null;
        this.completed = [];
        this.temp = [];
        this.tempIndex = [];
        this.playBtn = null;
        this.retryBtn = null;
        this.replayBtn = null;
        this.gameArray = [];
        this.retryArray = [];
        this._backgroundMusic = new Audio("./audio/spirited_away.mp3")
        this.clickAudio = new Audio("./audio/click.wav");
        this.matchAudio = new Audio("./audio/match.mp3");
        this.notMatchAudio = new Audio("./audio/pierrot_momimomi.mp3")
        this.overLabel = null;
        this.gameTitle = new Label("Truc Xanh", "mediumseagreen");
        this.gameTitle.x = 590;
        this.gameTitle.y = 360;
    }
    shuffle() {
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
    createWrap(color, show, path) {
        this.view = document.createElement("div");
        document.body.appendChild(this.view);
        this.view.style.position = "absolute";
        this.view.style.backgroundColor = color;
        this.view.style.width = "510px";
        this.view.style.height = "410px";
        this.x = 340;
        this.y = 190;
        this.view.style.backgroundImage = path;
        this.view.style.backgroundSize = "contain";
        this.view.display = show;
        this.view.style.zIndex = "-1";
        return this;
    }

    createLabelScore(score, x, y) {
        this._score = new Label("Score: " + score, "black");
        document.body.appendChild(this._score.view);
        this._score.view.style.height = "70px";
        this._score.view.style.width = "300px";
        this._score.view.style.backgroundColor = "lightskyblue";
        this._score.view.style.top = x + "px";
        this._score.view.style.left = y + "px";
        this._score.view.style.borderRadius = "500px 500px 100px 100px";
        this._score.view.style.justifyContent = "center";
        this._score.view.style.alignItems = "center";
        this._score.view.style.display = "flex";
    }

    createTableCards(array) {
        const column = 5;
        const row = 4;
        var music = this._backgroundMusic;
        music.play();
        music.loop = true;
        this.score = 5000;
        this.canClick = true;
        let index = -1;
        let div = this.createWrap("wheat", "flex", "none");
        this.retryBtn.hideButton();
        this.replayBtn.hideButton();
        this.completed = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                ++index;
                let card = new Card(array[index], index + 1)
                card.createImg();
                card.createCover();
                card.createLabel();
                this.view.appendChild(card.view);
                let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
                card.x = 210;
                card.y = 160;
                tl.delay(0.1 * index);
                tl.to(card, { duration: 2.5, ease: "elastic.out(1.5, 0.5)", x: 10 + 100 * j, y: 10 + 100 * i });
                setTimeout(() => {
                    card.view.addEventListener("mousedown", this.onClickCard.bind(this, card));
                }, 3000);
            }
        };
        this.createLabelScore(this.score, 120, 340);
        this._score.string = "Score: " + this.score;
        this.playBtn.hideButton();
        this.retryArray = array;
    }

    onClickCard(card) {
        this.clickAudio.play();
        if (this.canClick) {
            card.children[2].hideLabel();
            this.listCard.push(card);
            if (this.listCard.length == 2) {
                this.canClick = false;
                if (this.listCard[0].children[2].string === this.listCard[1].children[2].string) {
                    card.hideCover(false);
                    this.listCard.shift();
                    this.canClick = true;
                } else {
                    card.hideCover(true);
                    if (this.listCard.length >= 2) {
                        this.canClick = false;
                        if (this.listCard[0].path === this.listCard[1].path) {
                            this.completed.push(this.listCard[0]);
                            this.completed.push(this.listCard[1]);
                            this.score += 1000;
                            setTimeout(() => {
                                this.matchAudio.play();
                            }, 1000);
                            this.setMatched(true, this.score);
                        } else {
                            this.score -= 500;
                            this.setMatched(false, this.score);
                            setTimeout(() => {
                                this.notMatchAudio.play();
                            }, 1000);
                        }
                        if (this.score <= 0) {
                            this.displayDialog(2000, "Game Over", this.score, false);
                        }
                        if (this.completed.length == 20 && this.score != 0) {
                            this.displayDialog(2700, "Congratuated, your score is: ", this.score, true);
                        }
                    }
                }
            }
            else {
                card.hideCover(true);
            }
        }
    }

    displayDialog(time, message, score, isReplay) {
        setTimeout(() => {
            if (isReplay) {
                this.replayBtn.showButton();
                this.retryBtn.hideButton();
                this.createWrap("", "flex", "url('./img/winner.jpg')");
            } else {
                this.retryBtn.showButton();
                this.replayBtn.hideButton();
                this.createWrap("", "flex", "url('./img/gameover.jpeg')");

            }
            let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
            tl.to(this.view, { opacity: 0, duration: 0 })
            tl.to(this.view, { opacity: 1, duration: 1 })
            this.canClick = false;
            this.listCard = [];
            this.overLabel = new Label("Your score: " + score, "white");
            this.overLabel.x = 480;
            this.overLabel.y = 420;
            this.overLabel.view.position = "absolute";
            document.body.appendChild(this.overLabel.view);
        }, time)
    }

    setMatched(isMatch, score) {
        this._score.string = "Score: " + (score <= 0 ? 0 : score);
        setTimeout(() => {
            if (isMatch) {
                this.listCard[0].trueCard();
                this.listCard[1].trueCard();
            } else {
                this.listCard[0].wrongCard();
                this.listCard[1].wrongCard();
            }
            this.listCard = [];
            this.canClick = true;
        }, 1000)
    }
}

