(function(root) {

  var Snakes = root.Snakes = (root.Snakes || {});

  var Board = Snakes.Board = function() {
    this.snake = new Snakes.Snake();
    this.apple = [Math.floor(Math.random() * Board.MAX_X), Math.floor(Math.random() * Board.MAX_Y)];
    this.grid = this.updateBoard();
  }

  Board.MAX_X = 9;
  Board.MAX_Y = 9;

  Board.prototype.render = function() {
    this.grid = this.updateBoard();
    for(var row = 0; row < this.grid.length; row++) {
      console.log(this.grid[row]);
    }
  }

  Board.prototype.updateBoard = function() {
    var grid = [];
    for(var row = 0; row < Board.MAX_Y; row++) {
      grid[row] = [];
      for(var col = 0; col < Board.MAX_X; col++) {
        if(this.snake.isSegment([row, col])) {
          grid[row][col] = "S";
        }
        else if ((this.apple[0] === row) && (this.apple[1] === col) ) {
          grid[row][col] = "A";
        }
        else {
          grid[row][col] = ".";
        }
      };
    };
    return grid;
  }



})(this);
