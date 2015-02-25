var Engine = require('../lib/Engine');
var Particle = require('../models/particleCombustible');
var Utils = require('../lib/utils');
var Item = require('../models/loaderItem');
var _ = require('lodash');

var myEngine;
var triangles = [];

function start(context, canvas){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var colorsetA = [],
  colorsetB = [];

  for(var i = 0; i < 2000; i ++){
    colorsetB.push(Utils.randomColor())
    colorsetA.push(Utils.randomColor())
  }
  var centerItem = new Item({
    x : canvas.width/ 2,
    y : canvas.height / 2,
    maxWidth : canvas.width / 2,
    angleOfCurve : 45,
    sizes: [50, 80, 50, 30],
    maxPoints : 200,
    anglesOfCurves : [0, 15, 30, 45, 60, 90],
    changeColorDivisor :6, 
    colors : colorsetA,
    angle : 0
  })

   var item2 = new Item({
    x : canvas.width/ 2,
    y : canvas.height / 2,
    sizes : [100, 150, 100, 50],
    anglesOfCurves : [30, 50],
    maxWidth : canvas.width / 2,
    colors : colorsetB,
    maxPoints : 100,
    angle : 40
  })

  triangles.push(centerItem )
}

function render(context, canvas){
  triangles.forEach(function(triangle){
    triangle.render(context, canvas);
  });

}
function update(dt){
  triangles.forEach(function(triangle){
    triangle.update(dt);
  });

}

function clear(context, canvas){
  canvas.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function initialize(canvas){
  myEngine = new Engine(canvas);
  myEngine.setClearingMethod(clear);
  myEngine.addStartCallback(start);
  myEngine.addUpdateCallback(update);
  myEngine.addRenderCallback(render);
  myEngine.start();
}

function stop(){
  myEngine.stop();
}

module.exports = {
  initialize : initialize, 
  stop: stop
}