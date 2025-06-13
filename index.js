// Variables

let player1Mark = "";
let player2Mark = "";
let xScore = 0;
let oScore = 0;
let ties = 0;
let currentTurn = "X";
let soloGame;
let roundOver = false;
let wonGame = false;


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
const winnerText = document.querySelector("#winner-text");
const xScoreEl = document.querySelector("#x-score");
const oScoreEl = document.querySelector("#o-score");
const tiesEl = document.querySelector("#total-ties");
const xPlayerEl = document.querySelector("#x-player");
const oPlayerEl = document.querySelector("#o-player");

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
    if (player1Mark == "X") {
        xPlayerEl.textContent = "YOU";
        oPlayerEl.textContent = "CPU";
    } else {
        xPlayerEl.textContent = "CPU";
        oPlayerEl.textContent = "YOU";
        setTimeout(cpuMove, 2000);
    }
    
});



vsPlayerBtn.addEventListener("click", () => {
    if (player1Mark == "") {
        alert("Please pick player 1's mark!")
        return;
    }
    soloGame = false;
    mainMenu.style.display = "none";
    boardContainer.style.display = "flex"
    if (player1Mark == "X") {
        xPlayerEl.textContent = "P1";
        oPlayerEl.textContent = "P2";
    } else {
        xPlayerEl.textContent = "P2";
        oPlayerEl.textContent = "P1";
    }

})

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
nextRoundBtn.addEventListener("click", nextRound);

tiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {

        // Multiplayer game

        if (!soloGame) {
            if (currentTurn == "X") {
                e.target.innerHTML = `<img src="assets/images/icon-x.svg" alt="x icon" class="icon">`
                e.target.dataset.val = "X";
                currentTurn = "O"
                turnEl.innerHTML = `<img src="assets/images/o-solid-grey.svg" class="turn-icon" alt="">`
                checkWinner()
            } else {
                e.target.innerHTML = `
                <img src="assets/images/icon-o.svg" alt="o icon" class="icon">`
                e.target.dataset.val = "O";
                currentTurn = "X"
                turnEl.innerHTML = `<img src="assets/images/xmark-solid.svg" class="turn-icon" alt="">`
                checkWinner()
            }
            e.target.disabled = true;

        } else {

            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // FIX CPU GAME FOR WHEN PLAYER 1 PICKS "O"
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            // CPU Game

            if (currentTurn == "X") {
            e.target.innerHTML = `<img src="assets/images/icon-x.svg" alt="x icon" class="icon">`
            e.target.dataset.val = "X";
            currentTurn = "O"
            turnEl.innerHTML = `<img src="assets/images/o-solid-grey.svg" class="turn-icon" alt="">`
            checkWinner()
            setTimeout(cpuMove, 2000);
        } else {
            e.target.innerHTML = `<img src="assets/images/icon-o.svg" class="icon" alt="">`
            e.target.dataset.val = "O";
            currentTurn = "X"
            turnEl.innerHTML = `<img src="assets/images/xmark-solid.svg" alt="x icon" class="turn-icon">`
            checkWinner()
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
    if (wonGame) {
        return;
    }

    let availableCells = [];
    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].disabled) {
            availableCells.push(i);
        }
    }

    let random = Math.floor(Math.random() * availableCells.length);
    let index = availableCells[random];

    if (player1Mark == "X") {
        tiles[index].innerHTML = `<img src="assets/images/icon-o.svg" alt="o icon" class="icon">`
        tiles[index].dataset.val = "O";
        currentTurn = "X"
        turnEl.innerHTML = `<img src="assets/images/xmark-solid.svg" class="turn-icon" alt="">`
    } else {
        tiles[index].innerHTML = `<img src="assets/images/icon-x.svg" alt="x icon" class="icon">`
        tiles[index].dataset.val = "X";
        currentTurn = "O"
        turnEl.innerHTML = `<img src="assets/images/o-solid-grey.svg" class="turn-icon" alt="">`
    }
    tiles[index].disabled = true;
    checkWinner()
}

