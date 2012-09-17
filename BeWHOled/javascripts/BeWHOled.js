(function() {

    var BeWHOled;

    BeWHOled = (function() {

      function BeWHOled(debug_mode) {
        this.canvas = document.getElementById('bewholed_canvas');
        this.context = this.canvas.getContext('2d');
        this.message = "";
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
        if(typeof(debug_mode)==='undefined'){ debug_mode = false};
        this.debug_mode = debug_mode;
      }

      BeWHOled.prototype.initialize = function() {
        var self = this;
        self.loadEventListeners();
        // Create globally accessible game data
        window.GameData = new GameData();
        GameData.loadImages(this.sources);

        // Create globally accessible game board
        window.BeWHOledBoard = new WHOBoard();
        BeWHOledBoard.initialize(this.context);

        this.animate(this.canvas, this.context);
      }
      BeWHOled.prototype.loadEventListeners = function(){
        var self = this;
        if (this.debug_mode){
          this.canvas.addEventListener('mousemove', function(evt) {
            var mousePos = self.getMousePos(self.canvas, evt);
            self.message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
          }, false);
        }
        this.canvas.addEventListener('click', function(evt) {
          var mouse_position = self.getMousePos(self.canvas, evt);
          self.boardClicked(mouse_position);
        }, false);
      }
      BeWHOled.prototype.boardClicked = function(mouse_position) {
        var row, col;
        col = Math.ceil(mouse_position.x /70)
        row = Math.ceil(mouse_position.y /70)
        if (this.debug_mode){
          this.message = "Col: " + col + " Row: " + row;
        }
      }
      BeWHOled.prototype.getMousePos = function(canvas, evt) {
        var rect = this.canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      BeWHOled.prototype.animate = function(canvas, context) {
        var self = this;
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        BeWHOledBoard.drawBoard();
        this.drawGems();
        this.outputMessage(this.message);
        // request new frame
        requestAnimFrame(function() {
          self.animate(canvas, context);
        });
      }
      BeWHOled.prototype.outputMessage = function(message){
        this.context.font = '18pt Calibri';
        this.context.fillStyle = '#00FF00';
        this.context.fillText(message, 10, 25);
      }
      BeWHOled.prototype.drawGems = function(){
        var row, col, gem;
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
      var bewholed_game = new BeWHOled();
      bewholed_game.initialize();
    });

}).call(this);