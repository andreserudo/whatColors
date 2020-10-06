const btnStart = document.getElementById('startGame');
let currentLevel = 0;
let currentPhase = 0;
const game = [
  {
    level: 1,
    phases: 3,
    colors: 3,
    givenCollors: ['rgb(255, 128, 128)', 'blue'],
    colorOne: ['rgb(255, 0, 0)','rgb()'],
    colorTwo: ['rgb(255, 255, 255)','rgb()'],
    colorRandom: ['rgb(255, 128, 213)','']
  }
];    

// An implementation of Fisher-Yates (aka Knuth) Shuffle algorithm
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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
  let numberOfRandomColors = game.colors - 2;  
  let arrayColors = [ 
    game[currentLevel].colorOne[currentPhase], 
    game[currentLevel].colorTwo[currentPhase], 
    game[currentLevel].colorRandom[currentPhase]
  ];
  const colors = document.querySelectorAll('.colors .color');
  let index = 0;

  arrayColors = shuffle(arrayColors);
  
  colors.forEach(element => {
    element.style.backgroundColor = arrayColors[index];
    index += 1;
  })
  console.log(colors);
}

function choseColor(e){
  console.log(e.srcElement);
}

function addingClickColorEvent() {
  const colors = document.querySelectorAll('.colors .color');

  colors.forEach(element => {
    element.addEventListener('click', choseColor);
  })
}

function createColor(){    
  const colors = document.querySelector('.colors');  
  let color = document.createElement('div');

  color.className = 'color';
  //console.log(color);
  colors.append(color);
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
  //stylingColor(currentLevel, currentPhase);
}

btnStart.addEventListener('click', newGame)