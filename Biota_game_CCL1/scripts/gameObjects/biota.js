import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Biota extends BaseGameObject {
    name = "Biota";
    xVelocity = 0;
    yVelocity = 0;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 2,
        "currentSpriteIndex": 0
    };


    update = function () {
        // Stop Biota's movement if the game is won
        if (global.gameWon) {
            this.xVelocity = 0;
            this.yVelocity = 0;
            return;
        }

        // Normal movement update logic
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        this.screenWrap();
    };



    screenWrap = function () {
        let canvasBounds = global.getCanvasBounds();
        let pacManBounds = this.getBoxBounds();
        if (pacManBounds.left >= canvasBounds.right) {
            this.x = canvasBounds.left - this.width;
        }
        else if (pacManBounds.right <= canvasBounds.left) {
            this.x = canvasBounds.right;
        }
        else if (pacManBounds.bottom <= canvasBounds.top) {
            this.y = canvasBounds.bottom;
        }
        else if (pacManBounds.top >= canvasBounds.bottom) {
            this.y = canvasBounds.top - this.height;
        }
    }

    reactToCollision = function (collidingObject) {
        switch (collidingObject.name) {
            case "Border":
                this.xVelocity = 0;
                this.yVelocity = 0;
                this.x = this.previousX;
                this.y = this.previousY;
                break;

            case "Nutrients":
                collidingObject.active = false; // Deactivate the collected nutrient
                global.score += 10; // Increase the score
                global.updateScoreDisplay(); // Update the score display

                // Check if all nutrients are collected
                const remainingNutrients = global.allGameObjects.filter(
                    (obj) => obj.name === "Nutrients" && obj.active).length;

                if (remainingNutrients === 0) {
                    console.log("Game Won: All nutrients collected!");
                    global.triggerGameWin(); // Trigger the Game Won logic
                }
                break;




            case "Toxin":
                // Prevent multiple rapid collisions using recentCollision flag
                if (this.recentCollision) return; // Skip if a recent collision was already handled
                this.recentCollision = true; // Set the flag
                setTimeout(() => (this.recentCollision = false), 200); // Reset after 200ms

                // Increment collision count
                this.collisionCount++;

                // Reduce health by 50 per collision
                global.health = Math.max(0, global.health - 25); // Clamp health to a minimum of 0
                global.updateHealthDisplay(); // Update the health bar



                // Trigger Game Over logic only on the second collision
                if (this.collisionCount === 4) {
                    this.active = false; // Deactivate Biota
                    global.triggerGameOver(); // Trigger the Game Over logic



                }
                break;


        }
    };

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/biota-test-sprites.png", 3, 4);
        this.collisionCount = 0; // Tracks collisions with toxins
        this.recentCollision = false;
    }
}
export { Biota }