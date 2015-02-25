var loader = require('./lib/loader');
var behavior = require('./behaviors/game');
var behaviorLoader = require('./behaviors/loader_behavior');

//Initialize
document.addEventListener('DOMContentLoaded', start, false);

function start(){
  var canvas = document.getElementById('canvas');
  
  behaviorLoader.initialize(canvas);
  loader.initialize();
  loader.addImage('images/sprite.png', 'player');
  loader.onLoadComplete(function(){
    behaviorLoader.stop();
    behavior.initialize(canvas);
  });
  loader.start();
}