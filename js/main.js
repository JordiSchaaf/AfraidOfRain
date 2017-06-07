var Game = (function () {
    function Game() {
        var _this = this;
        this._raindrops = [];
        this._active = true;
        this._score = 0;
        this._randomCounter = 0;
        this._lifebar = false;
        this._threehearts = false;
        this._twohearts = false;
        this._oneheart = false;
        this.loop = function () {
            if (_this._active) {
                _this.move();
                _this.collide();
                _this.randomRain();
                _this.drawLifebar();
                _this.drawScore();
                _this.render();
                _this.adjust();
                _this.gameCheck();
                setTimeout(_this.loop, 1000 / 60);
            }
        };
        this._player = new Player;
        this._collision = new Collision(this);
    }
    Game.prototype.start = function () {
        this.loop();
    };
    Game.prototype.render = function () {
        this._player.render();
        this._raindrops.forEach(function (raindrop) {
            raindrop.render();
        });
    };
    Game.prototype.move = function () {
        this._player.move();
        this._raindrops.forEach(function (raindrop) {
            raindrop.move();
        });
    };
    Game.prototype.collide = function () {
        this._collision.collide();
    };
    Game.prototype.adjust = function () {
        var _this = this;
        this._raindrops.forEach(function (raindrop) {
            if (raindrop.state == "dead") {
                _this._raindrops.splice(_this._raindrops.indexOf(raindrop), 1);
                _this._score++;
            }
        });
    };
    Game.prototype.gameCheck = function () {
        if (this.player.lives == 0) {
            var GO = document.getElementById('gameOver');
            GO.style.visibility = 'visible';
            GO.style.display = 'block';
            document.getElementById('scoreText').innerHTML = "";
            document.getElementById('result').innerHTML = "While trying to stay dry you dodged " + this._score.toString() + " droplets of rain!";
            document.getElementById('heart1').innerHTML = "";
            document.getElementById('heart2').innerHTML = "";
            document.getElementById('heart3').innerHTML = "";
            document.getElementById('playerCanvas').innerHTML = "";
            document.getElementById('rain').innerHTML = "";
            document.getElementById('grass').innerHTML = "";
            this._active = false;
        }
    };
    Game.prototype.finish = function () {
    };
    Object.defineProperty(Game.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "playerWidth", {
        get: function () {
            return this._player.el.getBoundingClientRect().width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "raindrops", {
        get: function () {
            return this._raindrops;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "raindropWidth", {
        get: function () {
            var width;
            this._raindrops.forEach(function (raindrop) {
                width = raindrop.el.getBoundingClientRect().width;
            });
            return width;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.randomRain = function () {
        this._randomCounter += 1;
        if (this._randomCounter == 4) {
            this._randomCounter = 0;
            this._raindrops.push(new Rain(new Vector(0, 10)));
        }
    };
    Game.prototype.drawLifebar = function () {
        var html1 = document.createElement('div');
        var html2 = document.createElement('div');
        var html3 = document.createElement('div');
        if (!this._lifebar) {
            var heart1 = document.querySelector('#heart1');
            html1.className = "lifebar";
            heart1.appendChild(html1);
            var heart2 = document.querySelector('#heart2');
            html2.className = "lifebar";
            heart2.appendChild(html2);
            var heart3 = document.querySelector('#heart3');
            html3.className = "lifebar";
            heart3.appendChild(html3);
            this._lifebar = true;
        }
        if (!this._threehearts && this._player.lives == 3) {
            html1.classList.add("heart");
            html2.classList.add("heart");
            html3.classList.add("heart");
            this._threehearts = true;
        }
        if (!this._twohearts && this._player.lives == 2) {
            document.getElementById('heart3').innerHTML = "";
            var heart3 = document.querySelector('#heart3');
            html3.classList.add("lifebar", "noheart");
            heart3.appendChild(html3);
            this._twohearts = true;
        }
        if (!this._oneheart && this._player.lives == 1) {
            document.getElementById('heart2').innerHTML = "";
            var heart2 = document.querySelector('#heart2');
            html2.classList.add("lifebar", "noheart");
            heart2.appendChild(html2);
            this._oneheart = true;
        }
    };
    Game.prototype.drawScore = function () {
        document.getElementById('scoreText').innerHTML = this._score.toString();
    };
    return Game;
}());
var Player = (function () {
    function Player() {
        this.html = document.createElement('div');
        this.className = 'player';
        this.xPos = 0;
        this.yPos = 0;
        this.keyboardListener = new KeyListener;
        this.lives = 3;
        var game = document.querySelector('#playerCanvas');
        this.html.className = this.className;
        game.appendChild(this.html);
        this.keyboardListener = new KeyListener();
    }
    Player.prototype.move = function () {
        var currentMovement = this.keyboardListener.keyevents;
        if (currentMovement.right && this.canMoveRight()) {
            this.xPos += 5;
            this.html.classList.remove("player_left", "player_stand");
            this.html.classList.add("player_right");
        }
        else if (currentMovement.left && this.canMoveLeft()) {
            this.xPos -= 5;
            this.html.classList.remove("player_right", "player_stand");
            this.html.classList.add("player_left");
        }
        else if (!currentMovement.left && !currentMovement.right) {
            this.html.classList.remove("player_left", "player_right");
            this.html.classList.add("player_stand");
        }
        this.boundsChecker();
    };
    Player.prototype.boundsChecker = function () {
        if ((this.xPos + this.html.getBoundingClientRect().width) > window.innerWidth) {
            this.xPos = window.innerWidth - this.html.getBoundingClientRect().width;
        }
    };
    Player.prototype.render = function () {
        this.html.style.bottom = this.yPos + 'px';
        this.html.style.left = this.xPos + 'px';
    };
    Object.defineProperty(Player.prototype, "el", {
        get: function () {
            return this.html;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "playerX", {
        get: function () {
            return this.xPos;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.canMoveLeft = function () {
        if (this.xPos <= 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Player.prototype.canMoveRight = function () {
        if ((this.xPos + this.html.getBoundingClientRect().width) >= window.innerWidth) {
            return false;
        }
        else {
            return true;
        }
    };
    return Player;
}());
var Rain = (function () {
    function Rain(speed) {
        if (speed === void 0) { speed = new Vector; }
        this.html = document.createElement('div');
        this.className = 'rain';
        this.state = "alive";
        this.velocity = 1;
        var game = document.querySelector('#rain');
        this.html.className = this.className;
        game.appendChild(this.html);
        var rect = this.html.getBoundingClientRect();
        this.position = new Vector(Math.round(Math.random() * window.innerWidth), -28);
        this.speed = speed;
    }
    Rain.prototype.move = function () {
        var displacement = this.speed.scale(this.velocity);
        this.position = this.position.add(displacement);
    };
    Rain.prototype.render = function () {
        this.boundsChecker();
        this.html.style.top = this.position.y() + 'px';
        this.html.style.left = this.position.x() + 'px';
    };
    Object.defineProperty(Rain.prototype, "raindropY", {
        get: function () {
            return this.position.y();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rain.prototype, "raindropX", {
        get: function () {
            return this.position.x();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rain.prototype, "el", {
        get: function () {
            return this.html;
        },
        enumerable: true,
        configurable: true
    });
    Rain.prototype.boundsChecker = function () {
        if (this.position.y() > window.innerHeight && this.state == "alive") {
            this.state = "dead";
            this.html.parentNode.removeChild(this.html);
        }
    };
    return Rain;
}());
var Vector = (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = x;
        this._y = y;
    }
    Vector.prototype.x = function () {
        return this._x;
    };
    Vector.prototype.y = function () {
        return this._y;
    };
    Vector.prototype.add = function (input) {
        return new Vector(this._x + input.x(), this._y + input.y());
    };
    Vector.prototype.scale = function (scalar) {
        return new Vector(this._x * scalar, this._y * scalar);
    };
    return Vector;
}());
var Collision = (function () {
    function Collision(game) {
        this._game = game;
    }
    Collision.prototype.collide = function () {
        var _this = this;
        var player = this._game.player;
        var playerheight = window.innerHeight - this._game.player.el.getBoundingClientRect().top;
        this._game.raindrops.forEach(function (raindrop) {
            if (player.playerX < (raindrop.raindropX + _this._game.raindropWidth) && (player.playerX + _this._game.playerWidth) > raindrop.raindropX && playerheight >= (window.innerHeight - raindrop.raindropY)) {
                raindrop.state = "hit";
                if (raindrop.state = "hit") {
                    raindrop.html.parentElement.removeChild(raindrop.el);
                    _this._game.raindrops.splice(_this._game.raindrops.indexOf(raindrop), 1);
                    _this._game.player.lives--;
                }
            }
        });
    };
    return Collision;
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