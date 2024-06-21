let numberDisplay = document.querySelector('#numberDisplay');
var numbersForUser = [1, 2, 4, 5, 6, 7, 8, 9, 10];

var numbersTTS = new SpeechSynthesisUtterance();

const numGameScore = document.querySelector('#numGameScore');

const numbersListenButton = document.querySelector('#numbersListenButton');
const numbersNextButton = document.querySelector('#numbersNextButton');

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

const diagnostic = document.querySelector('#diagnosticNumbers');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');

var score = 0;

//listen button
numbersListenButton.onclick = () => {
  recognition.start();
  console.log('Ready to receive a command.');
};

//next button
numbersNextButton.onclick= () => {
  document.body.style.backgroundColor = "white";
  numberDisplay.textContent = numbersForUser[Math.floor(Math.random() * numbersForUser.length)];
}

//on result
recognition.onresult = (event) => {
  const number = event.results[0][0].transcript;
  diagnostic.textContent = `I heard: ${number}.`;
  console.log(`Confidence: ${event.results[0][0].confidence}`);
  if(number === numberDisplay.textContent){
    score += 1;
    document.body.style.backgroundColor = "green";
    numbersTTS.text = "correct! good job";
  }
  else{
    document.body.style.backgroundColor = "red";
    numbersTTS.text = (diagnostic.textContent + ". Incorrect.");
  }
  numGameScore.textContent = `Score: ${score}`;
  window.speechSynthesis.speak(numbersTTS);
  // checkIfCorrect();
};

recognition.onspeechend = () => {
  recognition.stop();
}

recognition.onnomatch = () => {
  numbersDiagnostic.textContent = "I didn't recognize that command.";
}

recognition.onerror = (event) => {
  diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
}

// function checkIfCorrect(){
//   if(diagnostic.textContent === numberDisplay.textContent){
//   document.body.style.backgroundColor = "green";
//   }
//   else{
//       document.body.style.backgroundColor = "red";
//   }
// }
