let strtShapeGame = document.querySelector('#strtShapeGame');
const randomShapeButton = document.querySelector('#randomShapeButton')
let timer = 60;
let color;
const shapes = ['circle', 'square', 'oval', 'rectangle'];

const shapeNameTxt = document.querySelector('#shapeNameTxt');

var shapesTTS = new SpeechSynthesisUtterance();

var shape;

//Variables for score
var pointsPossible = 0;
var pointsReceived = 0;
var score = 0;
const pointsPossibleDis = document.querySelector('#pointsPossibleDis');
const pointsReceivedDis = document.querySelector('#pointsReceivedDis');
const shapesGameScore = document.querySelector('#shapesGameScore');

document.addEventListener("readystatechange", (event) => {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});

randomShapeButton.onclick = () => {
  clear();
  pointsPossible = 0;
  pointsReceived = 0;
  timer = 60;
  shape = shapes[Math.floor(Math.random() * shapes.length)];
  if (shape === 'circle') {
    fill('white');
    circle(500, 300, 250);
  }
  if (shape === 'square') {
    fill('white');
    square(375, 175, 250);
  }
  if (shape === 'oval') {
    fill('white');
    ellipse(500, 300, 225, 325);
  }
  if (shape === 'rectangle') {
    fill('white');
    rect(375, 150, 250, 350)
  }
  shapeNameTxt.textContent = shape;
  shapesTTS.text = `Color in the ${shape}`;
  window.speechSynthesis.speak(shapesTTS);

}

//When page is opened
function setup() {
  createCanvas(1000, 600);
  bg = loadImage('assets/moonwalk.jpg');
  color = 'white';
  fill('white');
  noLoop();
}

function draw() {
  loop();

  countDown();

  background(bg);
  fill('black');
  rect(20, 20, 60, 60);
  textAlign(600, -600);
  textSize(50);
  fill('white');
  text(timer, 23, 65);
  if (shape === 'circle') {
    fill(255, 0, 0, 0);
    stroke('black');
    circle(500, 300, 250);
  }
  if (shape === 'square') {
    fill(255, 0, 0, 0);
    stroke('black');
    square(375, 175, 250);
  }
  if (shape === 'oval') {
    fill(255, 0, 0, 0);
    stroke('black');
    ellipse(500, 300, 225, 325);
  }
  if (shape === 'rectangle') {
    fill(255, 0, 0, 0);
    stroke('black');
    rect(375, 150, 250, 350)
  }
}
// const canvas = document.querySelector('#defaultCanvas0');

// function drawCursor(){
//   push();
//   ellipse(mouseX, mouseY, 20, 20);
// }

// canvas.addEventListener("click", drawCursor);

//Countdown function
function countDown() {
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  //when timer reaches 0
  if (timer == 0) {
    fill('red')
    text("GAME OVER", 350, 325);
    //Display score
    score = Math.floor((pointsReceived / pointsPossible) * 10);
    shapesGameScore.textContent = `Score: ${score}`;
  }
};

//Draw function
function mouseDragged() {
  pointsPossible += 1;
  // Check if mouse is inside the circle
  if (shape === 'circle') {
    let d = dist(mouseX, mouseY, 500, 300);
    if (d < 125) {
      color = "green";
      pointsReceived += 1;
    }
    else {
      color = "red";
      pointsReceived -= 1;
    }
  }
  //Rectangle
  if (shape === 'rectangle') {
    if (mouseX >= 375 && mouseX <= 375 + 250 && mouseY >= 150 && mouseY <= 150 + 350) {
      color = "green";
      pointsReceived += 1;
    }
    else {
      color = "red";
      pointsReceived -= 1;
    }
  }
  //Square
  if (shape === 'square') {
    if (mouseX > 375 && mouseX < 625 && mouseY >= 175 && mouseY <= 425) {
      color = "green";
      pointsReceived += 1;
    }
    else {
      color = 'red';
      pointsReceived -= 1;
    }
  }
  //Oval
  if (shape === 'oval') {
    if (((((mouseX - 500) * (mouseX - 500)) / (112.5 * 112.5)) + (((mouseY - 300) * (mouseY - 300)) / (162.5 * 162.5))) <= 1) {
      color = 'green';
      pointsReceived += 1;
    }
    else {
      color = 'red';
      pointsReceived -= 1;
    }
  }
  fill(color);
  stroke(color);
  circle(mouseX, mouseY, 15);

};

