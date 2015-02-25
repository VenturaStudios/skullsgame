var BaseEntity = require('../lib/BaseEntity');
var Victor = require('victor');
var Utils = require('../lib/utils');
var sprite = require('../lib/Sprite');
var loader = require('../lib/loader');
var input = require('../lib/input');

function Player(opts){
  //Add the board base position
  opts.x = opts.x + opts.board.x;
  opts.y = opts.y + opts.board.y;

  BaseEntity.prototype.constructor.call(this, opts);
  this.board = opts.board;
  this.sprite = new sprite(loader.getImage('player'));
  this.sprite.addAnimation('standby', [0,1], [30, 30], 1000, [0, 0]);
  this.sprite.addAnimation('moveup', [0,1], [30, 30], 1000, [90, 0]);
  this.sprite.addAnimation('movedown', [0,1], [30, 30], 1000, [180, 0]);
  this.sprite.addAnimation('shoot', [0,1,2,1,0,1,2,3,4,5], [30, 30], 1000, [0, 30]);
  this.sprite.playAnimation('standby');
}

Player.prototype = new BaseEntity({x: 0, y : 0});
Player.prototype.constructor = Player;
Player.prototype.parent = BaseEntity.prototype;

Player.prototype.render = function(context){

  context.save();
  //context.translate(this.board.x, this.board.y);

  this.sprite.render(context, this.pos.x, this.pos.y, 30, 30, this.angle);

  context.restore();
}

Player.prototype.update = function(dt, context, canvas){
  this.parent.update.call(this, dt);
  this.sprite.update(dt);
  

  if(input.isDown('w') || input.isDown('UP')){
    this.speed.y = 100;
  }else if(input.isDown('s') || input.isDown('DOWN')){
    this.speed.y = -100;
  }

  if(input.isDown('a') || input.isDown('LEFT')){
    this.speed.x = -100;
  }else if(input.isDown('d') || input.isDown('RIGHT')){
    this.speed.x = 100;
  }

  //Check borders
  if(this.pos.x > canvas.width){
    this.pos.x = 0;
  }else if(this.pos.x < 0){
    this.pos.x = canvas.width;
  }
  if(this.pos.y >= this.board.y + this.board.height){
    this.pos.y = this.board.y + this.board.height;
  }else if(this.pos.y <= this.board.y){
    this.pos.y = this.board.y;
  }
}

module.exports = Player;