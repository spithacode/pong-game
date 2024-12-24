type Action = {
    type: "MOVE_UP" |"MOVE_DOWN",
    inputType?:"ARROW"|"LETTERS"
}

export  class InputManager{
    public actions:Action[] =[];
    constructor(){
        window.addEventListener("keydown",event=>{
            this.keyDownHandler(event);


        })
        window.addEventListener("keyup",event=>{
            this.keyUpHandler(event);
        })

    }

    public getCurrentAction(inputType?:Action['inputType']):Action|null{
        let filteredActions = this.actions;

        if(inputType){
            filteredActions = this.actions.filter(a=>a.inputType === inputType)
        }

        if(filteredActions.length === 0) return null
        return filteredActions[0]
    }
    private keyDownHandler(event: KeyboardEvent) {
        switch(event.code){

            // MOVE_UP------------------------------ 
            case "ArrowUp":
                this.addAction({type:"MOVE_UP",inputType:"ARROW"})
                break;
            case "KeyW":
                this.addAction({type:"MOVE_UP",inputType:"LETTERS"})
                break;

            // MOVE_DOWN---------------------------- 
            case "ArrowDown":
                this.addAction({   type:"MOVE_DOWN",inputType:"ARROW"})
                break;
                break;

            case "KeyS":
                this.addAction({type:"MOVE_DOWN",inputType:"LETTERS"})
                break;

        }

    }

    private keyUpHandler(event: KeyboardEvent) {

            console.log("delete",event.code)
        switch(event.code){

            // MOVE_UP------------------------------ 
            case "ArrowUp":
                this.deleteAction({type:"MOVE_UP",inputType:"ARROW"})
                break;
                break;

            case "KeyW":

                this.deleteAction({type:"MOVE_UP",inputType:"LETTERS"})
                break;

            // MOVE_DOWN---------------------------- 
            case "KeyS":
                this.deleteAction({type:"MOVE_DOWN",inputType:"ARROW"})
                break;

            case "ArrowDown":
                this.deleteAction({type:"MOVE_DOWN",inputType:"ARROW"})
                break;

        }
    }

    private deleteAction(action:Action){
        const index = this.actions.findIndex(a => a.type === action.type)
        if(index === -1) return
        this.actions.splice(index,1)
    }
    private addAction(action:Action){
        if(this.actions.find(a => a.type === action.type)) return
        this.actions.push(action)

    }

}