function checkWinner() {
    
    for (let combo of winCombos) {
        let pos1 = tiles[combo[0]].dataset.val;
        let pos2 = tiles[combo[1]].dataset.val;
        let pos3 = tiles[combo[2]].dataset.val;

        if (pos1 != "" && pos2 != "" && pos3 != "" 
        && pos1 == pos2 && pos2 == pos3) {
            let winningMark;
            
            if (pos1 == "X") {
                    winningMark = "X"
                    xScore++;
                    setTimeout(() => {
                        xScoreEl.textContent = xScore;
                    }, 1500)
                    
                } else {
                    winningMark = "0"
                    oScore++;
                    setTimeout(() => {
                        oScoreEl.textContent = oScore;
                    }, 1500)
                    
                }
            

            if (soloGame) {
                let winner = (pos1 == player1Mark) ? "YOU WON!" : "OH NO, YOU LOST";
                

                setTimeout(() => {
                    displaySoloWinner(winner, winningMark)
                }, 1500)
                
            } else {
                let winner = (pos1 == player1Mark) ? "PLAYER 1" : "PLAYER 2";
                
                setTimeout(() => {
                    displayMultiplayerWinner(winner, winningMark)
                }, 1500);
            }
            wonGame = true;
            return;
        }
    }

    if (!wonGame) {
        const allTiles = [...tiles].every((tile) => tile.dataset.val != "");
        if (allTiles) {
            ties++;
            
            setTimeout(() => {
            displayRoundTied();
            tiesEl.textContent = ties;
            },1500);
            
        }
    }

    
}


function confirmRestartGame() {
    confirmRestartEl.style.display = "flex";
}

function cancelRestartGame() {
    confirmRestartEl.style.display = "none";
    
}

function restartGame() {

    wonGame = false;
    selectX.style.backgroundColor = "#1A2A33";
    selectO.style.backgroundColor = "#A8BFC9";
    soloGame = null;
    confirmRestartEl.style.display = "none";
    boardContainer.style.display = "none";
    displayWinnerEl.style.display = "none";
    mainMenu.style.display = "flex";
    player1Mark = "";
    currentTurn = "X";
    turnEl.innerHTML = `
    <img src="assets/images/xmark-solid.svg" class="turn-icon" alt="">`
    winnerMessage.textContent = "";
    winnerText.textContent = "";
    winnerEl.innerHTML = "";
    tiesEl.textContent= "";
    xScoreEl.textContent = "";
    oScoreEl.textContent = "";
    xPlayerEl.textContent = "";
    oPlayerEl.textContent = "";
    winnerText.style.color = "#DBE8ED"

    ties = 0;
    xScore = 0;
    oScore = 0;

    enableGameboard();

    tiles.forEach((tile) => {
        tile.innerHTML = "";
        tile.dataset.val = "";
    })
    
}

function endRound() {
    if (soloGame) {
        
    }
}

function nextRound() {
    wonGame = false;
    displayWinnerEl.style.display = "none";
    enableGameboard();



    tiles.forEach((tile) => {
        tile.innerHTML = "";
        tile.dataset.val = "";
    })
    currentTurn = "X";
    turnEl.innerHTML = `
    <img src="assets/images/xmark-solid.svg" class="turn-icon" alt="">`

    if (soloGame == true && player1Mark == "O") {
        setTimeout(cpuMove, 2000);
    }
}


function displaySoloWinner(victor, victorMark) {
    winnerMessage.textContent = `${victor }`
    let icon = (victorMark == "X") ?
    `<img src="assets/images/icon-x.svg" alt="x icon" class="icon">` :
    `<img src="assets/images/icon-o.svg" alt="o icon" class="icon">`
    winnerEl.innerHTML = icon;
    winnerText.textContent = "TAKES THE ROUND"
    winnerText.style.color = (victorMark == "X") ? "#31C3BD" : "#FFC860";
    displayWinnerEl.style.display = "flex";
}

function displayMultiplayerWinner(victor, victorMark) {
    winnerMessage.textContent = `${victor } WINS!`
    let icon = (victorMark == "X") ?
    `<img src="assets/images/icon-x.svg" alt="x icon" class="icon">` :
    `<img src="assets/images/icon-o.svg" alt="o icon" class="icon">`
    winnerEl.innerHTML = icon;
    winnerText.textContent = "TAKES THE ROUND"
    winnerText.style.color = (victorMark == "X") ? "#31C3BD" : "#FFC860";
    displayWinnerEl.style.display = "flex";
}

function displayRoundTied() {
    winnerMessage.textContent = "";
    displayWinnerEl.style.display = "flex";
    winnerEl.innerHTML = "";
    winnerText.textContent = "ROUND TIED";

}



