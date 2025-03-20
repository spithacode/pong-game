import { IGameEntity } from "./game-entity";
import { InputManager } from "@spithacode/input-manager";
import { HIGHT } from "./main";

export class Paddle implements IGameEntity {
    // Base speed in pixels per second
    private baseSpeed = 300;
    private ratio = 4;
    
    constructor(
        public x: number,
        public y: number,
        public size: number,
        private inputManager: InputManager,
        private keys: [string, string] // [upKey, downKey]
    ) {}

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(
            this.x, // x
            this.y, // y
            this.size, // width
            this.getHight() // height
        );
    }
    
    private keepInBoundaries() {
        if (this.y + this.size * 4 >= HIGHT) this.y = HIGHT - this.size * 4; 
        if (this.y <= 0) this.y = 0; 
    }

    public update(dt: number) {
        this.keepInBoundaries();
        
        // Check if up key is pressed
        if (this.inputManager.isKeyPressed(this.keys[0])) {
            this.y -= this.baseSpeed * dt;
        }
        
        // Check if down key is pressed
        if (this.inputManager.isKeyPressed(this.keys[1])) {
            this.y += this.baseSpeed * dt;
        }
    }
    
    public getHight() {
        return this.size * this.ratio;
    }
}