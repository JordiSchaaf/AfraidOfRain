class Game {
    private _player : Player;


    constructor() {
        this._player = new Player;
    }
    private start(){
        this.loop();
    }

    private loop = () => {
        this.move();
        this.render();
        setTimeout(this.loop, 1000/60);
    }

    public render(){
        this._player.render();
    }

    public move(){
        this._player.move();
    }

    get player(): Player{
        return this._player;
    }
}