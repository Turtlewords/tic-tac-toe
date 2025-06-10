// Variables

let player1Mark;

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



// Solo Game Event Listeners

restartBtn.addEventListener("click", confirmRestartGame);
cancelRestartBtn.addEventListener("click", cancelRestartGame);
confirmRestartBtn.addEventListener("click", restartGame);

// Functions

function confirmRestartGame() {
    confirmRestartEl.style.display = "flex";
}

function cancelRestartGame() {
    confirmRestartEl.style.display = "none";
}

function restartGame() {

    
    confirmRestartEl.style.display = "none";
    

    turnEl.innerHTML = `
    <img src="assets/images/xmark-solid.svg" class="turn-icon" alt="">`

    tiles.forEach((tile) => {
        tile.innerHTML = "";
    })
}

