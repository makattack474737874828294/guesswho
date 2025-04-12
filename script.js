const kids = [
    { name: "Makani", image: "images/Makani.JPG", brownHair: true, glasses: false, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Marquis", image: "images/Marquis.JPG", brownHair: false, glasses: true, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Adalyn", image: "images/Adalyn.JPG", brownHair: true, glasses: true, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "MichaelDawson", image: "images/MichaelDawson.JPG", brownHair: false, glasses: false, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Anastasia", image: "images/Anastasia.JPG", brownHair: true, glasses: false, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Preslee", image: "images/Preslee.JPG", brownHair: false, glasses: true, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Blaire", image: "images/Blaire.JPG", brownHair: true, glasses: false, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Brynlee", image: "images/Brynlee.JPG", brownHair: false, glasses: false, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Casey", image: "images/Casey.JPG", brownHair: true, glasses: true, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Brodie", image: "images/Brodie.JPG", brownHair: false, glasses: false, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Kaylee", image: "images/Kaylee.JPG", brownHair: true, glasses: false, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Paige", image: "images/Paige.JPG", brownHair: false, glasses: true, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Landon", image: "images/Landon.JPG", brownHair: true, glasses: false, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Rhett", image: "images/Rhett.JPG", brownHair: false, glasses: false, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Levi", image: "images/Levi.JPG", brownHair: true, glasses: true, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Brylee", image: "images/Brylee.JPG", brownHair: false, glasses: false, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Sydney", image: "images/Sydney.JPG", brownHair: true, glasses: false, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Mylee", image: "images/Mylee.JPG", brownHair: false, glasses: true, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Zeriah", image: "images/Zeriah.JPG", brownHair: true, glasses: false, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Dakarii", image: "images/Dakarii.JPG", brownHair: false, glasses: false, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false },
    { name: "Aiden", image: "images/Aiden.JPG", brownHair: true, glasses: true, boy: true, blonde: false, tall: true, skinny: true, big: false, funny: true },
    { name: "Andrew", image: "images/Andrew.JPG", brownHair: false, glasses: false, boy: false, blonde: true, tall: false, skinny: false, big: true, funny: false }
];

let mysteryKid;
let selectedKid = null;
let lives = 6; // Start with 6 lives

startGame();

function startGame() {
    lives = 6; // Reset lives on new game
    document.getElementById("lives").innerText = `Lives: ${lives}`;
    document.getElementById("reset").style.display = "none";
    document.getElementById("feedback").innerText = "";
    document.getElementById("answer").innerText = "";
    document.getElementById("guess-btn").disabled = true;
    selectedKid = null;
    document.getElementById("selected-info").innerText = "Click a photo to select, then guess.";
    mysteryKid = kids[Math.floor(Math.random() * kids.length)];
    enableQuestions(); // Ensure question buttons are enabled
    displayKids();
}

function displayKids() {
    const grid = document.getElementById("kids-grid");
    grid.innerHTML = "";
    kids.forEach((kid, index) => {
        const card = document.createElement("div");
        card.classList.add("kid-card");
        card.innerHTML = `
            <img src="${kid.image}" alt="${kid.name}">
            <div class="name">${kid.name}</div>
        `;
        card.addEventListener("click", () => handleKidClick(card, kid));
        grid.appendChild(card);
    });
}

function handleKidClick(card, kid) {
    if (card.classList.contains("eliminated")) return;
    if (lives <= 0) return; // Prevent interaction if game is over
    if (selectedKid === kid) {
        card.classList.remove("selected");
        selectedKid = null;
        document.getElementById("guess-btn").disabled = true;
        document.getElementById("selected-info").innerText = "Click a photo to select, then guess.";
    } else {
        document.querySelectorAll(".kid-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedKid = kid;
        document.getElementById("guess-btn").disabled = false;
        document.getElementById("selected-info").innerText = "Selected! Click Guess or pick another.";
    }
}

function askQuestion(trait) {
    if (lives <= 0) return; // Prevent questions if game is over
    const answer = mysteryKid[trait] ? "Yes" : "No";
    document.getElementById("answer").innerText = `${answer}. Click photos to eliminate!`;
}

function checkGuess() {
    if (!selectedKid || lives <= 0) return;
    if (selectedKid === mysteryKid) {
        document.getElementById("feedback").innerText = "You got it! That’s the mystery kid!";
        document.getElementById("reset").style.display = "block";
        disableQuestions(); // Disable further questions
    } else {
        lives--;
        document.getElementById("lives").innerText = `Lives: ${lives}`;
        document.getElementById("feedback").innerText = "Nope, not that one!";
        document.querySelector(".selected").classList.add("eliminated");
        selectedKid = null;
        document.getElementById("guess-btn").disabled = true;
        document.getElementById("selected-info").innerText = "Click a photo to select, then guess.";
        
        if (lives <= 0) {
            document.getElementById("feedback").innerText = `Game Over! The mystery kid was ${mysteryKid.name}.`;
            document.getElementById("reset").style.display = "block";
            disableQuestions(); // Disable further questions
        }
    }
}

function disableQuestions() {
    const buttons = document.querySelectorAll("#questions button");
    buttons.forEach(button => button.disabled = true);
}

function enableQuestions() {
    const buttons = document.querySelectorAll("#questions button");
    buttons.forEach(button => button.disabled = false);
}