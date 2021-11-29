import { Game } from "./game.js";
import { Button } from "./button.js";
let array1 =
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

const game = new Game();
game.playBtn = new Button("Play", 600, 460, "wheat");
game.replayBtn = new Button("Replay", 520, 520, "#fce96a");
game.retryBtn = new Button("Retry", 520, 480, "yellowgreen");
document.body.appendChild(game.gameTitle.view);
document.body.appendChild(game.playBtn.view);
document.body.appendChild(game.replayBtn.view);
document.body.appendChild(game.retryBtn.view);
game.replayBtn.hideButton();
game.retryBtn.hideButton();
game.createWrap("black", "flex", "url('./img/background.jpeg')");
game.playBtn.view.addEventListener("click", function () {
    // game.createTableCards(game.shuffle());
    game.createTableCards(array1);
    game.gameTitle.hideLabel();
})
game.retryBtn.view.addEventListener("click", function () {
    game.createTableCards(game.retryArray);
    game.overLabel.hideLabel();
})
game.replayBtn.view.addEventListener("click", function () {
    game.createTableCards(game.shuffle());
    game.overLabel.hideLabel();
})