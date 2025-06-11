// Variables

let player1Mark;
let xScore = 0;
let oScore = 0;
let ties = 0;
let currentTurn = "X";

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

// Main Menu Event Listeners

vsCpuBtn.addEventListener("click", () => {
    mainMenu.style.display = "none";
    boardContainer.style.display = "flex"
    
});

selectX.addEventListener("click", () => {
    player1Mark = "X";
})

selectO.addEventListener("click", () => {
    player1Mark = "O";
})

// Game Board

const boardContainer = document.querySelector("#board-container");
const turnEl = document.querySelector("#turn");
const restartBtn = document.querySelector("#restart-btn");
const confirmRestartEl = document.querySelector("#confirm-restart");
const cancelRestartBtn = document.querySelector("#cancel-restart-btn");
const confirmRestartBtn = document.querySelector("#confirm-restart-btn");

const tiles = document.querySelectorAll(".tile");



// Game Board Event Listeners

restartBtn.addEventListener("click", confirmRestartGame);
cancelRestartBtn.addEventListener("click", cancelRestartGame);
confirmRestartBtn.addEventListener("click", restartGame);

tiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
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
        e.target.disabled = "true";
    })
})

// Functions

function enableGameboard() {
    tiles.forEach((tile) => {
        tile.disabled = false;
    })
}


function confirmRestartGame() {
    confirmRestartEl.style.display = "flex";
}

function cancelRestartGame() {
    confirmRestartEl.style.display = "none";
    
}

function restartGame() {

    
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



