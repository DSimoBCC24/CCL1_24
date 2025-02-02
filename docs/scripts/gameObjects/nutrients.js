import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Nutrients extends BaseGameObject {
    name = "Nutrients";

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 25,
            right: this.x + this.width - 25,
            top: this.y + 25,
            bottom: this.y + this.height - 25
        }
        return bounds;
    };

    reactToCollision = function (collidingObject) {
        switch (collidingObject.name) {
            case "Biota":
                this.active = false;
                break;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/broccoli.png"]);
    }

}

export { Nutrients }