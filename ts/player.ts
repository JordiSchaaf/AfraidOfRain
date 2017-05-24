class Player{
    private sprite : any = document.createElement('img');
    private className : string = 'player';
    private xPos : number = 0;
    private yPos : number = 0;
    private keyboardListener = new KeyListener;

    constructor(){
        const game = document.querySelector('.player');
        this.sprite.setAttribute('src', './assets/images/player.png');
        this.sprite.className = 'player';
        game.appendChild(this.sprite);
        this.keyboardListener = new KeyListener();
    }

    public move(){
        const currentMovement = this.keyboardListener.keyevents;
        if(currentMovement.right == true){
            this.xPos += 10;
            this.sprite.setAttribute('src', './assets/images/playerRight.png')
        } else if(currentMovement.left == true){
            this.xPos -=10;
            this.sprite.setAttribute('src', './assets/images/player.png');
        }
    }


    public render(){
        this.sprite.style.bottom = this.yPos + 'px';
        this.sprite.style.left = this.xPos + 'px';        
    }

    get el(): any{
        return this.sprite;
    }
}