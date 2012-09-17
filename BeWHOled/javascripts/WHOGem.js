var WHOGem;

WHOGem = (function() {

  function WHOGem(image_title, row, col) {
    this.row = row;
    this.col = col;
    this.image_title = image_title
  }

  WHOGem.prototype.initialize = function() {

  }

  WHOGem.prototype.draw = function(context) {
    context.drawImage(GameData.images[this.image_title], (this.row * 70) + 10, (this.col * 70) + 10, 50, 50);
  }

  return WHOGem;

})();