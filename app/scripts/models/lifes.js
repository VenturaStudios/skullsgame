var loader = require('../lib/loader');

function Lifes(options){
  this.x = options.x;
  this.y = options.y;
  this.amount = options.amount;
  this.image = loader.getImage('life');
}

Lifes.prototype.render = function(context){
  context.save();

  context.translate(this.x, this.y);

  for(var i = 0; i < this.amount; i++){
    var x = i * 30;
    var y = 0;

    context.drawImage(
      this.image,
      x,
      y,
      20,
      20
    );
  }

  context.restore();
}


module.exports = Lifes