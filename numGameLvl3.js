const num1Display = document.querySelector('#num1Display');
const operationDisplay = document.querySelector('#operationDisplay');
const num2Display = document.querySelector('#num2Display');

const numLvl3Score = document.querySelector('#numLvl3Score');
var score = 0;

const multiplicationButton = document.querySelector('#multiplicationButton');
const divisionButton = document.querySelector('#divisionButton');

var equationsTTS = new SpeechSynthesisUtterance();

var numsForUser = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const numListenButon = document.querySelector('#numListenButon');
const equationsNext = document.querySelector('#equationsNext');

//Speech recognition
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const grammar = `#JSGF V1.0; grammar numbers; public <number> = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;`

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector('#diagnosticNum');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');
//multiplicationButton

var operation = " * ";

multiplicationButton.onclick = () => {
  operation = " * ";
}

//Subtraction button
divisionButton.onclick = () => {
  operation = ' / ';
}

//listen button
numListenButon.onclick = () => {

  //Random number picked when speak button pressed
  recognition.start();
  console.log('Ready to receive a command.');
};
var num1 = 0;
var num2 = 0;
var answer = 0;
//next button
equationsNext.onclick = () => {
  document.body.style.backgroundColor = "white";
  num1 = numsForUser[Math.floor(Math.random() * numsForUser.length)];
  num2 = numsForUser[Math.floor(Math.random() * numsForUser.length)];


  operationDisplay.textContent = operation;

  if (operation === " * ") {
     
    
      
    
    answer = num1 * num2;
  }

  if (operation === " / "){
    while((num1 % num2) != 0){
      num1 = numsForUser[Math.floor(Math.random() * numsForUser.length)];
      num2 = numsForUser[Math.floor(Math.random() * numsForUser.length)];
    }
    answer = num1 / num2;
  }
  num1Display.textContent = num1;

  num2Display.textContent = num2;
}

//On result
recognition.onresult = (event) => {
  const number = event.results[0][0].transcript;
  diagnostic.textContent = `${number}`;
  console.log(`Confidence: ${event.results[0][0].confidence}`);

  if(operation === " * "){
    console.log(num1, num2);
    console.log(number);
    console.log(answer);
    if(parseInt(number) === answer){
      document.body.style.backgroundColor = "green";
      score += 1;
      equationsTTS.text = "Correct! Nice work!";
    }
      
    else{
      document.body.style.backgroundColor = "red";
      equationsTTS.text = `Incorrect, the right answer is ${answer}. Try again`;
    }
  }

  if(operation === " / "){
  console.log(num1, num2);
  console.log(number);
  console.log(answer);
    if(parseInt(number) === answer){
      document.body.style.backgroundColor = "green";
      score += 1;
      equationsTTS.text = "Correct! Nice work!";
    }
    else{
      document.body.style.backgroundColor = "red";
      equationsTTS.text = `Incorrect, the right answer is ${answer}. Try again`;
    }
  }
  numLvl3Score.textContent = `Score: ${score}`;
  window.speechSynthesis.speak(equationsTTS);

}

recognition.onspeechend = () => {
  recognition.stop();
}

recognition.onnomatch = () => {
  numbersDiagnostic.textContent = "I didn't recognize that command.";
}

recognition.onerror = (event) => {
  diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
}

