var Game = (function () {
    function Game() {
        var _this = this;
        this.loop = function () {
            _this.move();
            _this.render();
            setTimeout(_this.loop, 1000 / 60);
        };
        this._player = new Player;
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
    function Player() {
        this.sprite = document.createElement('img');
        this.className = 'player';
        this.xPos = 0;
        this.yPos = 0;
        this.keyboardListener = new KeyListener;
        var game = document.querySelector('.player');
        this.sprite.setAttribute('src', './assets/images/player.png');
        this.sprite.className = 'player';
        game.appendChild(this.sprite);
        this.keyboardListener = new KeyListener();
    }
    Player.prototype.move = function () {
        var currentMovement = this.keyboardListener.keyevents;
        if (currentMovement.right == true) {
            this.xPos += 10;
            this.sprite.setAttribute('src', './assets/images/playerRight.png');
        }
        else if (currentMovement.left == true) {
            this.xPos -= 10;
            this.sprite.setAttribute('src', './assets/images/player.png');
        }
    };
    Player.prototype.render = function () {
        this.sprite.style.bottom = this.yPos + 'px';
        this.sprite.style.left = this.xPos + 'px';
    };
    Object.defineProperty(Player.prototype, "el", {
        get: function () {
            return this.sprite;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}());
var KeyListener = (function () {
    function KeyListener() {
        var _this = this;
        this._keyevents = { left: false, right: false };
        this.keyUpDownHandler = function (e) {
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