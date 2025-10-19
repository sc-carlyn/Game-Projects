const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreEl = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
const scoreboard = document.querySelector(".scoreboard");
const scoreEl = document.getElementById("score");

let snake = [];
let snakeLength = 5;
let direction = "RIGHT";
let food = {};
let score = 0;
let gameInterval;

function initGame() {
  snake = [];
  snakeLength = 5;
  direction = "RIGHT";
  score = 0;
  scoreEl.textContent = score;

  for (let i = snakeLength - 1; i >= 0; i--) {
    snake.push({ x: i * 20, y: 0 });
  }

  spawnFood();
  menu.style.display = "none";
  gameOverScreen.style.display = "none";
  canvas.style.display = "block";
  scoreboard.style.display = "block";

  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 100);
}

function spawnFood() {
  const gridSize = 20;
  food = {
    x: Math.floor((Math.random() * canvas.width) / gridSize) * gridSize,
    y: Math.floor((Math.random() * canvas.height) / gridSize) * gridSize,
  };
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff80" : "#009955";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00ff80";
    ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
    ctx.shadowBlur = 0;
  }
}

function drawFood() {
  ctx.fillStyle = "#ff4040";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#ff4040";
  ctx.fillRect(food.x, food.y, 20, 20);
  ctx.shadowBlur = 0;
}

function moveSnake() {
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "RIGHT") headX += 20;
  else if (direction === "LEFT") headX -= 20;
  else if (direction === "UP") headY -= 20;
  else if (direction === "DOWN") headY += 20;

  const newHead = { x: headX, y: headY };

  // Duvara çarpma
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height
  ) {
    gameOver();
    return;
  }

  // Kendi kendine çarpma
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
      gameOver();
      return;
    }
  }

  snake.unshift(newHead);

  // Yem yeme
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    scoreEl.textContent = score;
    spawnFood();
  } else {
    snake.pop();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  drawSnake();
  drawFood();
}

function gameOver() {
  clearInterval(gameInterval);
  finalScoreEl.textContent = score;
  gameOverScreen.style.display = "block";
  canvas.style.display = "none";
  scoreboard.style.display = "none";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

startBtn.addEventListener("click", initGame);
restartBtn.addEventListener("click", initGame);
