// Main Menu Elements

const vsCpuBtn = document.querySelector("#vs-cpu");
const vsPlayerBtn = document.querySelector("#vs-player");
const selectX = document.querySelector("#select-x");
const selectO = document.querySelector("#select-o");
const main = document.querySelector("main");

// Main Menu Event Listeners

vsCpuBtn.addEventListener("click", () => {
    displayPage("solo");
});

// Solo Game

const turnEl = document.querySelector("#turn");
const restartBtn = document.querySelector("#restart-btn");
const confirmRestartEl = document.querySelector("#confirm-restart");
const cancelRestartBtn = document.querySelector("#cancel-restart-btn");
const confirmCancelBtn = document.querySelector("#confirm-cancel.btn");

const tiles = document.querySelectorAll(".tile");



// Solo Game Event Listeners

restartBtn.addEventListener("click", confirmRestartGame)
cancelRestartBtn.addEventListener("click", cancelRestartGame)
confirmCancelBtn.addEventListener("click", confirmRestartGame)

// Functions


async function displayPage(page) {
    let url = `${page}.html`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Page load error: " + response.status)
        }
        const data = await response.text();
        main.innerHTML = data;
    } catch(error) {
        alert(error);
    }

}


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