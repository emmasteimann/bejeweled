var WHOBoard;

WHOBoard = (function() {

  function WHOBoard() {
    this.GAME_DIMENSION = 8;
    this.gems = [];
  }

  WHOBoard.prototype.initialize = function(context) {
    this.context = context;
    var r,c;
    for (r=0;r<this.GAME_DIMENSION;r++){
        this.gems[r] = [];
        for (c=0;c<this.GAME_DIMENSION;c++){
          this.gems[r][c] = this.randomGem(r,c);
        }
    }
  }

  WHOBoard.prototype.drawBoard = function(){
    this.context.drawImage(GameData.images.board, 0, 0, 560, 560);
  }

  WHOBoard.prototype.switchGems = function(gem_one,gem_two){
        var col_one = gem_one.col;
        var col_two = gem_two.col;
        var row_one = gem_one.row;
        var row_two = gem_two.row;
        gem_one.col = col_two;
        gem_one.row = row_two;
        gem_two.col = col_one;
        gem_two.row = row_one;
        this.gems[row_one][col_one] = gem_two;
        this.gems[row_two][col_two] = gem_one;
  }
  WHOBoard.prototype.loadGemAt = function(row, column, gem){
    gem.col = column;
    gem.row = row;
    gem.relative_x = (column* 70)+10;
    gem.relative_y = (row * 70)+10;
    if (window.BeWHOledGame.debug_mode){
      // gem.log_row_and_y = true;
    }
    this.gems[row][column] = gem;
  }
  WHOBoard.prototype.loadBlankGemAt = function(gem){
    gem.toBeRemoved = true;
    this.gems[gem.row][gem.col] = gem;
  }
  WHOBoard.prototype.randomGem = function(row,col){
    selection = Math.floor((Math.random()*7)+1);
    gem = null;
    switch (selection){
      case 1:
        gem = new WHOGem("jewel_1", row, col);
        break;
      case 2:
        gem = new WHOGem("jewel_2", row, col);
        break;
      case 3:
        gem = new WHOGem("jewel_3", row, col);
        break;
      case 4:
        gem = new WHOGem("jewel_4", row, col);
        break;
      case 5:
        gem = new WHOGem("jewel_5", row, col);
        break;
      case 6:
        gem = new WHOGem("jewel_6", row, col);
        break;
      case 7:
        gem = new WHOGem("jewel_7", row, col);
        break;
    }
    return gem;
  }
  WHOBoard.prototype.getGemAt = function(row,col) {
      return this.gems[row][col];
  }
  WHOBoard.prototype.randomGemDiscluding = function(row,col,array){
    var random_array = [1,2,3,4,5,6,7];
    for (i = 0; i < array.length; i++){
      random_array.splice(random_array.indexOf(array[i]), 1);
    }
    var selection = random_array[Math.floor(Math.random() * random_array.length)];
    gem = null;
    switch (selection){
      case 1:
        gem = new WHOGem("jewel_1", row, col);
        break;
      case 2:
        gem = new WHOGem("jewel_2", row, col);
        break;
      case 3:
        gem = new WHOGem("jewel_3", row, col);
        break;
      case 4:
        gem = new WHOGem("jewel_4", row, col);
        break;
      case 5:
        gem = new WHOGem("jewel_5", row, col);
        break;
      case 6:
        gem = new WHOGem("jewel_6", row, col);
        break;
      case 7:
        gem = new WHOGem("jewel_7", row, col);
        break;
    }
    return gem;
  }
  return WHOBoard;

})();