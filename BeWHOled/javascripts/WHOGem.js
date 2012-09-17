var WHOGem;

WHOGem = (function() {

  function WHOGem(image_title, row, col) {
    this.row = row;
    this.col = col;
    this.image_title = image_title;
    this.inFocus = false;
  }

  WHOGem.prototype.initialize = function() {

  }

  WHOGem.prototype.draw = function(context) {
    if (this.inFocus){
      context.drawImage(GameData.images.focus, (this.row * 70), (this.col * 70), 70, 70);
    }
    context.drawImage(GameData.images[this.image_title], (this.row * 70) + 10, (this.col * 70) + 10, 50, 50);
  }


  WHOGem.prototype.isAdjacent = function(clicked_gem) {
      if (Math.abs(this.row-clicked_gem.row) == 1 && Math.abs(this.col-clicked_gem.col) == 0){
          return true;
      }
      else if (Math.abs(this.row-clicked_gem.row) == 0 && Math.abs(this.col-clicked_gem.col) == 1){
          return true;
      }
      else {return false;}
  }

  return WHOGem;

})();