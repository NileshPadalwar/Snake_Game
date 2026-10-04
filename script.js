const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i")

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let sanakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = ` High Score: ${highScore}`;


const changeDirection = (e) => {

    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;

    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;

    } else if (e.key === "ArrowLeft" && velocityX != -1) {
        velocityX = -1;
        velocityY = 0;

    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
});

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
    clearInterval(setIntervalId)
    alert("Game Over! Press Ok to replay.....")
    location.reload();
}

const intGame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        sanakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);

        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = ` High Score: ${highScore}`;
    };

    for (let i = sanakeBody.length - 1; i > 0; i--) {
        sanakeBody[i] = sanakeBody[i - 1];

    }

    sanakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < sanakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${sanakeBody[i][1]} / ${sanakeBody[i][0]}"></div>`;
        if (i !== 0 && sanakeBody[0][1] === sanakeBody[i][1] && sanakeBody[0][0] === sanakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(intGame, 125);
document.addEventListener("keydown", changeDirection);