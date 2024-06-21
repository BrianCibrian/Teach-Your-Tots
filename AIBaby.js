let listenButtonT = document.querySelector('#listenButtonT');
const questionDisplay = document.getElementById('question');

//Text To Speech variable
var questionTTS = new SpeechSynthesisUtterance();

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const words = ['start.','next.','done.','next question please.', 'yes.', 'okay.', 'cool', 'sweet.', 'super.']

const grammar = "#JSGF V1.0; grammar words; public <word> = Next | done | next word;"
//`

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector('#diagnostic');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');

let wordHTML = '';


//question 1 - 3
const question1 = ['Hello!', 'How are you today?', 'How are you feeling?'];

const question2 = ['Why is that?', 'Tell me more?'];

const question3 = ['Super! What is your favorite food?', 'Alright! What is your favorite tv show?', 'Very cool, what is your favorite color?', 'Nice! What do you like to do for fun?', 'Sweet! What is your favorite toy?', 'Wowza! What is your favorite playground activity','Super cool! Could you tell me a joke?'];

//jokes
const jokeP1 = question3[6];

const jokeP2 = 'Haha! That was funny, would you like to hear a joke?';

const jokeP3 = ['Why did the chicken cross the road? To get to the other side!', 'What do you call a lazy kangaroo? A pouch potato.', 'I used to run a dating service for chickens, but I was struggling to make hens meet.'];


//question 4
const question4 = ['Those are fun, I love the swings myself', 'Thats a cool color, my favorite color is blue!', 'Thats a good one, I like my toy car.', 'Yummy! My favorite food is spaghetti and meat balls.', 'Nice, I love cocomelon.', 'Okay! I like playing catch with my friends.'];



//Listen button

listenButtonT.onclick = () => {
  recognition.start();
  
};


//count and num variables
var num = 0;

var count = 0;

var count1 = 0;

var count2 = 0;

//Recognition
recognition.onresult = (event) => {
  const word = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${word}.`;
  console.log(`Confidence: ${event.results[0][0].confidence}`);


  //Where real if statements are
  if (diagnostic.textContent == "Result received: start.") {
    
  questionDisplay.textContent = question1[Math.floor(Math.random() * 3)];
  console.log('Ready to receive a command.');
    
    count++;
    //count = 1
    
  } 

  
  if ((diagnostic.textContent == "Result received: " + words[1]) && (count == 1)){
    questionDisplay.innerText = question2[Math.floor(Math.random() * 2)];
    count++;
    //count = 2
    
  } else if ((diagnostic.textContent == "Result received: " + words[1]) && (count == 2) /*+ words[2]*/) {
      num = Math.floor(Math.random() * 7);
      questionDisplay.innerText = question3[num];
      count++;
      //count = 3
    
        if (num == 6 ){
          count1++;
          
        }
    
  } else if ((num == 6) && (diagnostic.textContent == "Result received: " + words[4]) && (count1 == 1)){
          questionDisplay.innerText = jokeP2;
          count1++;
    
  } else if((diagnostic.textContent == "Result received: " + words[5]) && (count1 == 2)){
          questionDisplay.innerText = jokeP3[Math.floor(Math.random() * 3)];
          count1++;
    
  } else if (count == 2){
    questionDisplay.innerText = "Nice! Your done!";
    listenButtonT.style.display = 'none';
    
  } else if ((num == 0) && (count == 3) && (diagnostic.textContent == "Result received: " + words[1])){
    questionDisplay.innerText = question4[3];
    count++;
    
  } else if ((num == 1) && (count == 3) && (diagnostic.textContent == "Result received: " + words[1])){
    questionDisplay.innerText = question4[4];
    count++;
    
  } else if ((num == 2) && (count == 3) && (diagnostic.textContent == "Result received: " + words[1])){
    questionDisplay.innerText = question4[1];
    count++;
    
  } else if ((num == 3) && (count == 3) && (diagnostic.textContent == "Result received: " + words[1])){
    questionDisplay.innerText = question4[5];
    count++;
    
  } else if ((num == 4) && (count == 3) && (diagnostic.textContent == "Result received: " + words[1])){
    questionDisplay.innerText = question4[2];
    count++;
    
  } else if ((num == 5) && (count == 3) && (diagnostic.textContent == "Result received: " + words[1])){
    questionDisplay.innerText = question4[0];
    count++;
    
  } else if ((count == 4) && (diagnostic.textContent == "Result received: " + words[1])){
    questionDisplay.innerText = "Nice! You're done!";
    //listenButtonT.style.display = 'none';
  }

  questionTTS.text = questionDisplay.textContent;
  window.speechSynthesis.speak(questionTTS);
  }

function setup() {
  // When website starts
  createCanvas(windowWidth, windowHeight);
}

recognition.onspeechend = () => {
  recognition.stop();
}

//function draw(){
  // Runs in a loop
 // background(50);
//}
