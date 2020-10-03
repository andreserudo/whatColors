
function newGame(){ 
  const initialScreen = document.querySelector('.initial-screen');
  const gameScreen = document.querySelector('.game');
  
  initialScreen.style.display = 'none';  
  gameScreen.style.display = 'flex';

  loadGame();
  
}

function loadGame(){
  const btnStart = document.getElementById('startGame');

  btnStart.addEventListener('click', newGame)
}

window.onload = loadGame();
