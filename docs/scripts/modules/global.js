const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.score = 0;
global.health = 100;
global.gameWon = false;
global.gameOver = false;


global.showSection = function (sectionId) {
    // Hide all sections
    document.querySelectorAll("section").forEach((section) => {
        section.style.display = "none";
    });

    // Show the specified section
    const section = document.querySelector(sectionId);
    if (section) {
        section.style.display = "block";
    }
}

// Handle Start Button
document.getElementById("start-button").addEventListener("click", () => {
    global.showSection("#start-game"); // Show the game section
});



// Hide `#start-game` before showing Game Over or Game Won
global.hideGameScreenAndShowResult = function (sectionId) {
    // Hide the game screen (`#start-game`)
    document.getElementById("start-game").style.display = "none";

    // Show the respective result section
    global.showSection(sectionId);
}

// Update Game Over to hide the game screen
global.triggerGameOver = function () {
    global.hideGameScreenAndShowResult("#game-over"); // Hides `#start-game` and shows Game Over
};

// Update Game Win to hide the game screen
global.triggerGameWin = function () {
    global.hideGameScreenAndShowResult("#game-won"); // Hides `#start-game` and shows Game Won
};

// Default to Game Intro on Page Load
document.addEventListener("DOMContentLoaded", () => {
    global.showSection("#game-intro"); // Show the game intro section
});




global.updateScoreDisplay = function () {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `${global.score} nutrients collected`;
}

global.updateHealthDisplay = function () {
    const healthElement = document.getElementById('health'); // Get the health DOM element
    healthElement.textContent = `${global.health}%`; // Update the text content
};



global.getCanvasBounds = function () {
    let bounds = {
        "left": 0,
        "right": this.canvas.width,
        "top": 0,
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {


    for (let i = 0; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];

        // Ensure both objects are active and not in recent collision cooldown
        if (
            otherObject.active == true &&
            givenObject.active == true &&
            !givenObject.recentCollision &&
            !otherObject.recentCollision
        ) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);

            if (collisionHappened) {
                console.log("Collision detected between:", givenObject.name, "and", otherObject.name);

                // Call collision handling for both objects
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);

                // Set collision cooldown for both objects
                givenObject.recentCollision = true;
                otherObject.recentCollision = true;

                // Reset collision cooldown after 200ms
                setTimeout(() => {
                    givenObject.recentCollision = false;
                    otherObject.recentCollision = false;
                }, 200);
            }
        }
    }
};



global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom &&
            box1.left <= box2.right &&
            box1.bottom >= box2.top &&
            box1.right >= box2.left) {
            return true;
        }
    }
    return false;
}














export { global }