var numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var containerBox = document.createElement("div");

document.body.appendChild(containerBox);
containerBox.style.height = "500px";
containerBox.style.width = "600px";
containerBox.style.top = "40px";
containerBox.style.left = "50px";
containerBox.style.backgroundColor = "black";
containerBox.style.display = "flex";
containerBox.style.flexWrap = "wrap";
//-----------------------------------------------------------

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function newBox(numb, flagNumb) {
  var card = document.createElement("div");
  card.id = flagNumb;
  containerBox.appendChild(card);
  card.style.width = "100px";
  card.style.height = "100px";
  card.style.backgroundColor = "orange";
  card.style.margin = "10px";
  let is_Click = false;

  var numLabel = document.createElement("div");
  card.appendChild(numLabel);
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.style.flexDirection = "column";
  card.style.textAlign = "center";
  numLabel.innerHTML = String(numb);
  numLabel.style.fontSize = "30px";

  card.addEventListener('mousedown', function () {
    card.style.backgroundImage = "url('./img/" + flagNumb + ".jpg')";
    card.style.backgroundSize = "contain";
    numLabel.style.color = "transparent";
    //is_Click = true;
  })
  return card;
}

function mouseClick(box1, box2) {
  if (box1.id == box2.id) return true
  else return false;
}

const cards = [];
let temp1 = shuffle(numArr);
for (let i = 0; i < 20; i++) {
  var card = newBox(i, temp1[i])
  cards.push(card);
}

function getID(box) {
  var idbox = box.id;
  return idbox;
}

function isClick(object)
{
    object.onclick = function(){
        object.is_Click = true;
        return object.is_Click
    }
}

function isGameOver(score)
{
    if(score <= 9000) alert("Game over");
}
function createBox(number) {
  let arrTemp = [];
  let selected = [];
  let score = 10000;

  for (let i = 0; i < number; i++) {
    arrTemp[i] = cards[i];
    cards[i].addEventListener("click", function () {
      getID(arrTemp[i]);
      selected.push(arrTemp[i]);
      if(selected.length == 2){
        isTouch = isMatched(selected[0].id, selected[1].id);
        if(isTouch == true) score += 1000;
        else score -=500;
        isGameOver(score);
        console.log(selected[0].id + "   " + selected[1].id);
        console.log(score);
      }

      if (selected.length > 2) selected = [arrTemp[i]];
      console.log(selected);
    })
    
  }
}

function isMatched(id_a, id_b) {
  if (id_a == id_b) return true;
  else return false;
}
createBox(20);
