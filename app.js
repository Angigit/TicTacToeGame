
//először deklaráljuk a változókat
let activePlayer, scores, roundScore;
// [0] is player1 [1] is player2
const playerMarks = ['O', 'X'];
let newDiv;

function createBoard() {
  let i = 0;
  while (i < 100) {
    newDiv = document.createElement('div'); //létrehozunk egy új div elemet
    newDiv.className = 'cell'; //az új div elemhez hozzárendeljük a "cell" osztályt
    document.getElementById('row').appendChild(newDiv); //hozzáfűzzük az új div elemet a "row" id-val ellátott div-hez
    i++;
  }
}

function init() {
  // első játékos kezd mindig
  activePlayer = 0;
  roundScore = 0;
  scores = [0, 0];

  document.querySelector('.player-1').classList.add('active');
  document.querySelector('.player-2').classList.remove('active');

  // https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
  document.querySelectorAll('.row .cell').forEach(item => {
    item.addEventListener('click', event => {

      event.target.textContent = playerMarks[activePlayer];
      nextPlayer();
      roundScore++;
      scores[activePlayer] = scores[activePlayer] + roundScore;
      
      if (activePlayer === 1) {
        event.target.style.color = 'red';
      } else {   
        event.target.style.color = 'green';
      }

      if (scores[activePlayer] > 5) {
        if (activePlayer === 0) {
          messages('Vége, az 1. játékos nyert!');
          event.target.textContent = '';
          clearActiveClass();
        } else if (activePlayer === 1) {
          messages('Vége, az 2. játékos nyert!');
          event.target.textContent = '';
          clearActiveClass();
        }
      } 

      

      // changing the cell content:
      //event.target.textContent = playerMarks[activePlayer];
    });
  });
}

// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
  //console.log('DOM fully loaded and parsed');
  // creating the board
  createBoard();
  // starting the app
  init();
});

function messages(message) {
  document.querySelector('.row').setAttribute('data-value', message);
}

function clearMessages() {
  document.querySelector('.row').setAttribute('data-value', "");
}

function clearActiveClass() {
  document.querySelector('.player-1').classList.remove('active');
  document.querySelector('.player-2').classList.remove('active');
}

function nextPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  roundScore = 0;

  //toggle = ha aktív, akkor leveszi, ha nem, akkor ráteszi
  document.querySelector(".player-1").classList.toggle("active");
  document.querySelector(".player-2").classList.toggle("active");
}

function clearContent() {
  document.querySelector('.row').innerHTML = '';
}

//ha rákatttintunk a start gombra
document.querySelector('.start-btn').addEventListener('click', () => {
  clearContent();
  createBoard();
  init();
  clearMessages();
});



