import { IGameEntity } from "./game-entity";
import { HIGHT, WIDTH } from "./main";
import { Paddle } from "./paddle";

export class Ball implements IGameEntity{
    // Base speed in pixels per second
    private baseSpeed = 300;
    private velocity:{x:number,y:number} = {x:2,y:-1}
    constructor(
        public x: number,
        public y: number,
        public radius: number,

    ){
        // Normalize velocity direction
        const magnitude = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        this.velocity.x /= magnitude;
        this.velocity.y /= magnitude;
    }
    draw(ctx:CanvasRenderingContext2D){
        console.log("draw circle",{
            this:this

        })

        ctx.beginPath()
        ctx.fillStyle = "white";
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
        )
        ctx.fill()




    }
    public invertXVelocity(){
        this.velocity.x *=-1

    }
    update(dt: number){
        // Move based on velocity and delta time (dt in seconds)
        this.x += this.velocity.x * this.baseSpeed * dt;
        this.y += this.velocity.y * this.baseSpeed * dt;

        const isCollidingWithUpperBound = this.y - this.radius <= 0 ;
        const isCollidingWithLowerBound = this.y + this.radius >= HIGHT;

        if(isCollidingWithLowerBound || isCollidingWithUpperBound) this.velocity.y *= -1;


    }

}