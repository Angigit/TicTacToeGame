
//először deklaráljuk a változókat
let activePlayer;
// [0] 1. játékos [1] 2. játékos
const playerMarks = ['O', 'X'];
const squares = [];
let newDiv;
let id;


// tábla létrehozása
function createBoard() {
  let i = 0;
  while (i < 100) {
    newDiv = document.createElement('div'); //létrehozunk egy új div elemet
    newDiv.className = 'cell'; //az új div elemhez hozzárendeljük a "cell" osztályt
    newDiv.dataset.clicked = 'no'; //beállítunk dataset-el egy clicked tulajdonságot, amelynek a kezdőértéke 'no' 
    newDiv.dataset.id = i;
    document.getElementById('row').appendChild(newDiv); //hozzáfűzzük az új div elemet a "row" id-val ellátott div-hez
    i++;
  }
}

// játék kezdete
function init() {
  // első játékos kezd mindig
  activePlayer = playerMarks[0];

  document.querySelector('.player-1').classList.add('active');
  document.querySelector('.player-2').classList.remove('active');

  // https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
  document.querySelectorAll('.row .cell').forEach(item => {
    item.addEventListener('click', event => {

      //majd beállítjuk, hogy ha már egyszer rá click-eltek egy cellára, akkor maradjon is úgy
      if (event.target.dataset.clicked === 'yes') {
        return; //early return - nem fut tovább a függvény
      }
      event.target.dataset.clicked = 'yes';

      id = parseInt(event.target.dataset.id);
      
      if (!squares[id]) {
        squares[id] = activePlayer;
        event.target.textContent = activePlayer;
        if (activePlayer === playerMarks[0]) {
          event.target.style.color = 'red';
        } else {
          event.target.style.color = 'green';
        }
        console.log(id, activePlayer);
      } 

      //activePlayer = activePlayer === playerMarks[0] ? playerMarks[1] : playerMarks[0];
      nextPlayer();
      
      if (playerWon()) {
        messages(`Vége a játéknak, ${activePlayer} nyert!`);
        event.target.textContent = '';
        clearActiveClass();
      } 
    });
  });
}

// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
  //console.log('DOM fully loaded and parsed');
  // tábla létrehozása
  createBoard();
  // applikáció indítása
  init();
});

// nyerési lehetőségek
function playerWon() {
  if (squares[0] === activePlayer) {
    if (squares[1] === activePlayer && squares[2] === activePlayer && squares[3] === activePlayer && squares[4] === activePlayer) {
      return true;
    }
    if (squares[10] === activePlayer && squares[20] === activePlayer && squares[30] === activePlayer && squares[40] === activePlayer) {
      return true;
    }
    if (squares[11] === activePlayer && squares[22] === activePlayer && squares[33] === activePlayer && squares[44] === activePlayer) {
      return true;
    }
  }
  if (squares[1] === activePlayer) {
    if (squares[2] === activePlayer && squares[3] === activePlayer && squares[4] === activePlayer && squares[5] === activePlayer) {
      return true;
    }
    if (squares[11] === activePlayer && squares[21] === activePlayer && squares[31] === activePlayer && squares[41] === activePlayer) {
      return true;
    }
    if (squares[12] === activePlayer && squares[23] === activePlayer && squares[34] === activePlayer && squares[45] === activePlayer) {
      return true;
    }
  }
  if (squares[2] === activePlayer) {
    if (squares[3] === activePlayer && squares[4] === activePlayer && squares[5] === activePlayer && squares[6] === activePlayer) {
      return true;
    }
    if (squares[12] === activePlayer && squares[22] === activePlayer && squares[32] === activePlayer && squares[42] === activePlayer) {
      return true;
    }
    if (squares[13] === activePlayer && squares[24] === activePlayer && squares[35] === activePlayer && squares[46] === activePlayer) {
      return true;
    }
  }
  if (squares[3] === activePlayer) {
    if (squares[4] === activePlayer && squares[5] === activePlayer && squares[6] === activePlayer && squares[7] === activePlayer) {
      return true;
    }
    if (squares[13] === activePlayer && squares[23] === activePlayer && squares[33] === activePlayer && squares[43] === activePlayer) {
      return true;
    }
    if (squares[14] === activePlayer && squares[25] === activePlayer && squares[36] === activePlayer && squares[47] === activePlayer) {
      return true;
    }
  }
  if (squares[4] === activePlayer) {
    if (squares[5] === activePlayer && squares[6] === activePlayer && squares[7] === activePlayer && squares[8] === activePlayer) {
      return true;
    }
    if (squares[14] === activePlayer && squares[24] === activePlayer && squares[34] === activePlayer && squares[44] === activePlayer) {
      return true;
    }
    if (squares[15] === activePlayer && squares[26] === activePlayer && squares[37] === activePlayer && squares[48] === activePlayer) {
      return true;
    }
    if (squares[13] === activePlayer && squares[22] === activePlayer && squares[31] === activePlayer && squares[40] === activePlayer) {
      return true;
    }
  }
  if (squares[5] === activePlayer) {
    if (squares[6] === activePlayer && squares[7] === activePlayer && squares[8] === activePlayer && squares[9] === activePlayer) {
      return true;
    }
    if (squares[15] === activePlayer && squares[25] === activePlayer && squares[35] === activePlayer && squares[45] === activePlayer) {
      return true;
    }
    if (squares[16] === activePlayer && squares[27] === activePlayer && squares[38] === activePlayer && squares[49] === activePlayer) {
      return true;
    }
    if (squares[14] === activePlayer && squares[23] === activePlayer && squares[32] === activePlayer && squares[41] === activePlayer) {
      return true;
    }
  }
}

