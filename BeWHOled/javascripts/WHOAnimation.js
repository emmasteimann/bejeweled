var WHOAnimation;

WHOAnimation = (function() {

  function WHOAnimation() {
    this.current_frame = 0;
    this.swap_speed = 3;
    this.total_swap_frames = 70 / this.swap_speed;
    this.swap_speed = 3 - (2 / this.total_swap_frames);
    this.animating_gems = null;
    this.animation_type = {
      gems_switch: 0,
      gems_falling: 0
    }
  }
  WHOAnimation.prototype.finishedSwapping = function() {
    for (i=0; i<this.animating_gems.length; i++) {
      this.animating_gems[i].stop()
    }
    if (this.animation_type.gems_switch){
      BeWHOledBoard.switchGems(this.animating_gems[0], this.animating_gems[1]);
    }
    this.unsetAnimation();
    WHOProcessor.columnSequences();
    WHOProcessor.rowSequences();
  }
  WHOAnimation.prototype.unsetAnimation = function() {
    this.animating_gems = null;
    this.current_frame = 0;
    this.animation_type.gems_switch = 0;
    this.animation_type.gems_falling = 0;
  }
  WHOAnimation.prototype.callFrame = function() {
    if (this.animating_gems){
      if (this.current_frame > this.total_swap_frames) {
        this.finishedSwapping();
      } else {
        this.current_frame++;
      }
    }
  }
  WHOAnimation.prototype.flipFlop = function(gem_one, gem_two) {
      this.animation_type.gems_switch = 1;
      var shift_direction = 1;
      this.animating_gems = [gem_one,gem_two];
      this.gem_one = gem_one;
      if (gem_one.col == gem_two.col){
        if (gem_one.row < gem_two.row) {
          shift_direction = 1;
          }
        else {
          shift_direction = -1;
        }
        gem_one.shiftX(this.swap_speed * shift_direction);
        gem_two.shiftX(this.swap_speed * -shift_direction);
      }
      else {
        if (gem_one.col < gem_two.col) {
          shift_direction = 1;
        }
        else {
          shift_direction = -1;
        }
        gem_one.shiftY(this.swap_speed * shift_direction);
        gem_two.shiftY(this.swap_speed * -shift_direction);
      }

  }

  return WHOAnimation;

})();