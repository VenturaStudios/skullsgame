var loader;
var images = {};
var audios = {};

function onLoadComplete(fn){
  loader.addCompletionListener(fn);
}

function addImage(uri, alias){
  images[alias] = loader.addImage(uri);
}

function getImage(alias){
  return images[alias];
}

function addAudio(uri, alias){
  audios[alias] = loader.addAudio(uri);
}

function getAudio(alias){
  return audios[alias];
}

function initialize(){
  loader = new PxLoader();
}

function start(){
  loader.start();
}

module.exports = {
  addImage: addImage,
  addAudio: addAudio,
  getImage: getImage,
  getAudio: getAudio,
  onLoadComplete: onLoadComplete,
  start: start,
  initialize : initialize
}