import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Toxin extends BaseGameObject {
    name = "Toxin";

    // New property to manage random appearance/disappearance
    visibilityData = {
        timeToAppear: Math.random() * 3 + 2, // Random time between 3 and 8 seconds
        timeToDisappear: Math.random() * 3 + 2, // Random time between 3 and 8 seconds
        elapsedTime: 0, // Tracks elapsed time
        isVisible: false, // Initial state of the toxin (hidden)
    };

    update = function () {
        this.updateVisibility(); // Manage appearance/disappearance
    };

    // Manage random appearance and disappearance
    updateVisibility = function () {
        // If the game is won or over, stop managing visibility
        if (global.gameOver || global.gameWon) {
            return;
        }

        this.visibilityData.elapsedTime += global.deltaTime;

        if (this.visibilityData.isVisible) {
            if (this.visibilityData.elapsedTime >= this.visibilityData.timeToDisappear) {
                this.visibilityData.isVisible = false;
                this.visibilityData.elapsedTime = 0;
            }
        } else {
            if (this.visibilityData.elapsedTime >= this.visibilityData.timeToAppear) {
                this.visibilityData.isVisible = true;
                this.visibilityData.elapsedTime = 0;

                const canvasBounds = global.getCanvasBounds();
                this.x = Math.random() * (canvasBounds.right - this.width);
                this.y = Math.random() * (canvasBounds.bottom - this.height);
            }
        }
    };





    constructor(x, y, width, height, name) {
        super(x, y, width, height, name);
        let images = ["./images/toxin0.png", "./images/toxin1.png"];
        this.loadImages(images);
        this.collisionCount = 0; // Tracks collisions with toxins
        this.recentCollision = false;
    }
}

// Trigger Game Won
global.triggerGameWin = function () {
    global.gameWon = true;

    // Stop all toxins
    global.allGameObjects.forEach((gameObject) => {
        if (gameObject instanceof Toxin) {
            gameObject.visibilityData.isVisible = false;
        }
    });

    global.hideGameScreenAndShowResult("#game-won"); // Hides `#start-game` and shows Game Won
};

// Game over
global.triggerGameOver = function () {
    global.gameOver = true;

    // Stop all toxins
    global.allGameObjects.forEach((gameObject) => {
        if (gameObject instanceof Toxin) {
            gameObject.visibilityData.isVisible = false;
        }
    });

    global.hideGameScreenAndShowResult("#game-over"); // Hides `#start-game` and shows Game Over


};

export { Toxin };
