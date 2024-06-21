const alphabetListenButton = document.querySelector('#alphabetListenButon');
const alphabetNextButton = document.querySelector('#alphabetNextButton');
const letterDisplay = document.querySelector('#letterDisplay');

var alphTTS = new SpeechSynthesisUtterance();

const alphScore = document.querySelector('#alphScore');
var score = 0;

var lettersForUser = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//Speech recognition
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const grammar = `#JSGF V1.0; grammar numbers; public <letter> = A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z;`

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const alphabetDiagnostic = document.querySelector('#diagnosticAlphabet');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');

//listen button
alphabetListenButton.onclick = () => {
  recognition.start();
  console.log('Ready to receive a command.');
};

//next button
alphabetNextButton.onclick = () => {
  document.body.style.backgroundColor = "white";
  letterDisplay.textContent = lettersForUser[Math.floor(Math.random() * lettersForUser.length)];
}

recognition.onresult = (event) => {
  const letter = event.results[0][0].transcript;
  alphabetDiagnostic.textContent = `I heard: ${letter}.`;
  console.log(`Confidence: ${event.results[0][0].confidence}`);

  if (letter.toUpperCase() === letterDisplay.textContent) {
    document.body.style.backgroundColor = "green";
    score += 1;
    alphTTS.text = "Correct! Great job!";
  }
  else {
    document.body.style.backgroundColor = "red";
    alphTTS.text = (alphabetDiagnostic.textContent + ".. Incorrect.")
  }
  alphScore.textContent = `Score: ${score}`;
  window.speechSynthesis.speak(alphTTS);

  // checkIfCorrect();
}

recognition.onspeechend = () => {
  recognition.stop();
}

recognition.onnomatch = () => {
  alphabetDiagnostic.textContent = "I didn't recognize that command.";
}

recognition.onerror = (event) => {
  alphabetDiagnostic.textContent = `Error occurred in recognition: ${event.error}`;
}

// function checkIfCorrect(){
//   if(alphabetDiagnostic.textContent.toUpperCase() === letterDisplay.textContent.toUpperCase()){
//   document.body.style.backgroundColor = "green";
//   }

// }
