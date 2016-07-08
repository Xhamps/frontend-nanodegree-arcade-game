'use strict';

var SIZE_COL = 101;
var SIZE_ROW = 83;
var GUTTER = -25;
var LIMIT = {
    width: SIZE_COL * 4,
    height: (SIZE_ROW * 5) + GUTTER
};

var player;
var allEnemies = [];

var Enemy = function(sizeCol, sizeRow, gutter) {
    this.sprite = 'images/enemy-bug.png';
    this.sizeCol = sizeCol;
    this.sizeRow = sizeRow;
    this.gutter = gutter;
    this.start();
};

Enemy.prototype.start = function() {
    this.x =  this.sizeCol * -1;
    this.y = (Math.ceil(Math.random() * 3) * this.sizeRow) + this.gutter;
    this.speed = Math.ceil(Math.random() * 5);
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed;

    if (this.x > this.sizeCol + 505){
        this.start();
    }

    if( (player.x +  this.sizeCol) + this.gutter > this.x  && player.x < (this.x + this.sizeCol) + this.gutter &&
        player.y === this.y){
        this.start();
        player.start();
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(sizeCol, sizeRow, gutter, limit) {
    this.sprite = 'images/char-boy.png';
    this.sizeCol = sizeCol;
    this.sizeRow = sizeRow;
    this.gutter = gutter;
    this.limit = limit;
    this.start();
};

Player.prototype.update = function(dt) {
    if(dt === 'up') this.y -= this.sizeRow;
    if(dt === 'down') this.y += this.sizeRow;
    if(dt === 'left') this.x -= this.sizeCol;
    if(dt === 'right') this.x += this.sizeCol;

    if( this.x < 0 ) this.x = 0;
    if( this.x > this.limit.width ) this.x = this.limit.width ;

    if( this.y < this.gutter ) this.y = this.gutter;
    if( this.y > this.limit.height ) this.y = this.limit.height ;

    if( this.y === this.gutter){
        this.start();
    }
};

Player.prototype.start = function() {
    this.x = this.sizeCol * 2;
    this.y = (this.sizeRow * 5) + this.gutter;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(dt){
    this.update(dt);
};

player = new Player(SIZE_COL, SIZE_ROW, GUTTER, LIMIT);

allEnemies.push(new Enemy(SIZE_COL, SIZE_ROW, GUTTER));
allEnemies.push(new Enemy(SIZE_COL, SIZE_ROW, GUTTER));
allEnemies.push(new Enemy(SIZE_COL, SIZE_ROW, GUTTER));

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
