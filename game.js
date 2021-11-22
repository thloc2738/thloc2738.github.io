import { Cover } from "./Cover.js";
import { Label } from "./Label.js";


let randomizedImage = shuffle();
function shuffle() {
    let array = ["url('./img/0.jpg')",
        "url('./img/1.jpg')",
        "url('./img/2.jpg')",
        "url('./img/3.jpg')",
        "url('./img/4.jpg')",
        "url('./img/5.jpg')",
        "url('./img/6.jpg')",
        "url('./img/7.jpg')",
        "url('./img/8.jpg')",
        "url('./img/9.jpg')",
        "url('./img/0.jpg')",
        "url('./img/1.jpg')",
        "url('./img/2.jpg')",
        "url('./img/3.jpg')",
        "url('./img/4.jpg')",
        "url('./img/5.jpg')",
        "url('./img/6.jpg')",
        "url('./img/7.jpg')",
        "url('./img/8.jpg')",
        "url('./img/9.jpg')"];
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


let index = 0;
let cardArray = [];
let image = null;

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
        index++;
        createCover(i, j, index);
    }
}

let countClick = 0;
function createCover(i, j, index) {
    let cover = new Cover(randomizedImage[index - 1]);
    document.body.appendChild(cover.view);
    cardArray.push(cover);
    addLabel(index, cover);
    cover.x = 90 * j;
    cover.y = 90 * i;
    let _onClick = onClickFunction.bind(cover, index);
    cover.view.addEventListener("click", _onClick);
}

function createScore(_score) {
    let score = new Cover(1, 1);
    document.body.appendChild(score.view);
    score.x = 0;
    score.y = 400;
    score.view.style.height = "100px";
    score.view.style.width = "300px";
    addLabel("Score: " + _score, score);

}
let click = true;
let _score = 10000;
let temp = [];
let tempIndex = [];
function onClickFunction(index) {
    if (click) {
        this.open();
        this.children[0].open();
        temp.push(this);
        tempIndex.push(index);
        if (temp.length === 2) {
            click = false;
            if (tempIndex[0] !== tempIndex[1]) {
                if (temp[0].image === temp[1].image) {
                    setTimeout(function () {
                        temp[0].delete();
                        temp[1].delete();
                        temp = [];
                        tempIndex = [];
                        console.log("matched");
                        _score += 1000;
                        createScore(_score);
                        click = true;
                    }, 1500);

                }
                else if (temp[0].image !== temp[1].image) {
                    setTimeout(function () {
                        temp[0].close();
                        temp[1].close();
                        temp[0].children[0].close(tempIndex[0]);
                        temp[1].children[0].close(tempIndex[1]);
                        tempIndex = [];
                        temp = [];
                        console.log("not matched");
                        _score -= 500;
                        createScore(_score);
                        click = true;
                    }, 1500);

                }
            }
            else {
                setTimeout(function () {
                    temp[0].close();
                    temp[1].close();
                    temp[0].children[0].close(tempIndex[0]);
                    temp[1].children[0].close(tempIndex[1]);
                    tempIndex = [];
                    temp = [];
                    console.log("same card");
                    click = true;
                }, 1500);

            }
        }
        if (_score <= 9000) {
            alert("Game Over");
            for (let i = 0; i < 20; i++) {
                cardArray[i].delete();
                click = false;
            }
        }
    }
}
createScore(_score);
function addLabel(index, cover) {
    let label = new Label(index);
    cover.addChild(label);
}
console.log(cardArray);
