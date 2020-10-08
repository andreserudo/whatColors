const btnStart = document.getElementById('startGame');
let currentLevel = 0;
let currentPhase = 0;
let tries = 3;
const game = [
  {
    level: 0,
    phases: 2,
    numberOfColorsToPass: 2,
    colors: 3,
    givenCollors: ['rgb(255, 128, 128)', 'rgb(128, 36, 86)'],
    colorOne: ['rgb(255, 0, 0)','rgb(255, 0, 0)'],
    colorTwo: ['rgb(255, 255, 255)','rgb(0, 71, 171)'],
    colorRandom: ['rgb(255, 128, 213)','rgb(0, 237, 255)']
  },
  {
    level: 1,
    phases: 2,
    numberOfColorsToPass: 2,
    colors: 3,
    givenCollors: ['rgb(255, 128, 128)', 'rgb(128, 36, 86)'],
    colorOne: ['rgb(255, 0, 0)','rgb(255, 0, 0)'],
    colorTwo: ['rgb(255, 255, 255)','rgb(0, 71, 171)'],
    colorRandom: ['rgb(255, 128, 213)','rgb(0, 237, 255)']
  },
  {
    level: 2,
    phases: 2,
    numberOfColorsToPass: 2,
    colors: 3,
    givenCollors: ['rgb(255, 128, 128)', 'rgb(128, 36, 86)'],
    colorOne: ['rgb(255, 0, 0)','rgb(255, 0, 0)'],
    colorTwo: ['rgb(255, 255, 255)','rgb(0, 71, 171)'],
    colorRandom: ['rgb(255, 128, 213)','rgb(0, 237, 255)']
  },
];

function loseTries() {
  tries -= 1;

  if (tries === 0) {
    console.log('game over');
  } else {
    console.log(tries);
  }

}

// An implementation of Fisher-Yates (aka Knuth) Shuffle algorithm
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function stylingColor(level, phase){    
  let arrayColors = [ 
    game[currentLevel].colorOne[currentPhase], 
    game[currentLevel].colorTwo[currentPhase], 
    game[currentLevel].colorRandom[currentPhase]
  ];
  const colors = document.querySelectorAll('.colors .color');
  const givenColor = document.querySelector('.given-color');
  let index = 0;

  givenColor.style.backgroundColor = game[currentLevel].givenCollors[currentPhase];

  arrayColors = shuffle(arrayColors);
  
  colors.forEach(element => {
    element.style.backgroundColor = arrayColors[index];
    index += 1;
  });
  
}

function chosenColour(e){
  const colourElement = e.srcElement;
  const colourChoose = e.srcElement.style.backgroundColor;
  const colourClassName = e.srcElement.className;
  
  if (!colourClassName.includes('correct')) {
    if((game[currentLevel].colorOne[currentPhase] === colourChoose) || 
      (game[currentLevel].colorTwo[currentPhase] === colourChoose) ){
        const otherIncorrect = document.querySelector('.incorrect');
        
        if(otherIncorrect){
          otherIncorrect.classList.remove('incorrect');
        }        
        colourElement.className = 'color correct';
    }else{
        if (colourElement.className != 'color incorrect') {          
          colourElement.className = 'color incorrect';
          loseTries();  
        }
    }    
  }

  const totalAnswers = document.querySelectorAll('.correct');  

  if (totalAnswers.length === game[currentLevel].numberOfColorsToPass) {

    newPhase();    
    
  }
  
}

function addingClickColorEvent() {
  const colors = document.querySelectorAll('.colors .color');

  colors.forEach(element => {
    element.addEventListener('click', chosenColour);
  })
}

function removingColors() {
  const colors = document.querySelectorAll('.colors .color');

  colors.forEach(element => {
    element.remove();
  })
}

function createColor(){    
  const colors = document.querySelector('.colors');  
  let color = document.createElement('div');

  color.className = 'color';
  colors.append(color);
}

function newPhase(){  
  if (currentPhase+1 === game[currentLevel].phases) {    
    currentPhase = 0;
    currentLevel++;
  }else{
    currentPhase++;
  }  
    
  removingColors();

  for(let i=0; i<game[currentLevel].colors; i+= 1){
    createColor();
    addingClickColorEvent()
  }

  stylingColor();  
  
}

function newGame(){ 
  const initialScreen = document.querySelector('.initial-screen');
  const gameScreen = document.querySelector('.game');
  
  initialScreen.style.display = 'none';  
  gameScreen.style.display = 'flex';  
  console.log(game[currentLevel].givenCollors[currentPhase]);

  for(let i=0; i<game[currentLevel].colors; i+= 1){
    createColor();
    addingClickColorEvent()
  }

  stylingColor();
  
}

btnStart.addEventListener('click', newGame)