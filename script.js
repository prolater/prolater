let player = document.getElementById("player");
let gameArea = document.getElementById("gameArea");
let scoreElement = document.getElementById("score");
let coinsContainer = document.getElementById("coins");

let score = 0;
let gameInterval;
let coinInterval;

function startGame() {
    score = 0;
    player.style.left = "135px"; // ÅÚÇÏÉ ÇááÇÚÈ áãßÇäå
    player.style.bottom = "0px"; // ÅÚÇÏÉ ÇááÇÚÈ Åáì ÇáÃÓÝá

    gameInterval = setInterval(moveObstacle, 10); // ÍÑßÉ ÇáÚÞÈÉ
    coinInterval = setInterval(createCoin, 2000); // ÅÖÇÝÉ ÚãáÇÊ ÌÏíÏÉ ßá 2 ËÇäíÉ
}

function moveObstacle() {
    let obstacles = document.querySelectorAll(".obstacle");
    obstacles.forEach(obstacle => {
        let obstacleTop = parseInt(obstacle.style.top);

        if (obstacleTop < gameArea.offsetHeight) {
            obstacle.style.top = obstacleTop + 2 + "px"; // ÍÑßÉ ÇáÚÞÈÉ Åáì ÇáÃÓÝá
        } else {
            obstacle.style.top = "-30px"; // ÅÚÇÏÉ ÇáÚÞÈÉ ááÃÚáì
            obstacle.style.left = Math.random() * (gameArea.offsetWidth - 30) + "px"; // ÊÛííÑ ãßÇä ÇáÚÞÈÉ ÚÔæÇÆíðÇ
        }

        checkCollision(obstacle);
    });

    checkCollisionWithCoins();
}

function checkCollision(obstacle) {
    let playerPosition = player.getBoundingClientRect();
    let obstaclePosition = obstacle.getBoundingClientRect();

    if (playerPosition.left < obstaclePosition.right &&
        playerPosition.right > obstaclePosition.left &&
        playerPosition.top < obstaclePosition.bottom &&
        playerPosition.bottom > obstaclePosition.top) {
        gameOver();
    }
}

function checkCollisionWithCoins() {
    let playerPosition = player.getBoundingClientRect();
    let coins = document.querySelectorAll(".coin");

    coins.forEach(coin => {
        let coinPosition = coin.getBoundingClientRect();
        if (playerPosition.left < coinPosition.right &&
            playerPosition.right > coinPosition.left &&
            playerPosition.top < coinPosition.bottom &&
            playerPosition.bottom > coinPosition.top) {
            coin.remove();
            score++;
        }
    });

    updateScore();
}

function createCoin() {
    let coin = document.createElement("div");
    coin.classList.add("coin");
    coin.style.left = Math.random() * (gameArea.offsetWidth - 20) + "px";
    coinsContainer.appendChild(coin);
}

function updateScore() {
    scoreElement.textContent = "Score: " + score;
}

function gameOver() {
    clearInterval(gameInterval);
    clearInterval(coinInterval);
    alert("Game Over! Your score is " + score);
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && parseInt(player.style.left) > 0) {
        player.style.left = parseInt(player.style.left) - 30 + "px";
    } else if (event.key === "ArrowRight" && parseInt(player.style.left) < gameArea.offsetWidth - 30) {
        player.style.left = parseInt(player.style.left) + 30 + "px";
    } else if (event.key === "ArrowUp" && parseInt(player.style.bottom) === 0) {
        player.style.bottom = "60px";
        setTimeout(() => player.style.bottom = "0px", 300);
    }
});

startGame();
