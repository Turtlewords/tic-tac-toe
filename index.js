// Variables

let player1Mark = "";
let player2Mark = "";
let xScore = 0;
let oScore = 0;
let ties = 0;
let currentTurn = "X";
let soloGame;
let roundOver = false;

const winCombos = [
    [0, 1, 2], 
    [0, 3, 6], 
    [0, 4, 8], 
    [1, 4, 7], 
    [2, 5, 8], 
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

// Main Menu Elements

const vsCpuBtn = document.querySelector("#vs-cpu");
const vsPlayerBtn = document.querySelector("#vs-player");
const selectX = document.querySelector("#select-x");
const selectO = document.querySelector("#select-o");
const main = document.querySelector("main");
const mainMenu = document.querySelector("#main-menu");

// Game Board Elements

const boardContainer = document.querySelector("#board-container");
const turnEl = document.querySelector("#turn");
const restartBtn = document.querySelector("#restart-btn");
const confirmRestartEl = document.querySelector("#confirm-restart");
const cancelRestartBtn = document.querySelector("#cancel-restart-btn");
const confirmRestartBtn = document.querySelector("#confirm-restart-btn");
const displayWinnerEl = document.querySelector("#display-winner");
const winnerMessage = document.querySelector("#winner-message");
const winnerEl = document.querySelector("#winner");

const quitBtn = document.querySelector("#quit-btn");
const nextRoundBtn = document.querySelector("#next-round-btn");

const tiles = document.querySelectorAll(".tile");

// Main Menu Event Listeners

vsCpuBtn.addEventListener("click", () => {
    if (player1Mark == "") {
        alert("Please pick player 1's mark!")
        return;
    }
    soloGame = true;
    mainMenu.style.display = "none";
    boardContainer.style.display = "flex"
    
});

selectX.addEventListener("click", () => {
    player1Mark = "X";
    selectX.style.backgroundColor = "#31C3BD";
    selectO.style.backgroundColor = "#A8BFC9";
})

selectO.addEventListener("click", () => {
    player1Mark = "O";
    selectO.style.backgroundColor = "#FFC860";
    selectX.style.backgroundColor = "#1A2A33";
})


// Game Board Event Listeners

restartBtn.addEventListener("click", confirmRestartGame);
cancelRestartBtn.addEventListener("click", cancelRestartGame);
confirmRestartBtn.addEventListener("click", restartGame);
quitBtn.addEventListener("click", restartGame);

tiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
        if (!soloGame) {
            if (currentTurn == "X") {
            e.target.innerHTML = `<img src="assets/images/icon-x.svg" alt="x icon" class="icon">`
            currentTurn = "O"
            turnEl.innerHTML = `<img src="assets/images/o-solid-grey.svg" class="turn-icon" alt="">`
        } else {
            e.target.innerHTML = `
            <img src="assets/images/icon-o.svg" alt="o icon" class="icon">`
            currentTurn = "X"
            turnEl.innerHTML = `<img src="assets/images/xmark-solid.svg" class="turn-icon" alt="">`
        }
        e.target.disabled = true;

        } else {
            if (currentTurn == "X") {
            e.target.innerHTML = `<img src="assets/images/icon-x.svg" alt="x icon" class="icon">`
            currentTurn = "O"
            turnEl.innerHTML = `<img src="assets/images/o-solid-grey.svg" class="turn-icon" alt="">`
            setTimeout(cpuMove, 2000);
        } 
        e.target.disabled = true;
        }
        
    })
})

// Functions

function enableGameboard() {
    tiles.forEach((tile) => {
        tile.disabled = false;
    })
}

function cpuMove() {
    let availableCells = [];
    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].disabled) {
            availableCells.push(i);
        }
    }

    console.log("Avialable cells: " + availableCells);
    
    let random = Math.floor(Math.random() * availableCells.length);

    console.log("Random: " + random)

    let index = availableCells[random];

    console.log("Index: " + index)

    if (player1Mark == "X") {
        tiles[index].innerHTML = `<img src="assets/images/icon-o.svg" alt="o icon" class="icon">`
        currentTurn = "X"
        turnEl.innerHTML = `<img src="assets/images/xmark-solid.svg" class="turn-icon" alt="">`
    } else {
        tiles[index].innerHTML = `<img src="assets/images/icon-x.svg" alt="x icon" class="icon">`
        currentTurn = "O"
        turnEl.innerHTML = `<img src="assets/images/o-solid-grey.svg" class="turn-icon" alt="">`
    }
    tiles[index].disabled = true;
}


function confirmRestartGame() {
    confirmRestartEl.style.display = "flex";
}

function cancelRestartGame() {
    confirmRestartEl.style.display = "none";
    
}

function restartGame() {

    selectX.style.backgroundColor = "#1A2A33";
    selectO.style.backgroundColor = "#A8BFC9";
    
    confirmRestartEl.style.display = "none";
    boardContainer.style.display = "none";
    mainMenu.style.display = "flex";
    player1Mark = "";
    currentTurn = "X"
    turnEl.innerHTML = `
    <img src="assets/images/xmark-solid.svg" class="turn-icon" alt="">`

    enableGameboard();

    tiles.forEach((tile) => {
        tile.innerHTML = "";
    })
}

function endRound() {
    if (soloGame) {
        
    }
}

function displaySoloWinner(winner) {

}

function displayMultiplayerWinner(winner) {

}



