const boardBorder = "green";
const boardBackground = "black";
const snakeColor = "lightgreen";
const snakeBorder = "darkgreen";
const foodColor = "red";
const board = document.getElementById("gameBoard");
const ctx = board.getContext("2d");

let blockSize = 20;
let boardWidth = board.width;
let boardHeight = board.height;

let snake;
let foodX;
let foodY;
let dx;
let dy;
let score;
let gameRunning = false;

document.addEventListener("keydown", changeDirection);

function initSnakeGame(endCallback) {
    snake = [{ x: blockSize * 5, y: blockSize * 5 }];
    dx = blockSize;
    dy = 0;
    score = 0;
    genFood();
    gameRunning = true;
    main(endCallback);
}

function main(endCallback) {
    if (!gameRunning || hasGameEnded(endCallback)) return;
    setTimeout(function onTick() {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        main(endCallback);
    }, 100);
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, boardWidth, boardHeight);
    ctx.strokeStyle = boardBorder;
    ctx.strokeRect(0, 0, boardWidth, boardHeight);
}

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(part.x, part.y, blockSize, blockSize);
        ctx.strokeStyle = snakeBorder;
        ctx.strokeRect(part.x, part.y, blockSize, blockSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === foodX && head.y === foodY) {
        score++;
        genFood();
    } else {
        snake.pop();
    }
}

function hasGameEnded(endCallback) {
    const head = snake[0];
    if (head.x < 0 || head.x >= boardWidth || head.y < 0 || head.y >= boardHeight) {
        gameRunning = false;
        endCallback(score);
        return true;
    }
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameRunning = false;
            endCallback(score);
            return true;
        }
    }
    return false;
}

function changeDirection(event) {
    const LEFT_KEY = 37, RIGHT_KEY = 39, UP_KEY = 38, DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -blockSize;
    const goingDown = dy === blockSize;
    const goingRight = dx === blockSize;
    const goingLeft = dx === -blockSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -blockSize; dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0; dy = -blockSize;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = blockSize; dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0; dy = blockSize;
    }
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / blockSize) * blockSize;
}

function genFood() {
    foodX = randomTen(0, boardWidth - blockSize);
    foodY = randomTen(0, boardHeight - blockSize);
    snake.forEach(function isFoodOnSnake(part) {
        if (part.x === foodX && part.y === foodY) genFood();
    });
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, blockSize, blockSize);
}


SnakePopup.showStartModal(() => {
    initSnakeGame((score) => {
        SnakePopup.showGameOverModal(score);
    });
});
