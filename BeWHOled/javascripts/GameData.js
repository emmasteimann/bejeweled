var GameData;

GameData = (function() {

  function GameData() {

  }

  GameData.prototype.images = {};

  GameData.prototype.loadImages = function(sources, callback) {
      var self = this;
      if(typeof(callback)==='undefined') callback = null;

      var loadedImages = 0;
      var numImages = 0;

      // get num of sources
      for(var src in sources) {
        numImages++;
      }

      for(var src in sources) {
        self.images[src] = new Image();
        if(callback){
          self.images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(self.images);
            }
          }
        }
        self.images[src].src = "images/" + sources[src];
      }
    }

  return GameData;
})();