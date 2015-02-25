var Engine = require('../lib/Engine');
var Particle = require('../models/particleCombustible');
var Utils = require('../lib/utils');
var loader = require('../lib/loader');
var _ = require('lodash');
var Board = require('../models/board');
var Player = require('../models/player');
var Lifes = require('../models/lifes');

var bgColor = '#08101A';
var board, lifes, player;

function update(dt, context, canvas){
  player.update(dt, context, canvas);
}

function render(context,canvas){
  board.render(context);
  player.render(context);
  lifes.render(context);
}

function start(context, canvas){

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //The map
  board = new Board({
    x : 0,
    y : canvas.height / 2 - 100,
    width : canvas.width,
    height : 200,
    song : loader.getAudio('song')
  });

  board.start();

  lifes = new Lifes({
    x : 20,
    y : board.y - 30,
    amount : 3
  })

  //The player
  player = new Player({
    board : board,
    x : 30,
    y : 30,
    lifes : lifes
  })

}

/**
New clearing method
**/
function clear(context, canvas){
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  
  context.save();
    
  //context.fillStyle = "#102";
  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.globalCompositeOperation = "lighter";
}



function initialize(canvas){
  var myEngine = new Engine(canvas);
  myEngine.setClearingMethod(clear);
  myEngine.addStartCallback(start);
  myEngine.addUpdateCallback(update);
  myEngine.addRenderCallback(render);
  myEngine.start();
}

module.exports = {
  initialize : initialize
}