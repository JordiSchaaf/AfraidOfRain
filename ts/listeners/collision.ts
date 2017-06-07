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

        this._game.raindrops.forEach(raindrop => { 
            if(player.playerX < (raindrop.raindropX + this._game.raindropWidth) && (player.playerX + this._game.playerWidth) > raindrop.raindropX && playerheight >= (window.innerHeight - raindrop.raindropY)){
                raindrop.state = "hit";
                 if(raindrop.state = "hit"){
                    raindrop.html.parentElement.removeChild(raindrop.el);
                    this._game.raindrops.splice(this._game.raindrops.indexOf(raindrop),1);
                    this._game.player.lives--;
                }
                

            }
           
            
        });
    }
   
}