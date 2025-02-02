import { global } from "./global.js";
import { Biota } from "../gameObjects/biota.js";
import { Border } from "../gameObjects/border.js";
import { Nutrients } from "../gameObjects/nutrients.js";
import { Toxin } from "../gameObjects/toxin.js";

function gameLoop(totalRunningTime) {
    if (global.gameOver || global.gameWon) {
        console.log("Game stopped. Use restartGame to restart.");
        return; // Stop the game loopÍ
    }

    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.

    // Clear the canvas for the next frame
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    // Update and render game objects
    for (var i = 0; i < global.allGameObjects.length; i++) {
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].draw();
        }
    }

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}



function setupGame() {
   let map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 1]
    ];

    for (let i = 0; i < map.length; i++) {
        let innerArray = map[i];
        for (let j = 0; j < innerArray.length; j++) {
            if (innerArray[j] == 1) {
                new Border(j * 100, i * 100, 80, 80);
            }
            else if (innerArray[j] == 0) {
                new Nutrients(j * 100, i * 100, 40, 40);
            }
        }
    }
    global.playerObject = new Biota(680, 830, 60, 60);

    new Toxin (600, 620, 40, 40);
    new Toxin (800, 720, 40, 40);
    new Toxin (200, 520, 40, 40);
    new Toxin (400, 540, 40, 40);
    new Toxin (800, 540, 40, 40);
    new Toxin (800, 340, 40, 40);

}

global.restartGame = function () {
    console.log("Restarting game...");

    // Reset global state
    global.gameOver = false;
    global.gameWon = false;
    global.score = 0;
    global.health = 100;

    // Clear canvas
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    // Clear game objects
    global.allGameObjects = [];

    // Reinitialize the game
    setupGame();

    // Update UI
    global.updateScoreDisplay();
    global.updateHealthDisplay();

    // Restart the game loop
    global.prevTotalRunningTime = performance.now();
    //requestAnimationFrame(gameLoop);
};

document.addEventListener("DOMContentLoaded", () => {
    // Attach restart button event listeners
    const restartButtonGameOver = document.getElementById("restart-button-game-over");
    const restartButtonGameWon = document.getElementById("restart-button-game-won");

    if (restartButtonGameOver) {
        restartButtonGameOver.addEventListener("click", () => {
            window.location.reload(); // Reloads the page
        });
    }

    if (restartButtonGameWon) {
        restartButtonGameWon.addEventListener("click", () => {
            window.location.reload(); // Reloads the page
        });
    }
});



setupGame();
requestAnimationFrame(gameLoop);



