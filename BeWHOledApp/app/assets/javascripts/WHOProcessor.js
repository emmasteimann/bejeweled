var WHOProcessor;

WHOProcessor = (function() {

  function WHOProcessor() {
    this.sequences = [];
  }

  WHOProcessor.prototype.sequencesExist = function() {
    this.columnSequences();
    this.rowSequences();
    if (this.sequences.length > 0){
      return true;
    } else {
      return false;
    }
  }
  WHOProcessor.prototype.clearAllSequences = function() {
    this.setForRemoval();
    this.findSpacesToFill();
    this.loadSpaces();
    this.loadBlank();
    this.resetState();
  }
  WHOProcessor.prototype.setForRemoval = function() {
    var total_score = 0;
    for(i = 0; i < this.sequences.length; i++){
      total_score += this.sequences[i].length * 10
      for(l = 0; l < this.sequences[i].length; l++){
        this.sequences[i][l].toBeRemoved = true;
      }
    }
    this.sequences = [];
    // TODO: add to score keeper
    // TODO: possibly add combo tracker
  }
  WHOProcessor.prototype.findSpacesToFill = function() {
    var temp, row, column;
    for (column= 0; column < 8; column++) {
      for (row = 7; row >= 0; row--) {
        var lowest_point = BeWHOledBoard.getGemAt(row, column);
        lowest_point.prior_to_fall = row;
        if(lowest_point.toBeRemoved){
         for(temp = row-1; temp >= 0; temp--){
            var gem_on_top = BeWHOledBoard.getGemAt(temp, column);
            gem_on_top.to_fall = true;
            gem_on_top.fall_distance = gem_on_top.fall_distance + 1;
          }
        }
      }
    }
  }
  WHOProcessor.prototype.resetState = function() {
    var row, column;
    for (row = 0; row < 8; row++){
      for(column = 0; column < 8; column++){
        var current_gem = BeWHOledBoard.getGemAt(row, column);
        current_gem.prior_to_fall = column;
        current_gem.fall_distance = 0;
        current_gem.to_fall = false;
        current_gem.toBeRemoved = false;
      }
    }
  }
  WHOProcessor.prototype.loadBlank = function() {
    var row, column;
    for (row = 0; row < 8; row++){
      for(column = 0; column < 8; column++){
        var current_gem = BeWHOledBoard.getGemAt(row, column);
        if(current_gem.toBeRemoved){
            var numbers_removed = [];
            if (row != 0){
              var top = BeWHOledBoard.getGemAt(row-1, column);
              var digit = top.image_title.match(/\d+/g);
              numbers_removed.push(digit[0]);
            }
            if (row != 7){
              var bottom = BeWHOledBoard.getGemAt(row+1, column);
              var digit = bottom.image_title.match(/\d+/g);
              numbers_removed.push(digit[0]);
            }
            if (column != 7){
              var right = BeWHOledBoard.getGemAt(row, column+1);
              var digit = right.image_title.match(/\d+/g);
              numbers_removed.push(digit[0]);
            }
            if (column != 0){
              var left = BeWHOledBoard.getGemAt(row, column-1);
              var digit = left.image_title.match(/\d+/g);
              numbers_removed.push(digit[0]);
            }
            var random_gem = BeWHOledBoard.randomGemDiscluding(row,column,numbers_removed);
            BeWHOledBoard.loadGemAt(row, column, random_gem);
        }
      }
    }
  }

  WHOProcessor.prototype.loadSpaces = function() {
    var row, column;
    for(column = 0; column < 8; column++){
       for(row = 7; row >= 0; row--){
         var current_gem = BeWHOledBoard.getGemAt(row, column);
         if(current_gem.to_fall && !current_gem.toBeRemoved){
            BeWHOledBoard.loadGemAt(row+current_gem.fall_distance, column, current_gem);
            current_gem.col = column;
            BeWHOledBoard.loadBlankGemAt(new WHOGem("jewel_1",row,column));
         }
       }
    }
  }

  WHOProcessor.prototype.columnSequences = function() {
    var temp, row, column;
    for(row = 0; row < 8; row++) {
      for(column = 0; column < 6; column++) {
        var initial_gem = BeWHOledBoard.getGemAt(row, column);
        var sequence = []
        sequence.push(initial_gem)
        for (temp = (column+1); temp < 8; temp++){
            var temp_gem = BeWHOledBoard.getGemAt(row, temp);
            if (temp_gem.image_title == initial_gem.image_title){
                sequence.push(temp_gem)
            } else {
                break;
            }
        }
        if (sequence.length > 2){

          this.sequences.push(sequence);
          if (window.BeWHOledGame.debug_mode){
            this.debugGems("yellow", sequence);
          }
        }
        // column = temp - 1;
      }
    }
  }
  WHOProcessor.prototype.rowSequences = function() {
    var temp, row, column;
    for(column = 0; column < 8; column++) {
      for(row = 0; row < 6; row++) {
        var initial_gem = BeWHOledBoard.getGemAt(row, column);
        var sequence = []
        sequence.push(initial_gem)
        for (temp = (row+1); temp < 8; temp++){
          var temp_gem = BeWHOledBoard.getGemAt(temp,column);
          if (temp_gem.image_title == initial_gem.image_title){
            sequence.push(temp_gem);
          } else {
            break;
          }
        }
        if (sequence.length > 2){
          this.sequences.push(sequence);
          if (window.BeWHOledGame.debug_mode){
            this.debugGems("red", sequence);
          }
        }
        // row = temp - 1;
      }
    }
  }
  WHOProcessor.prototype.debugGems = function(color, sequence) {
    for(i = 0; i < sequence.length; i++){
      sequence[i].debug_background = color;
    }
  }

  return WHOProcessor;
})();