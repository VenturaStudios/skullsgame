function Board(options){
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.song = options.song;
}

Board.prototype.render = function(context){
  context.save();

  context.translate(this.x, this.y);
  context.rect(0, 0, this.width, this.height);
  var gradient = context.createLinearGradient(0, 0, 0, this.height);
  gradient.addColorStop(0, "rgb(0, 0, 0)");
  gradient.addColorStop(1, "rgb(255, 0, 0)");
  context.fillStyle = gradient;
  context.fill();

  context.restore();
}

Board.prototype.start = function(){
  //this.song.play();
}

Board.prototype.collides = function(item){
  //TODO: check if item collides with border
}

module.exports = Board