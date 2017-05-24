var Game = (function () {
    function Game() {
        var _this = this;
        this._el = document.querySelector('#canvas');
        this.loop = function () {
            _this.move();
            _this.render();
            setTimeout(_this.loop, 1000 / 60);
        };
        this._player = new Player('player');
    }
    Game.prototype.start = function () {
        this.loop();
    };
    Game.prototype.render = function () {
        this._player.render();
    };
    Game.prototype.move = function () {
        this._player.move();
    };
    Object.defineProperty(Game.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    return Game;
}());
var app = {};
(function () {
    var init = function () {
        app.game = new Game();
        app.game.start();
    };
    window.addEventListener('load', init);
})();
var Player = (function () {
    function Player(className) {
        this._el = document.createElement('div');
        this._xPos = 0;
        this._yPos = 100;
        this.className = className;
        this._keyboardListener = new KeyListener();
    }
    Player.prototype.move = function () {
        var currentMovement = this._keyboardListener.keyevents;
        if (currentMovement.right == true) {
            this._xPos += 5;
        }
        else if (currentMovement.left == true) {
            this._yPos -= 5;
        }
    };
    Player.prototype.render = function () {
        this._el.classList.add(this.className, 'up');
        this._el.style.bottom = this._yPos + 'px';
        this._el.style.left = this._xPos + 'px';
    };
    return Player;
}());
var Vector = (function () {
    function Vector() {
    }
    return Vector;
}());
var KeyListener = (function () {
    function KeyListener() {
        var _this = this;
        this._keyevents = { left: false, right: false, up: false };
        this.keyUpDownHandler = function (e) {
            if (e.key == 'ArrowUp' && e.type == 'keydown') {
                _this._keyevents.up = true;
            }
            else {
                _this._keyevents.up = false;
            }
            if (e.key == 'ArrowLeft' && e.type == 'keydown') {
                _this._keyevents.left = true;
                _this._keyevents.right = false;
            }
            else if (e.key == 'ArrowRight' && e.type == 'keydown') {
                _this._keyevents.right = true;
                _this._keyevents.left = false;
            }
            else {
                _this._keyevents.left = false;
                _this._keyevents.right = false;
            }
        };
        window.addEventListener("keydown", this.keyUpDownHandler);
        window.addEventListener("keyup", this.keyUpDownHandler);
    }
    Object.defineProperty(KeyListener.prototype, "keyevents", {
        get: function () {
            return this._keyevents;
        },
        enumerable: true,
        configurable: true
    });
    return KeyListener;
}());
//# sourceMappingURL=main.js.map