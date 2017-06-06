class Game {
    private _player : Player;
    private _raindrops : Array<Rain> = [];
    private _windowListener: WindowListener;
    private _collision: Collision;

    private _randomCounter: number = 0;

    constructor() {
        this._player = new Player;
        this._windowListener = new WindowListener();
        this._collision = new Collision(this);
    }
    private start(){
        this.loop();
    }

    private loop = () => {
        this.move();
        this.collide();
        this.randomRain();
        this.render();
        this.adjust();
        setTimeout(this.loop, 1000/60);
    }

    public render(){
        this._player.render();
        this._raindrops.forEach(raindrop => {
            raindrop.render();
        });
    }

    public move(){
        this._player.move();
        this._raindrops.forEach(raindrop => {
            raindrop.move();
        });
    }

    private collide(){
        this._collision.collide();
    }

    private adjust(): void{
        this._raindrops.forEach(raindrop => {
            if(raindrop.state == "dead"){
                this._raindrops.splice(this._raindrops.indexOf(raindrop),1);
            }
        });
    }

    get player(): Player{
        return this._player;
    }

    get playerWidth(): number{
        return this._player.el.getBoundingClientRect().width;
    }

    get windowListener(): WindowListener{
        return this._windowListener;
    }

    get raindropX(): number{
        var x;
        this._raindrops.forEach(raindrop => {
            x = raindrop.position.x();
        });
        return x;
    }

    get raindropY(): number{
        var y;
        this._raindrops.forEach(raindrop => {
            y = raindrop.raindropY;
        });
        return y;
    }

    get raindropWidth(): number {
        var width;
        this._raindrops.forEach(raindrop => {
            width = raindrop.el.getBoundingClientRect().width;
        })
        return width;
    }

    private randomRain(){
        this._randomCounter += 1;

        if(this._randomCounter == 4){
            this._randomCounter = 0;
            this._raindrops.push(new Rain(new Vector(0, 10)));
        } 
    }
}