// lehetséges megoldások
function calculate() {
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [0, 10, 20, 30, 40],
    [50, 60, 70, 80, 90],
    [1, 11, 21, 31, 41],
    [51, 61, 71, 81, 91],
    [2, 12, 22, 32, 42],
    [52, 62, 72, 82, 92],
    [3, 13, 23, 33, 43],
    [53, 63, 73, 83, 93],
    [4, 14, 24, 34, 44],
    [54, 64, 74, 84, 94],
    [5, 15, 25, 35, 45],
    [55, 65, 75, 85, 95],
    //átlós
    [0, 11, 22, 33, 44],
    [55, 66, 77, 88, 99],
    [1, 12, 23, 34, 45],
    [3, 14, 25, 36, 47],
    [4, 15, 26, 37, 48],
    [5, 16, 27, 38, 49],
    [4, 13, 22, 31, 40],
    [5, 14, 23, 32, 41],
    [6, 15, 24, 33, 42],
    [7, 16, 25, 34, 43],
    [8, 17, 26, 35, 44],
    [9, 18, 27, 36, 45]
  ];

  let win = false;

  for (let i = 0; i <= 25; i++) {
    const winline = lines[i];
    //console.log(winline);
    let a = winline[0];
    let b = winline[1];
    let c = winline[2];
    let d = winline[3];
    let e = winline[4];

    if (a === b && b === c && c === d && d === e) {
      win = true;
      return;
    }
  }
  if (win) {
    console.log('vége');
  }
}

// felugró üzenet létrehozása
function messages(message) {
  document.querySelector('.row').setAttribute('data-value', message);
}

// üzenetek törlése
function clearMessages() {
  document.querySelector('.row').setAttribute('data-value', "");
}

// aktív osztály törlése
function clearActiveClass() {
  document.querySelector('.player-1').classList.remove('active');
  document.querySelector('.player-2').classList.remove('active');
}

// következő játékos
function nextPlayer() {
  if (activePlayer === playerMarks[0]) {
    activePlayer = playerMarks[1];
  } else {
    activePlayer = playerMarks[0];
  }

  // toggle = ha aktív, akkor leveszi, ha nem, akkor ráteszi
  document.querySelector(".player-1").classList.toggle("active");
  document.querySelector(".player-2").classList.toggle("active");
}

// tartalom törlése
function clearContent() {
  document.querySelector('.row').innerHTML = '';
}

// ha rákatttintunk a start gombra
document.querySelector('.start-btn').addEventListener('click', () => {
  clearContent();
  clearMessages();
  createBoard();
  init();
});



