class Vector {
    private _x : number;
    private _y : number;

    constructor(x = 0, y = 0){
        this._x = x;
        this._y = y;
    }

    public x(): number{
        return this._x;
    }

    public y(): number{
        return this._y;
    }

    public add(input: Vector) : Vector
    {
        return new Vector(
            this._x + input.x(),
            this._y + input.y()
        );
    }

    public scale(scalar: number) : Vector
    {
        return new Vector(
            this._x * scalar,
            this._y * scalar
        );
    }
}

