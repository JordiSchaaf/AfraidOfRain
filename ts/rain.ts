class Rain{
    public html : HTMLElement = document.createElement('div');
    private className : string = 'rain';
    public state : string = "alive";
    
    position : Vector;
    speed : Vector;
    velocity : number = 1;

    constructor(speed = new Vector){
        const game = document.querySelector('#rain');
        this.html.className = this.className;
        game.appendChild(this.html);
        let rect = this.html.getBoundingClientRect();
        this.position = new Vector(Math.round(Math.random() * window.innerWidth), -28);
        this.speed = speed;
    }

    public move(): void{
        let displacement = this.speed.scale(this.velocity);
        this.position = this.position.add(displacement);
    }
    
    public render(): void{
        this.boundsChecker();
        this.html.style.top = this.position.y() + 'px';
        this.html.style.left = this.position.x() + 'px';  
    }

    get raindropY(): number{
        return this.position.y();
    }

    get raindropX(): number{
        return this.position.x();
    }

    get el(): any{
        return this.html;
    }

    private boundsChecker(){
        if(this.position.y() > window.innerHeight && this.state == "alive"){
            this.state = "dead";
            this.html.parentNode.removeChild(this.html);
        }
    }
}