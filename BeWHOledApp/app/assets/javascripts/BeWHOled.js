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
          jewel_8: 'jewel_8.png',
          overlay: 'overlay.png',
          focus: 'focus.png'
        };
        this.gem_in_focus = null;
        if(typeof(debug_mode)==='undefined'){ debug_mode = false };
        this.debug_mode = debug_mode;
        this.show_overlay = true;
        this.score_bar_cycle = 0;
      }

      BeWHOled.prototype.initialize = function() {
        var self = this;
        // Cycle scorebar background
        // setInterval(function() {
        //   self.score_bar_cycle += 1;
        //   // $("#score_bar").css("width", self.score_bar_cycle + "px")
        //   $("#score_bar").css("background-position", -self.score_bar_cycle + "px 0px")
        // }, 50);
        // Create globally accessible game objects
        window.GameData = new GameData();
        window.WHOAnimation = new WHOAnimation();
        window.WHOProcessor = new WHOProcessor();
        window.BeWHOledBoard = new WHOBoard();

        GameData.loadImages(this.sources);
        this.context.drawImage(GameData.images.overlay, 0, 0, 560, 560);
        setTimeout(function(){self.hideOverlay()},2000);
        window.time_vortex = $('#time_vortex').get(0);
        BeWHOledBoard.initialize(this.context);

        if (WHOProcessor.sequencesExist()){
          WHOProcessor.clearAllSequences();
        }

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
        col = Math.floor(mouse_position.x /70)
        row = Math.floor(mouse_position.y /70)

        // Debug to log messages one the screen
        if (this.debug_mode){
          this.message = "Col: " + col + " Row: " + row;
        }

        // Find gem that was clicked
        clicked_gem = BeWHOledBoard.getGemAt(row, col);

        // Check to see if a gem is currently in focus
        // if not, set one
        if (this.gem_in_focus == null){
          this.gem_in_focus = clicked_gem;
          clicked_gem.in_focus = true;
        } else {
          if (this.gem_in_focus == clicked_gem) {

            clicked_gem.in_focus = false;
            this.gem_in_focus = null;

          } else {

            if(this.gem_in_focus.isAdjacent(clicked_gem)){
              this.gem_in_focus.in_focus = false;
              this.switchTiles(this.gem_in_focus, clicked_gem);
              this.gem_in_focus = null;
            }
            else {
              this.gem_in_focus.in_focus = false;
              this.gem_in_focus = clicked_gem;
              clicked_gem.in_focus = true;
            }

          }
        }

      }
      BeWHOled.prototype.hideOverlay = function(){
        this.loadEventListeners();
        this.show_overlay = false;
      }
      BeWHOled.prototype.checkWHOSequences = function() {
        if (WHOProcessor.sequencesExist()){
          WHOProcessor.setForRemoval();
          WHOProcessor.findSpacesToFill();
          WHOAnimation.loadNewGems();
        }
      }
      BeWHOled.prototype.refreshSequences = function() {
        WHOProcessor.loadSpaces();
        WHOProcessor.loadBlank();
        WHOProcessor.resetState();
      }
      BeWHOled.prototype.switchTiles = function(gem_one, gem_two) {
        WHOAnimation.flipFlop(gem_one, gem_two);
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
        WHOAnimation.callFrame();
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        BeWHOledBoard.drawBoard();
        this.drawGems();
        // This is used for debugging
        this.outputMessage(this.message);
        if (this.show_overlay){
          this.context.drawImage(GameData.images.overlay, 0, 0, 560, 560);
        }
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

      window.BeWHOledGame = new BeWHOled();
      BeWHOledGame.initialize();
    });

}).call(this);