var loader;
var images = {};

function onLoadComplete(fn){
  loader.addCompletionListener(fn);
}

function addImage(uri, alias){
  images[alias] = loader.addImage(uri);
}

function getImage(alias){
  return images[alias];
}

function initialize(){
  loader = new PxLoader();
}

function start(){
  loader.start();
}

module.exports = {
  addImage: addImage,
  getImage: getImage,
  onLoadComplete: onLoadComplete,
  start: start,
  initialize : initialize
}