const wordsListenButton = document.querySelector('#wordsListenButon');
const wordDisplay = document.querySelector('#wordDisplay');
var wordsForUser = ['apple','ball', 'cat', 'dog', 'elephant', 'fan', 'giraffe', 'horse', 'ice', 'jar', 'kind', 'lion', 'mouse', 'nice', 'owl', 'purple', 'qatar', 'rice', 'slice', 'tower', 'unity', 'vice', 'water', 'xmas', 'yellow', 'zebra'];

const lvl2Score = document.querySelector('#lvl2Score');
var score = 0;

const wordsNext = document.querySelector('#wordsNext');

var lvl2TTS = new SpeechSynthesisUtterance();

//Speech recognition
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const words = ['Apple', '  Ball','Cat', 'Dog', 'Elephant', 'Fan', 'Giraffe', 'Horse', 'Ice', 'Jar', 'Kind', 'Lion', 'Mouse', 'Nice', 'Owl', 'Purple', 'Qatar', 'Rice', 'Slice', 'Tower', 'Unity', 'Vice', 'Water', 'Xmas', 'Yellow', 'Zebra', 'apple','ball','cat', 'dog', 'elephant', 'fan', 'giraffe', 'horse', 'ice', 'jar', 'kind', 'lion', 'mouse', 'nice', 'owl', 'purple', 'qatar', 'rice', 'slice', 'tower', 'unity', 'vice', 'water', 'xmas', 'yellow', 'zebra'];
const grammar = `#JSGF V1.0; grammar words; public <word> = apple | Apple | ball | Ball | cat | Cat | dog | Dog | elephant | Elephant | fan | Fan | giraffe | Giraffe | horse | Horse | Ice | ice | Jar | jar | kind | Kind | Lion | lion | Mouse | mouse | Nice | nice | Owl | owl | purple | Purple | Quill | quill | Rice | rice | Slice | slice | Tower | tower | Unity | unity | Vice | vice | Water | water | Xmas | xmas | Yellowe | yellow | Zebra | zebra ;`

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const wordDiagnostic = document.querySelector('#diagnosticWords');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');

//Next button
wordsNext.onclick = () => {
  document.body.style.backgroundColor = "white";
  wordDisplay.textContent = wordsForUser[Math.floor(Math.random() * wordsForUser.length)];
}

//Listen button
wordsListenButton.onclick = () => {
  recognition.start();
  console.log('Ready to receive a command.');
};


//On result
recognition.onresult = (event) => {
  const word = event.results[0][0].transcript;
  wordDiagnostic.textContent = `I heard: ${word}.`;
  console.log(`Confidence: ${event.results[0][0].confidence}`);
  // checkIfCorrect()
  if (word.toUpperCase() === wordDisplay.textContent.toUpperCase()) {
    document.body.style.backgroundColor = "green";
    score += 1;
    lvl2TTS.text = "Correct! Good job!";
  }
  else {
    document.body.style.backgroundColor = "red";
    lvl2TTS.text = (wordDiagnostic.textContent + ".. Incorrect");
  }
  lvl2Score.textContent = `Score: ${score}`;
  window.speechSynthesis.speak(lvl2TTS);
}


recognition.onspeechend = () => {
  recognition.stop();
}

recognition.onnomatch = () => {
  wordDiagnostic.textContent = "I didn't recognize that command.";
}

recognition.onerror = (event) => {
  wordDiagnostic.textContent = `Error occurred in recognition: ${event.error}`;
}

// function checkIfCorrect(){
//   if(word === wordDisplay.textContent){
//   document.body.style.backgroundColor = "green";
//   }

// }
