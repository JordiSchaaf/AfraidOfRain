class WindowListener{
    private _windowHeight : number;
    private _windowWidth : number;

    constructor(){
        this.listen(0);
    }


    public listen(interval: number): void{
        const bge = document.documentElement;
        const bg = document.getElementById('#playerCanvas');
        this._windowWidth = window.innerWidth||bge.clientWidth||bg.clientWidth;
        this._windowHeight = window.innerHeight||bge.clientHeight||bg.clientHeight;
    }

    get windowHeight(): number{
        return this._windowHeight;
    }

    get windowWidth(): number{
        return this._windowWidth;
    }
}