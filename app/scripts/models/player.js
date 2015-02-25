var BaseEntity = require('../lib/BaseEntity');
var Victor = require('victor');
var Utils = require('../lib/utils');
var sprite = require('../lib/Sprite');
var loader = require('../lib/loader');
var input = require('../lib/input');

function Player(opts){
  BaseEntity.prototype.constructor.call(this, opts);

  this.sprite = new sprite(loader.getImage('player'));
  this.sprite.addAnimation('flap', [0,1,2,1,0,1,2,3,4,5], [10,10], 1000);
  this.sprite.playAnimation('flap');
}

Player.prototype = new BaseEntity({x: 0, y : 0});
Player.prototype.constructor = Player;
Player.prototype.parent = BaseEntity.prototype;

Player.prototype.render = function(ctx){
  this.sprite.render(ctx, this.pos.x, this.pos.y, 30, 30, this.angle);
}

Player.prototype.update = function(dt, context, canvas){
  this.parent.update.call(this, dt);
  this.sprite.update(dt);
  
  if(input.isDown('w') || input.isDown('UP')){
    console.log('do something');
  }

  //Check borders
  if(this.pos.x > canvas.width){
    this.pos.x = 0;
  }else if(this.pos.x < 0){
    this.pos.x = canvas.width;
  }
  if(this.pos.y > canvas.height){
    this.pos.y = 0;
  }else if(this.pos.y < 0){
    this.pos.y = canvas.height;
  }
}

module.exports = Player;