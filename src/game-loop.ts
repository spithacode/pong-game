export class GameLoop{
    private static instance:GameLoop
    private constructor(){}

    private requestId?:number;
    private running:boolean = false;

    public start(callback:Function){

        this.running = true
        const loop = () => {
            callback()

            if(!this.running) return
            console.log("running ",this.requestId)
            this.requestId = requestAnimationFrame(loop)
        }
        loop()
    }
    public stop(){
        if(!this.requestId) return

        console.log("Ending game with id",this.requestId)

        cancelAnimationFrame(this.requestId)

        this.requestId =undefined
        this.running = false
    }

    public static getInstance(){
        if(this.instance) return this.instance
        this.instance = new GameLoop()
        return this.instance 

    }



}