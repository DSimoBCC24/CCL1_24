import { global } from "./global.js";

function move(event) {
    switch (event.key) {
        case "d":
            global.playerObject.xVelocity = 250;
            global.playerObject.yVelocity = 0;
            global.playerObject.animationData.firstSpriteIndex = 3;
            global.playerObject.animationData.lastSpriteIndex = 4;
            global.playerObject.animationData.currentSpriteIndex = 5;
            break;
        case "a":
            global.playerObject.xVelocity = -250;
            global.playerObject.yVelocity = 0;
            global.playerObject.animationData.firstSpriteIndex = 6;
            global.playerObject.animationData.lastSpriteIndex = 7;
            global.playerObject.animationData.currentSpriteIndex = 8;
            break;
        case "w":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = -250;
            global.playerObject.animationData.firstSpriteIndex = 0;
            global.playerObject.animationData.lastSpriteIndex = 1;
            global.playerObject.animationData.currentSpriteIndex = 2;
            break;
        case "s":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 250;
            global.playerObject.animationData.firstSpriteIndex = 9;
            global.playerObject.animationData.lastSpriteIndex = 10;
            global.playerObject.animationData.currentSpriteIndex = 11;
            break;
    }
}

function stop() {
    global.playerObject.xVelocity = 0;
    global.playerObject.yVelocity = 0;
}

document.addEventListener("keypress", move);
//document.addEventListener("keyup", stop);