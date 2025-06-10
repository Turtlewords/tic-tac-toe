// Variables

let player1Mark;
let xScore = 0;
let oScore = 0;
let ties = 0;
let currentTurn = "X";

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
    player1Mark = "x";
})

selectO.addEventListener("click", () => {
    player1Mark = "o";
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
        } else {
            e.target.innerHTML = `
            <img src="assets/images/icon-o.svg" alt="o icon" class="icon">`
        }
        
    })
})

// Functions

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

    turnEl.innerHTML = `
    <img src="assets/images/xmark-solid.svg" class="turn-icon" alt="">`

    tiles.forEach((tile) => {
        tile.innerHTML = "";
    })
}



