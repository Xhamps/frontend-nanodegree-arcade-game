var player;
var allEnemies = [];
var gutter = -25;
var size = {
    col: 101,
    row: 83
};
var max = {
    width: size.col * 4,
    height: (size.row * 5) + gutter
};

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.start();
};

Enemy.prototype.start = function() {
    this.x =  -size.col;
    this.y = (Math.ceil(Math.random() * 3) * size.row) + gutter;
    this.speed = Math.ceil(Math.random() * 5);
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed;

    if (this.x > size.col + 505){
        this.start();
    }

    if( (player.x +  size.col) + gutter > this.x  && player.x < (this.x + size.col) + gutter &&
        player.y === this.y){
        this.start();
        player.start();
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.start();
};

Player.prototype.update = function(dt) {
    if(dt === 'up') this.y -= size.row;
    if(dt === 'down') this.y += size.row;
    if(dt === 'left') this.x -= size.col;
    if(dt === 'right') this.x += size.col;

    if( this.x < 0 ) this.x = 0;
    if( this.x > max.width ) this.x = max.width ;

    if( this.y < gutter ) this.y = gutter;
    if( this.y > max.height ) this.y = max.height ;

    if( this.y === gutter){
        this.start();
    }
};

Player.prototype.start = function() {
    this.x = size.col * 2;
    this.y = (size.row * 5) + gutter;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(dt){
    this.update(dt);
};

player = new Player();

allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
