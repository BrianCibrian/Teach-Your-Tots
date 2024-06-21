const sentencesListenButon = document.querySelector('#sentencesListenButon');
const sentenceDisplay = document.querySelector('#sentenceDisplay');
const sentencesNext = document.querySelector('#sentencesNext');

const lvl3Score = document.querySelector('#lvl3Score');
var score = 0;

var lvl3TTS = new SpeechSynthesisUtterance();

var nouns = ['cat', 'dog', 'elephant', 'giraffe', 'horse', 'lion', 'mouse', 'owl', 'zebra'];
var adjectives = ['silly', 'cool', 'funny', 'big', 'small', 'large', 'little', 'purple'];
var verbs = ['ran', 'swam', 'danced', 'saw', 'walked', 'laughed', 'ate', 'drank', 'spoke', 'cried', 'talked', 'cooked'];
let timer = 1;
//Displays
const theDisplay = document.querySelector('#theDisplay');
const adjDisplay = document.querySelector('#adjDisplay');
const nounDisplay = document.querySelector('#nounDisplay');
const verbDisplay = document.querySelector('#verbDisplay');

//Speech recognition
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const grammar = `#JSGF V1.0; grammar sentence; public <sentence> = the | cat | dog | elephant | giraffe | horse | lion | mouse | owl | zebra | silly | cool | funny | big | small | large | little | purple | ran | swam | danced | saw | walked | laughed | ate | drank | spoke | cried | talked | cooked;`

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const sentenceDiagnostic = document.querySelector('#diagnosticsentence');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');

var noun;
var verb;
var adjective;

sentencesListenButon.onclick = () => {

  recognition.start();
  console.log('Ready to receive a command.');
};

//next button
sentencesNext.onclick = () => {
  document.body.style.backgroundColor = "white";
  theDisplay.textContent = "The ";
  adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  noun = nouns[Math.floor(Math.random() * nouns.length)];
  verb = verbs[Math.floor(Math.random() * verbs.length)];

  adjDisplay.textContent = adjective;
  nounDisplay.textContent = noun;
  verbDisplay.textContent = `${verb}.`;

}

recognition.onresult = (event) => {
  const sentence = event.results[0][0].transcript;
  var displayWordsTogether = (`The ${adjective} ${noun} ${verb}`);
  sentenceDiagnostic.textContent = `I heard: ${sentence}`;
  
  console.log(`Confidence: ${event.results[0][0].confidence}`);
  // checkIfCorrect()
  console.log(displayWordsTogether);
  
  if (sentence.toUpperCase() === displayWordsTogether.toUpperCase()) {
    document.body.style.backgroundColor = "green";
    score += 1;
    lvl3TTS.text = "Correct! Nice work!";
  }
  else{
  document.body.style.backgroundColor = "red";
    lvl3TTS.text = (sentenceDiagnostic.textContent + ". Incorrect");
  }
  lvl3Score.textContent = `Score: ${score}`;
  window.speechSynthesis.speak(lvl3TTS);
}

recognition.onspeechend = () => {
  recognition.stop();
}

recognition.onnomatch = () => {
  sentenceDiagnostic.textContent = "I didn't recognize that command.";
}

recognition.onerror = (event) => {
  sentenceDiagnostic.textContent = `Error occurred in recognition: ${event.error}`;
}
