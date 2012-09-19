var WHOGem;

WHOGem = (function() {

  function WHOGem(image_title, row, col) {
    this.row = row;
    this.col = col;
    this.relative_x = (this.col * 70)+10;
    this.relative_y = (this.row * 70)+10;
    this.shift_to_x = 0;
    this.shift_to_y = 0;
    this.image_title = image_title;
    this.in_focus = false;
    this.is_animating = false;
    this.debug_background = null;
    this.toBeRemoved = false;
    this.prior_to_fall = 0;
    this.fall_distance = 0;
    this.to_fall = false;
    this.log_row_and_y;
    this.gem_opacity = 1;
    this.vortex_opacity = 0;
  }

  WHOGem.prototype.initialize = function() {

  }

  WHOGem.prototype.draw = function(context) {
    if (window.BeWHOledGame.debug_mode){
      if (this.debug_background){
        context.beginPath();
        context.rect(this.relative_x-10, this.relative_y-10, 70, 70);
        context.fillStyle = this.debug_background;
        context.fill();
      }
      if (this.toBeRemoved){
        context.font = '12pt Calibri';
        context.fillStyle = '#00FF00';
        context.fillText("*X*", this.relative_x+10, this.relative_y+20);
      }
      if (this.to_fall){
        context.font = '12pt Calibri';
        context.fillStyle = '#00FF00';
        context.fillText(this.fall_distance, this.relative_x, this.relative_y);
      }
     if (this.log_row_and_y){
        context.font = '12pt Calibri';
        context.fillStyle = '#00FF00';
        context.fillText("R: " + this.row, this.relative_x, this.relative_y+55);
        context.fillText("Y: " + this.relative_y, this.relative_x, this.relative_y+70);
      }
    }
    if (this.in_focus){
      context.drawImage(GameData.images.focus, (this.col * 70), (this.row * 70), 70, 70);
    }
    if (this.is_animating){
      this.relative_x += this.shift_to_x;
      this.relative_y += this.shift_to_y;
    }
    // TODO: apply transition instead of flipping off
    if(!this.toBeRemoved){
      context.drawImage(GameData.images[this.image_title], this.relative_x, this.relative_y, 50, 50);
    } else {
      if (this.vortex_opacity > 1){
        context.drawImage(window.time_vortex, this.relative_x-10, this.relative_y-10);
      } else {
        this.vortex_opacity += 0.05;
        context.globalAlpha = this.vortex_opacity;
        context.drawImage(window.time_vortex, this.relative_x-10, this.relative_y-10);
        context.globalAlpha = 1;
      }
      if (this.gem_opacity < 0){
      } else{
        this.gem_opacity -= 0.05;
        context.globalAlpha = this.gem_opacity;
        context.drawImage(GameData.images[this.image_title], this.relative_x, this.relative_y, 50, 50);
        context.globalAlpha = 1;
      }
    }
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
    this.gem_opacity = 0;
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