var BaseEntity = require('../lib/BaseEntity');
var Victor = require('victor');
var Utils = require('../lib/utils');
var sprite = require('../lib/Sprite');
var loader = require('../lib/loader');
var input = require('../lib/input');
var INITIAL_DROP_TIME = 2000;

function SkullEnemy(opts){
  //Add the board base position
  BaseEntity.prototype.constructor.call(this, opts);
  this.board = opts.board;
  this.droppingTime = INITIAL_DROP_TIME;
  this.active = false;
  this.width = 20;
  this.height = 20;
  this.sprite = new sprite(loader.getImage('life'));
  this.sprite.addAnimation('standby', [0], [20, 20], 0);
  this.sprite.playAnimation('standby');
}

SkullEnemy.prototype = new BaseEntity({x: 0, y : 0});
SkullEnemy.prototype.constructor = SkullEnemy;
SkullEnemy.prototype.parent = BaseEntity.prototype;

SkullEnemy.prototype.render = function(context){

  context.save();
  var radius = (this.droppingTime / INITIAL_DROP_TIME) * 40;

  var sizeSprite = this.active ? this.width : radius;
  this.sprite.render(context, this.pos.x, this.pos.y, sizeSprite, sizeSprite, this.angle);

  if(!this.active){
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2);
    context.strokeStyle = 'yellow';
    context.stroke();
    context.closePath();
  }
  context.restore();
}

SkullEnemy.prototype.update = function(dt, context, canvas){
  this.parent.update.call(this, dt);
  this.sprite.update(dt);
  
  if(this.droppingTime > 0){
    this.droppingTime -= dt;
    this.angle += dt / 10;
    if(this.droppingTime < 0){
      this.angle = 0;
      this.active = true;
    }
  }
}

module.exports = SkullEnemy;