/** Class representing a keyboardListener */
class KeyListener
{
     private _keyevents : any = {left:false, right:false} //should be dynamic

    /**
     * Create a keyboardListener
     */
    constructor() {
        window.addEventListener("keydown", this.keyUpDownHandler);
        window.addEventListener("keyup", this.keyUpDownHandler);
    }

    /**
    * Keyboard handler
    * @param {KeyboardEvent} e - event object
    */
    private keyUpDownHandler = (e : KeyboardEvent) => {
      if(e.type == 'keydown'){
        if (e.key == 'ArrowLeft') {this._keyevents.left = true}
        else if (e.key == 'ArrowRight') {this._keyevents.right = true}
      }

      if(e.type == 'keyup'){
        if (e.key == 'ArrowLeft') {this._keyevents.left = false}
        else if (e.key == 'ArrowRight') {this._keyevents.right = false}
      }

      
    }

    /**
    * Get the keyevents
    * @return {any} The keyevent value
    */
    get keyevents(): any{
      return this._keyevents;
    }

}
