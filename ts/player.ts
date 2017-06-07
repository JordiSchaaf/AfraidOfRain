class Player{
    private html : HTMLElement = document.createElement('div');
    private className : string = 'player';
    private xPos : number = 0;
    private yPos : number = 0;
    private keyboardListener = new KeyListener;
    private _collision : Collision;
    public lives : number = 3;

    constructor(){
        const game = document.querySelector('#playerCanvas');
        this.html.className = this.className;
        game.appendChild(this.html);
        this.keyboardListener = new KeyListener();
    }

    public move(): void{
        const currentMovement = this.keyboardListener.keyevents;
        if(currentMovement.right && this.canMoveRight()){
            this.xPos += 5;
            this.html.classList.remove("player_left", "player_stand");
            this.html.classList.add("player_right");
        } else if(currentMovement.left && this.canMoveLeft()){
            this.xPos -=5;
            this.html.classList.remove("player_right", "player_stand");
            this.html.classList.add("player_left");
        } else if(!currentMovement.left && !currentMovement.right){
            this.html.classList.remove("player_left", "player_right");
            this.html.classList.add("player_stand");
        } 
        this.boundsChecker();
    }

    private boundsChecker(): void{
        if((this.xPos + this.html.getBoundingClientRect().width) > window.innerWidth){
            this.xPos = window.innerWidth - this.html.getBoundingClientRect().width;
        }
    }

    public render(): void{
        this.html.style.bottom = this.yPos + 'px';
        this.html.style.left = this.xPos + 'px';        
    }

    get el(): any{
        return this.html;
    }

    get playerX(): number {
        return this.xPos;
    } 

    private canMoveLeft(): boolean{
        if(this.xPos <= 0 ){
            return false;
        }else{
            return true;
        }
    }

    private canMoveRight(): boolean{
        if((this.xPos + this.html.getBoundingClientRect().width) >= window.innerWidth){
            return false;
        }else{
            return true;
        }
    }
}