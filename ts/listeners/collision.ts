class Collision{
    private _game: Game;
    private xCollision : boolean;
    private yCollision : boolean;


    constructor(game: Game){
        this._game = game;
    }

    public collide(){
        const player = this._game.player;
        var playerheight = window.innerHeight - this._game.player.el.getBoundingClientRect().top;

        if(player.playerX < (this._game.raindropX + this._game.raindropWidth) && (player.playerX + this._game.playerWidth) > this._game.raindropX){
            this.xCollision = true;
            console.log("natX");
            console.dir(this.xCollision);
        }

        // if(this._game.player.el.getBoundingClientRect().top == this._game.raindropY){
        //     this.yCollision = true;
        //     console.log("natY");
        //     console.dir(this.yCollision);
        // }

    }
    
}