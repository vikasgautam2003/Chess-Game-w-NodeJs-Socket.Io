const startModal = document.getElementById("startModal");
const gameOverModal = document.getElementById("gameOverModal");
const startBtn = document.getElementById("startBtn");
const finalScoreEl = document.getElementById("finalScore");

let gameStartCallback = null;

startBtn.addEventListener("click", () => {
    startModal.style.display = "none";
    if (typeof gameStartCallback === "function") {
        gameStartCallback();
    }
});

function showStartModal(startCallback) {
    gameStartCallback = startCallback;
    startModal.style.display = "flex";
}

function showGameOverModal(score) {
    finalScoreEl.textContent = "Score: " + score;
    gameOverModal.style.display = "flex";
}

window.SnakePopup = {
    showStartModal,
    showGameOverModal
};
