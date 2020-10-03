const btnStart = document.getElementById('startGame');
let currentLevel = 0;
const game = [
  {
    level: 1,
    phases: 3,
    colors: 3,
    givenCollors: ['red', 'blue'],
    colorOne: ['rgb()','rgb()'],
    colorTwo: ['rgb()','rgb()'],
  }
];    

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
  console.log('olar');

  for(let i=0; i<game[currentLevel].colors; i+= 1){
    createColor();
  }
}

btnStart.addEventListener('click', newGame)