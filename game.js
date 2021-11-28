import { Label } from "./Label.js";
import { Sprite } from "./Sprite.js";
import { Card } from "./Card.js";
import { Node } from "./Node.js";
import { Button } from "./button.js";
let array23 =
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

let array123 =
    ["./img/0.jpg",
        "./img/1.jpg",
        "./img/1.jpg",
        "./img/0.jpg",
        "./img/2.jpg",
        "./img/3.jpg",
        "./img/3.jpg",
        "./img/2.jpg",
        "./img/4.jpg",
        "./img/5.jpg",
        "./img/5.jpg",
        "./img/4.jpg",
        "./img/6.jpg",
        "./img/7.jpg",
        "./img/7.jpg",
        "./img/6.jpg",
        "./img/8.jpg",
        "./img/9.jpg",
        "./img/9.jpg",
        "./img/8.jpg"];
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
        this.playBtn = null;
        this.retryBtn = null;
        this.replayBtn = null;
        this.gameArray = [];
        this.retryArray = [];
        this.addScore = null;
        this.minusScore = null;
        this._backgroundMusic = new Audio("./audio/spirited_away.mp3")
        this.clickAudio = new Audio("./audio/click.wav");
        this.matchAudio = new Audio("./audio/match.mp3");
        this.notMatchAudio = new Audio("./audio/pierrot_momimomi.mp3")
    }
    set backgroundMusic(value){
        this._backgroundMusic = value;
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

    createLabelScore(score,x,y) {
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

    createAddScore(color, scoreText, add_minusScore){
        add_minusScore = new Label(scoreText, color);
        document.body.appendChild(add_minusScore.view);
        add_minusScore.view.style.height = "70px";
        add_minusScore.view.style.width = "100px";
        add_minusScore.view.style.top = "120px";
        add_minusScore.view.style.left ="645px";
        add_minusScore.view.style.justifyContent = "center";
        add_minusScore.view.style.alignItems = "center";
        add_minusScore.view.style.display = "flex";
        return add_minusScore;
    }

    createTableCards(array) {
        const column = 5;
        const row = 4;
        let music = this._backgroundMusic;
        music.play();
        music.loop = true;
        this.score = 2000;
        this.canClick = true;   
        let index = -1;
        let div = this.createWrap("wheat");
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
                tl.to(card, { duration: 5, ease: "elastic.out(1.5, 0.5)", x: 10 + 100 * j, y: 10 + 100 * i });
                setTimeout(() => {
                    card.view.addEventListener("mousedown", this.onClickCard.bind(this, card));
                }, 3000);  
            }
        };
        this.createLabelScore(this.score,120,340);
        this.addScore = this.createAddScore("green","+1000", this.addScore);
        this.minusScore = this.createAddScore("red","-500", this.minusScore);
        this.addScore.hideLabel();
        this.minusScore.hideLabel();

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
                            this.addScore.showLabel();
                            setTimeout(() => {
                                this.matchAudio.play();
                            }, 1000);
                            setTimeout(() => {
                                this.addScore.hideLabel();
                            }, 2000);
                            this.setMatched(true, this.score);
                           
                        } else {
                            this.score -= 500;
                            this.setMatched(false, this.score);
                            this.minusScore.showLabel();
                            setTimeout(() => {
                                this.notMatchAudio.play();
                            },1000);
                           setTimeout(() => {
                            this.minusScore.hideLabel();
                           }, 2000);
                           
                        }
                        if (this.score <= 0) {
                            this.displayDialog(2000, "Game Over", "", false)
                        }
                        if (this.completed.length == 20 && this.score != 0) {
                            this.displayDialog(2700, "Congratuated, your score is: ", this.score, true)
                        }
                    }
                }
            }
            else{
                card.hideCover(true);
            }
        }
    }

    displayDialog(time, message, score, isReplay){
        setTimeout(() => {
            if(isReplay){
                this.replayBtn.showButton();
                this.retryBtn.hideButton();
            }else{
                this.retryBtn.showButton();
                this.replayBtn.hideButton();
            }
            alert(message + score)
            this.canClick = false;
            this.listCard = [];
        }, time)
    }

setMatched(isMatch, score){
    this._score.string = "Score: " + (score <= 0 ? 0 : score);
        setTimeout(() => {
            if(isMatch){
                this.listCard[0].trueCard();
                this.listCard[1].trueCard();
            }else{
                this.listCard[0].wrongCard();
                this.listCard[1].wrongCard();
            }
            this.listCard = [];
            this.canClick = true;
        }, 1000)
        
    }
}

let game = new Game();
game.playBtn = new Button("Play", 520, 610, "wheat");
game.replayBtn = new Button("Replay", 520, 610, "lightskyblue");
game.retryBtn = new Button("Retry", 520, 610, "yellowgreen");
document.body.appendChild(game.playBtn.view);
document.body.appendChild(game.replayBtn.view);
document.body.appendChild(game.retryBtn.view);
game.replayBtn.hideButton();
game.retryBtn.hideButton();
game.createWrap("black");
game.playBtn.view.addEventListener("click", function () {
    game.createTableCards(array23);
})
game.retryBtn.view.addEventListener("click",function(){
    game.createTableCards(game.retryArray);
})
game.replayBtn.view.addEventListener("click", function(){
    game.createTableCards(shuffle());
})