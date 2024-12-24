import { IGameEntity } from "./game-entity";
import { HIGHT, WIDTH } from "./main";
import { Paddle } from "./paddle";

export class Ball implements IGameEntity{

    private velocity:{x:number,y:number} = {x:2,y:-1}
    constructor(
        public x: number,
        public y: number,
        public radius: number,

    ){

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
    update(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        const isCollidingWithUpperBound = this.y - this.radius <= 0 ;
        const isCollidingWithLowerBound = this.y + this.radius >= HIGHT;

        if(isCollidingWithLowerBound || isCollidingWithUpperBound) this.velocity.y *= -1;


    }

}