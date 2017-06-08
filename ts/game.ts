class Game {
    private _player : Player;
    private _raindrops : Array<Rain> = [];
    private _collision : Collision;
    private _active : boolean = true;
    private _score : number = 0;

    private _randomCounter: number = 0;

    private _counter: number = 0;
    private _wind: number = 0;

    private _lifebar : boolean = false;
    private _threehearts : boolean = false;
    private _twohearts : boolean = false;
    private _oneheart : boolean = false;

    constructor() {
        this._player = new Player;
        this._collision = new Collision(this);
    }
    private start(){
        this.loop();
    }

    private loop = () => {
        if(this._active){
            this.move();
            this.collide();
            this.difficulty();
            this.randomRain();
            this.drawLifebar();
            this.drawScore();
            this.render();
            this.adjust();
            this.gameCheck();
            setTimeout(this.loop, 1000/60);
        }
    }

    public render(){
        this._player.render();
        this._raindrops.forEach(raindrop => {
            raindrop.render();
        });
    }

    private move(){
        this._player.move();
        this._raindrops.forEach(raindrop => {
            raindrop.move();
        });
    }

    private collide(){
        this._collision.collide();
    }

     public adjust(): void{
        this._raindrops.forEach(raindrop => {
            if(raindrop.state == "dead"){
                this._raindrops.splice(this._raindrops.indexOf(raindrop),1);
                this._score++;
            }
        });
    }

    public gameCheck(){
        if(this.player.lives == 0){
            var GO = document.getElementById('gameOver');
            GO.style.visibility = 'visible';
            GO.style.display = 'block';
            document.getElementById('scoreText').innerHTML ="";
            document.getElementById('result').innerHTML="While trying to stay dry you dodged "+this._score.toString()+" droplets of rain!";

            document.getElementById('heart1').innerHTML="";
            document.getElementById('heart2').innerHTML="";
            document.getElementById('heart3').innerHTML="";
            document.getElementById('playerCanvas').innerHTML="";
            document.getElementById('rain').innerHTML="";
            document.getElementById('grass').innerHTML="";
            this._active = false;
        }
    }

    public finish(){

    }

    get player(): Player{
        return this._player;
    }

    get playerWidth(): number{
        return this._player.el.getBoundingClientRect().width;
    }

    get raindrops(): Array<Rain>{
        return this._raindrops;
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
            this._raindrops.push(new Rain(new Vector(this._wind, 10)));
        }
         
    }

    private difficulty(){
        this._counter += 1;
        if(this._counter % 600 === 0){
            this._wind = Math.round(Math.random() * 5 - 2);
        }
    }

    private drawLifebar(){
        var html1 : HTMLElement = document.createElement('div');
        var html2 : HTMLElement = document.createElement('div');
        var html3 : HTMLElement = document.createElement('div');

        if(!this._lifebar){
            const heart1 = document.querySelector('#heart1');
            html1.className = "lifebar";
            heart1.appendChild(html1);

            const heart2 = document.querySelector('#heart2');
            html2.className = "lifebar";
            heart2.appendChild(html2);

            const heart3 = document.querySelector('#heart3');
            html3.className = "lifebar";
            heart3.appendChild(html3);

            this._lifebar = true;
        }
        if(!this._threehearts && this._player.lives == 3){
            html1.classList.add("heart");
            html2.classList.add("heart");
            html3.classList.add("heart");

            this._threehearts = true;
        }

        if(!this._twohearts && this._player.lives == 2){
            document.getElementById('heart3').innerHTML="";
            const heart3 = document.querySelector('#heart3');
            html3.classList.add("lifebar", "noheart");
            heart3.appendChild(html3);

            this._twohearts = true;
        }

        if(!this._oneheart && this._player.lives == 1){
            document.getElementById('heart2').innerHTML="";
            const heart2 = document.querySelector('#heart2');
            html2.classList.add("lifebar", "noheart");
            heart2.appendChild(html2);

            this._oneheart = true;
        }        
    }

    private drawScore(){
        document.getElementById('scoreText').innerHTML = this._score.toString();
    }

}