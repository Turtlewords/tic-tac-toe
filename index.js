// Elements

const vsCpuBtn = document.querySelector("#vs-cpu");
const vsPlayerBtn = document.querySelector("#vs-player");
const selectX = document.querySelector("#select-x");
const selectO = document.querySelector("#select-o");
const main = document.querySelector("main");


vsCpuBtn.addEventListener("click", () => {
    displayPage("solo");
});


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