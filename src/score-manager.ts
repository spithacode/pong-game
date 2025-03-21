import { IGameEntity } from "./game-entity";
import { getGameLoop } from "@spithacode/game-loop";
import { MARGIN, WIDTH } from "./main";

export class ScoreManager implements IGameEntity {
    private static instance: ScoreManager;
    public leftPlayerScore = 0;
    public rightPlayerScore = 0;
    private gameLoop;

    private constructor() {
        this.gameLoop = getGameLoop();
    }
    
    public static getInstance() {
        if (this.instance) return this.instance;
        this.instance = new ScoreManager();
        return this.instance;
    }
    
    update(dt: number): void {
        // Score manager doesn't need to use dt
    }
    
    public incrementScore(player: "left" | "right") {
        if (player === "left") {
            this.leftPlayerScore++;
        } else if (player === "right") {
            this.rightPlayerScore++;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.font = "25px Arial";
        if (this.leftPlayerScore >= 10) {
            ctx.fillText("Left Player wins", WIDTH / 2, MARGIN);
            ctx.closePath();
            console.log(this.gameLoop);
            this.gameLoop.stop();
            return;
        }
        
        if (this.rightPlayerScore >= 10) {
            ctx.fillText("Right Player wins", WIDTH / 2, MARGIN);
            ctx.closePath();
            this.gameLoop.stop();
            return;
        }

        ctx.fillText(`Score : ${this.leftPlayerScore} | ${this.rightPlayerScore}`, WIDTH / 2, MARGIN);
        ctx.closePath();
    }
}