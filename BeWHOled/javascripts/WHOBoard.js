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

  return WHOBoard;

})();