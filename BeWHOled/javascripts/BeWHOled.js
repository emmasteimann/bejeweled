(function() {

    var BeWHOled;

    BeWHOled = (function() {

      function BeWHOled() {
        this.canvas = document.getElementById('bewholed_canvas');
        this.context = this.canvas.getContext('2d');
        this.sources = {
          board: 'bewholed_board.jpg',
          jewel_1: 'jewel_1.png',
          jewel_2: 'jewel_2.png',
          jewel_3: 'jewel_3.png',
          jewel_4: 'jewel_4.png',
          jewel_5: 'jewel_5.png',
          jewel_6: 'jewel_6.png',
          jewel_7: 'jewel_7.png',
          jewel_8: 'jewel_8.png'
        };
      }

      BeWHOled.prototype.initialize = function() {

        // Create globally accessible game data
        window.GameData = new GameData();
        GameData.loadImages(this.sources);

        // Create globally accessible game board
        window.BeWHOledBoard = new WHOBoard();
        BeWHOledBoard.initialize(this.context);

        this.animate(this.canvas, this.context);
      }

      BeWHOled.prototype.animate = function(canvas, context) {
        var self = this;
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        BeWHOledBoard.drawBoard();
        this.drawGems();

        // request new frame
        requestAnimFrame(function() {
          self.animate(canvas, context);
        });
      }

      BeWHOled.prototype.drawGems = function(){
        var row, col;
        for (row=0;row<8;row++){
            for (col=0;col<8;col++){
                gem = BeWHOledBoard.getGemAt(row, col);
                gem.draw(this.context);
            }
        }
      }

      return BeWHOled;

    })();

    $(function() {

      window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
      bewholed_game = new BeWHOled();
      bewholed_game.initialize();
    });

}).call(this);