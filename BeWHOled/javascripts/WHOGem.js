var WHOGem;

WHOGem = (function() {

  function WHOGem(image_title, row, col) {
    this.row = row;
    this.col = col;
    this.relative_x = (this.row * 70)+10;
    this.relative_y = (this.col * 70)+10;
    this.shift_to_x = 0;
    this.shift_to_y = 0;
    this.image_title = image_title;
    this.in_focus = false;
    this.is_animating = false;
  }

  WHOGem.prototype.initialize = function() {

  }

  WHOGem.prototype.draw = function(context) {
    if (this.in_focus){
      context.drawImage(GameData.images.focus, (this.row * 70), (this.col * 70), 70, 70);
    }
    if (this.is_animating){
      this.relative_x += this.shift_to_x;
      this.relative_y += this.shift_to_y;
    }
    context.drawImage(GameData.images[this.image_title], this.relative_x, this.relative_y, 50, 50);
  }

  WHOGem.prototype.shiftX = function(shift_direction) {
    this.shift_to_x = shift_direction;
    this.is_animating = true;
  }

  WHOGem.prototype.shiftY = function(shift_direction) {
    this.shift_to_y = shift_direction;
    this.is_animating = true;
  }
  WHOGem.prototype.stop = function() {
    this.shift_to_x = 0;
    this.shift_to_y = 0;
    this.is_animating = false;
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