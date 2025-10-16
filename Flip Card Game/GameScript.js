const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const difficultyMenu = document.getElementById("difficulty-menu");
const gameArea = document.getElementById("game-area");
const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");
const menuBtn = document.getElementById("menu-btn");
const statusText = document.getElementById("status");

let flipped = [];
let matched = [];
let cardValues = [];
let currentLevel = "";

const allImages = [];
for (let i = 1; i <= 30; i++) allImages.push(`cards/${i}.jpg`);


function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}


startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  difficultyMenu.classList.remove("hidden");
});


document.querySelectorAll(".difficulty").forEach(btn => {
  btn.addEventListener("click", () => {
    difficultyMenu.classList.add("hidden");
    gameArea.classList.remove("hidden");
    startGame(btn.dataset.level);
  });
});


restartBtn.addEventListener("click", () => startGame(currentLevel));

menuBtn.addEventListener("click", () => {
  gameArea.classList.add("hidden");
  startScreen.classList.remove("hidden");
  statusText.textContent = "";
  board.innerHTML = "";
});


function startGame(level) {
  currentLevel = level;
  flipped = [];
  matched = [];
  board.innerHTML = "";
  statusText.textContent = "";

  let pairs;
  if (level === "easy") pairs = 4;
  else if (level === "medium") pairs = 6;
  else pairs = 15;

 
  const selected = shuffle([...allImages]).slice(0, pairs);
  cardValues = shuffle([...selected, ...selected]);

  
  const gridCols = Math.ceil(Math.sqrt(cardValues.length));
  board.style.gridTemplateColumns = `repeat(${gridCols}, 100px)`;

  
  cardValues.forEach(src => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = src;

    const img = document.createElement("img");
    img.src = src;
    img.classList.add("hidden");

    card.appendChild(img);
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}


function flipCard() {
  if (flipped.length === 2 || this.classList.contains("flipped")) return;

  const img = this.querySelector("img");
  img.classList.remove("hidden");
  this.classList.add("flipped");
  flipped.push(this);

  if (flipped.length === 2) checkMatch();
}


function checkMatch() {
  const [c1, c2] = flipped;
  if (c1.dataset.image === c2.dataset.image) {
    matched.push(c1, c2);
    c1.classList.add("matched");
    c2.classList.add("matched");
    flipped = [];

    if (matched.length === cardValues.length) {
      statusText.textContent = "🎉 You Win!";
    }
  } else {
    setTimeout(() => {
      c1.querySelector("img").classList.add("hidden");
      c2.querySelector("img").classList.add("hidden");
      c1.classList.remove("flipped");
      c2.classList.remove("flipped");
      flipped = [];
    }, 1000);
  }
}
