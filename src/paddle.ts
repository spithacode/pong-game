import { Ball } from "./ball";
import { IGameEntity } from "./game-entity";
import { InputManager } from "./inputManager";
import { HIGHT } from "./main";

export class Paddle implements IGameEntity{

    private speed = 5;
    private ratio = 4;
    constructor(
        public x: number,
        public y: number,
        public size: number,

        private inputManager:InputManager,
        private inputType: "LETTERS" | "ARROW"


    ){

    }

         draw(ctx: CanvasRenderingContext2D) {

            ctx.fillStyle = 'white'
            ctx.fillRect(
            this.x // x
            ,this.y // y
            ,this.size // width
            ,this.getHight() // height
            );

        }
        
        private keepInBoundaries(){
            if(this.y + this.size*4>= HIGHT) this.y = HIGHT - this.size*4; 
            if(this.y <= 0) this.y = 0; 

        }

        public update(){
            this.keepInBoundaries()
            const action = this.inputManager?.getCurrentAction(this.inputType)
            console.log("paddle",action)

            if(!action) return

            if(action.type === "MOVE_UP"){
                this.y -= this.speed // adding a speed vector
            }else if(action.type === "MOVE_DOWN"){
                this.y += this.speed
            }

        }
        public getHight(){
            return this.size * this.ratio;

        }

}