/**
  Utils you will use so maany times
**/
var Utils = {};

Utils.radianToDegree  = function(radians){
  return radians * (180/Math.PI)
}

Utils.degreeToRadian = function(degree){
  return degree/(180/Math.PI);
}

//Returns a random Integer between min and max
Utils.randomInteger = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Calculates the bounce angle between a particle with a incidenceAngle and a wall with angleDest
Utils.calculateBounceAngle = function(incidenceAngle, angleDest){
  reflectionAngle = 2 * angleDest - incidenceAngle;
  return reflectionAngle;
}

//Returns a fibonacci serie
Utils.fibonacci = function(size){
  var first = 0, second = 1,  next, count = 2, results = [first, second];
  
  while(count++ < size){
    next = first + second;
    first = second;
    second = next;
    results.push(next);
  }

  return results;
}

Utils.isOdd = function(number){
  return number % 2 === 0;
}

Utils.isEven = function(number){
  return Utils.isOdd(number + 1);
}

//Returns true or false randomly, you can force the probability.
//The bigger the times number, the less probable to happen
Utils.flipCoin = function(times){
  times = times ? times : 2;
  return Math.floor( Math.random() * times ) == 1;
}

//Returns the mouse coords relative to the canvas
Utils.getMouseCoords = function(canvas, e){
  var canvasPosition, mouse;

  canvasPosition = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop
  }

  mouse = {
    x: e.pageX - canvasPosition.x,
    y: e.pageY - canvasPosition.y
  }

  return mouse;
}

//Returns a random UID
Utils.uid = function(times){
  times = times ? times : 8;
  var _uid = '';

  for(var i = 0; i < times; i++){
    _uid += Math.random().toString(36).substr(2, 5);

    if(i !== times -1){
      _uid += '-'
    }
  }

  return _uid;
}

Utils.randomColor = function(){
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';

  for(var i = 0; i < 6; i++){
    color += letters[Utils.randomInteger(0, letters.length - 1)]
  }
  return color;
}

Utils.collides = function(rect1, rect2){
  return (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) 
}

Utils.entitiesCollide = function(hitboxA, hitboxB){
  return doPolygonsIntersect(hitboxA, hitboxB);
}

function doPolygonsIntersect (a, b) {
  var polygons = [a, b];
  var minA,  maxA, projected, i, i1, j, minB, maxB;
  var aPoints = a.getPoints();
  var bPoints = b.getPoints();

  for (i = 0; i < polygons.length; i++) {

      // for each polygon, look at each edge of the polygon, and determine if it separates
      // the two shapes
      var polygon = polygons[i].getPoints();
      for (i1 = 0; i1 < polygon.length; i1++) {

          // grab 2 vertices to create an edge
          var i2 = (i1 + 1) % polygon.length;
          var p1 = polygon[i1];
          var p2 = polygon[i2];

          // find the line perpendicular to this edge
          var normal = [p2[1] - p1[1],  p1[0] - p2[0]];

          minA = maxA = undefined;
          // for each vertex in the first shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          for (j = 0; j < aPoints.length; j++) {
              projected = normal[0] * aPoints[j][0] + normal[1] * aPoints[j][1];
              if (isUndefined(minA) || projected < minA) {
                  minA = projected;
              }
              if (isUndefined(maxA) || projected > maxA) {
                  maxA = projected;
              }
          }

          // for each vertex in the second shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          minB = maxB = undefined;
          for (j = 0; j < bPoints.length; j++) {
              projected = normal[0] * bPoints[j][0] + normal[1] * bPoints[j][1];
              if (isUndefined(minB) || projected < minB) {
                  minB = projected;
              }
              if (isUndefined(maxB) || projected > maxB) {
                  maxB = projected;
              }
          }

          // if there is no overlap between the projects, the edge we are looking at separates the two
          // polygons, and we know there is no overlap
          if (maxA < minB || maxB < minA) {
              return false;
          }
      }
  }
  return true;
};

module.exports = Utils;