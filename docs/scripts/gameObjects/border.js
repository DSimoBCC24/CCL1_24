import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Border extends BaseGameObject {
    name = "Border";

    constructor(x, y, width, height) {
        super(x, y, width, height);
        // No need to load an image; we'll draw a rectangle instead
    }


    draw = function () {
        // Set transparency and color for the rectangle
        global.ctx.fillStyle = "rgba(255, 0, 0, 0)"; // Red color with 50% opacity
        global.ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the rectangle
    };
}

export { Border };
