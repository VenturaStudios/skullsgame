var Utils = require('../lib/utils');
var SkullEnemy = require('../models/skullEnemy');
var _ = require('lodash');

function EnemiesController(options){
  this.enemies = [];
  this.board = options.board;

  for(var i = 0; i < 5; i++){
    this.enemies.push(new SkullEnemy({
      x : Utils.randomInteger(0, options.board.width),
      y : Utils.randomInteger(options.board.y, options.board.y + options.board.height),
      board : options.board
    }))
  }
}

EnemiesController.prototype.update = function(dt, context, canvas){
  this.enemies = _.compact(this.enemies.map(function(enemy){
    enemy.update(dt);
    if(!enemy.hasOwnProperty('collided')){
      return enemy;
    }
  }));
}

EnemiesController.prototype.render = function(dt, context, canvas){
  this.enemies.forEach(function(enemy){
    enemy.render(dt);
  });
}

module.exports = EnemiesController;